import { promises as fs } from 'node:fs';
import * as path from 'node:path';

export interface ComponentApiInfo {
  tagName: string;
  name: string;
  description?: string;
  summary?: string;
  deprecated?: boolean | string;
  since?: string;
  see?: string;
  package: string;
  attributes?: any[];
  properties?: any[];
  methods?: any[];
  slots?: any[];
  events?: any[];
  cssProperties?: any[];
  cssStates?: any[];
}

export interface ScannerOptions {
  /**
   * The workspace root directory to scan. Defaults to process.cwd()
   */
  workspaceRoot?: string;
  /**
   * Relative paths inside the workspace root to look for component package folders.
   * If not specified, the scanner recursively searches the workspace root.
   */
  packageDirs?: string[];
  /**
   * Custom filter function to determine if a member (field/method) should be exposed.
   * By default, filters out private/protected members and those starting with '_'.
   */
  memberFilter?: (member: any) => boolean;
}

export class ManifestScanner {
  private workspaceRoot: string;
  private options: ScannerOptions;
  private components = new Map<string, ComponentApiInfo>();

  constructor(options: ScannerOptions = {}) {
    this.options = {
      memberFilter: (member) => {
        const isPrivate =
          member.privacy === 'private' ||
          member.privacy === 'protected' ||
          member.name?.startsWith('_');
        return !isPrivate;
      },
      ...options,
    };

    if (this.options.workspaceRoot) {
      this.workspaceRoot = path.resolve(this.options.workspaceRoot);
    } else {
      this.workspaceRoot = process.cwd();
    }
  }

  public getWorkspaceRoot(): string {
    return this.workspaceRoot;
  }

  /**
   * Recursively finds all custom-elements.json files in a directory.
   */
  private async findCustomElementsManifests(dir: string): Promise<string[]> {
    const results: string[] = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (
            entry.name === 'node_modules' ||
            entry.name === '.git' ||
            entry.name === '.turbo' ||
            entry.name === 'dist' ||
            entry.name === 'out'
          ) {
            continue;
          }
          results.push(...(await this.findCustomElementsManifests(fullPath)));
        } else if (entry.name === 'custom-elements.json') {
          results.push(fullPath);
        }
      }
    } catch (_e) {
      // Ignore directory read errors (e.g. permission issues or broken symlinks)
    }
    return results;
  }

  /**
   * Crawls configured package directories or the whole workspace to find and load all custom-elements.json manifests.
   */
  public async scan(): Promise<Map<string, ComponentApiInfo>> {
    this.components.clear();

    const manifestPaths: string[] = [];

    if (this.options.packageDirs && this.options.packageDirs.length > 0) {
      for (const relativeDir of this.options.packageDirs) {
        const targetDir = path.join(this.workspaceRoot, relativeDir);
        try {
          const entries = await fs.readdir(targetDir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const componentDir = path.join(targetDir, entry.name);
              manifestPaths.push(
                path.join(componentDir, 'custom-elements.json'),
              );
            }
          }
        } catch (e) {
          console.error(
            `[CEM-MCP] Error reading directory at ${targetDir}:`,
            e,
          );
        }
      }
    } else {
      // Recursive crawl
      const paths = await this.findCustomElementsManifests(this.workspaceRoot);
      manifestPaths.push(...paths);
    }

    for (const manifestPath of manifestPaths) {
      try {
        const manifestContent = await fs.readFile(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent);

        // Resolve package name by reading sibling package.json or using parent directory name
        const componentDir = path.dirname(manifestPath);
        let packageName = path.basename(componentDir); // Fallback
        const pkgJsonPath = path.join(componentDir, 'package.json');
        try {
          const pkgContent = await fs.readFile(pkgJsonPath, 'utf-8');
          const pkg = JSON.parse(pkgContent);
          if (pkg.name) {
            packageName = pkg.name;
          }
        } catch (_e) {
          // package.json doesn't exist or is malformed, use fallback
        }

        this.processManifest(manifest, packageName);
      } catch (_e) {
        // Manifest doesn't exist or is malformed; skip silently
      }
    }

    return this.components;
  }

  /**
   * Process a parsed CEM manifest and extract/filter only the public-facing API.
   */
  private processManifest(manifest: any, packageName: string): void {
    if (!manifest.modules) return;

    const filter = this.options.memberFilter || (() => true);

    for (const mod of manifest.modules) {
      if (!mod.declarations) continue;

      for (const decl of mod.declarations) {
        if (decl.kind === 'class' && decl.customElement) {
          const tagName = decl.tagName || '';
          if (!tagName) continue;

          const properties: any[] = [];
          const methods: any[] = [];

          if (decl.members) {
            for (const member of decl.members) {
              if (!filter(member)) continue;

              if (member.kind === 'field') {
                properties.push({
                  name: member.name,
                  type: member.type?.text,
                  default: member.default,
                  description: member.description,
                  attribute: member.attribute,
                  deprecated: member.deprecated,
                  since: member.since,
                  see: member.see,
                  readonly: member.readonly,
                  writeonly: member.writeonly,
                });
              } else if (member.kind === 'method') {
                methods.push({
                  name: member.name,
                  description: member.description,
                  parameters: member.parameters?.map((p: any) => ({
                    name: p.name,
                    type: p.type?.text,
                    description: p.description,
                  })),
                  return: member.return?.type?.text
                    ? {
                        type: member.return.type.text,
                        description: member.return.description,
                      }
                    : undefined,
                  deprecated: member.deprecated,
                  since: member.since,
                  see: member.see,
                });
              }
            }
          }

          const componentInfo: ComponentApiInfo = {
            tagName,
            name: decl.name,
            description: decl.description,
            summary: decl.summary,
            deprecated: decl.deprecated,
            since: decl.since,
            see: decl.see,
            package: packageName,
            attributes: decl.attributes?.map((attr: any) => ({
              name: attr.name,
              type: attr.type?.text,
              default: attr.default,
              description: attr.description,
              fieldName: attr.fieldName,
            })),
            properties: properties.length > 0 ? properties : undefined,
            methods: methods.length > 0 ? methods : undefined,
            slots: decl.slots?.map((slot: any) => ({
              name: slot.name,
              description: slot.description,
            })),
            events: decl.events?.map((ev: any) => ({
              name: ev.name,
              type: ev.type?.text,
              description: ev.description,
            })),
            cssProperties: decl.cssProperties?.map((cp: any) => ({
              name: cp.name,
              default: cp.default,
              description: cp.description,
            })),
            cssStates: decl.cssStates?.map((cs: any) => ({
              name: cs.name,
              description: cs.description,
            })),
          };

          this.components.set(tagName, componentInfo);
        }
      }
    }
  }

  public getComponent(tagName: string): ComponentApiInfo | undefined {
    return this.components.get(tagName);
  }

  public getAllComponents(): ComponentApiInfo[] {
    return Array.from(this.components.values());
  }
}
