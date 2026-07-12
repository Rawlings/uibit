export interface ParsedReleaseSection {
  title: string;
  category: 'Added' | 'Fixed' | 'Security' | 'Changed' | 'Deprecated' | 'Other';
  items: string[];
}

export interface ParsedRelease {
  version: string;
  date: string;
  sections: ParsedReleaseSection[];
}

function getCategory(title: string): ParsedReleaseSection['category'] {
  const t = title.toLowerCase().trim();
  if (t.includes('add') || t.includes('feat') || t.includes('new')) return 'Added';
  if (t.includes('fix') || t.includes('bug')) return 'Fixed';
  if (t.includes('sec')) return 'Security';
  if (t.includes('change') || t.includes('refactor') || t.includes('improv') || t.includes('updat')) return 'Changed';
  if (t.includes('deprecat')) return 'Deprecated';
  return 'Other';
}

export function parseChangelog(md: string): ParsedRelease[] {
  const releases: ParsedRelease[] = [];
  let currentRelease: ParsedRelease | null = null;
  let currentSection: ParsedReleaseSection | null = null;

  const lines = md.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const versionMatch = line.match(/^##\s+\[?([0-9a-zA-Z.-]+)\]?\s*-\s*([0-9-]+)/);
    if (versionMatch) {
      currentRelease = {
        version: versionMatch[1],
        date: versionMatch[2],
        sections: []
      };
      releases.push(currentRelease);
      currentSection = null;
      continue;
    }

    if (currentRelease) {
      const sectionMatch = line.match(/^###\s+(.+)$/);
      if (sectionMatch) {
        const title = sectionMatch[1].trim();
        currentSection = {
          title,
          category: getCategory(title),
          items: []
        };
        currentRelease.sections.push(currentSection);
        continue;
      }

      if (currentSection && line.startsWith('-')) {
        const itemText = line.substring(1).trim();
        currentSection.items.push(itemText);
      }
    }
  }

  return releases;
}
