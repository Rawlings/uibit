interface CollectedClassInfo {
  cssStates: Array<{ name: string; description: string }>;
  methods: Map<
    string,
    {
      params: Map<string, string>;
      returns?: string;
      deprecated?: boolean | string;
      since?: string;
      see?: string;
    }
  >;
  fields: Map<
    string,
    {
      deprecated?: boolean | string;
      since?: string;
      see?: string;
      readonly?: boolean;
      writeonly?: boolean;
    }
  >;
  deprecated?: boolean | string;
  since?: string;
  see?: string;
  summary?: string;
  tagName?: string;
  mixes?: string[];
  isMixin?: boolean;
}

export default function uibitCemExtended() {
  // Map of module path -> Map of class name -> CollectedClassInfo
  const moduleCache = new Map<string, Map<string, CollectedClassInfo>>();

  const getCommentString = (comment?: any): string => {
    if (!comment) return '';
    if (typeof comment === 'string') return comment;
    if (Array.isArray(comment)) {
      return comment.map((c) => c.text || '').join('');
    }
    return comment.text || '';
  };

  const getOrCreateClassInfo = (
    modulePath: string,
    className: string,
  ): CollectedClassInfo => {
    if (!moduleCache.has(modulePath)) {
      moduleCache.set(modulePath, new Map());
    }
    const classMap = moduleCache.get(modulePath)!;
    if (!classMap.has(className)) {
      classMap.set(className, {
        cssStates: [],
        methods: new Map(),
        fields: new Map(),
      });
    }
    return classMap.get(className)!;
  };

  return {
    name: 'uibit-cem-extended-plugin',

    analyzePhase({ ts, node }: { ts: any; node: any }) {
      const sourceFile = node.getSourceFile();
      const modulePath = sourceFile ? sourceFile.fileName : '';
      if (!modulePath) return;

      // Handle Class Declaration
      if (ts.isClassDeclaration(node) && node.name) {
        const className = node.name.text;
        const classInfo = getOrCreateClassInfo(modulePath, className);

        // Parse class-level JSDocs (@cssstate, @deprecated, @since, @see)
        const tags = ts.getJSDocTags(node);
        for (const tag of tags) {
          if (tag.tagName.text === 'cssstate') {
            const commentStr = getCommentString(tag.comment);
            const match = commentStr.match(
              /^([a-zA-Z0-9_-]+)(?:\s*-\s*|\s+)(.*)$/,
            );
            if (match) {
              classInfo.cssStates.push({
                name: match[1]!,
                description: match[2]?.trim(),
              });
            } else if (commentStr.trim()) {
              classInfo.cssStates.push({
                name: commentStr.trim(),
                description: '',
              });
            }
          } else if (tag.tagName.text === 'deprecated') {
            classInfo.deprecated = getCommentString(tag.comment) || true;
          } else if (tag.tagName.text === 'since') {
            classInfo.since = getCommentString(tag.comment);
          } else if (tag.tagName.text === 'see') {
            classInfo.see = getCommentString(tag.comment);
          } else if (tag.tagName.text === 'summary') {
            classInfo.summary = getCommentString(tag.comment);
          } else if (
            tag.tagName.text === 'tag' ||
            tag.tagName.text === 'tagname'
          ) {
            classInfo.tagName = getCommentString(tag.comment).trim();
          } else if (tag.tagName.text === 'mixes') {
            const mixinName = getCommentString(tag.comment).trim();
            if (mixinName) {
              classInfo.mixes = classInfo.mixes || [];
              classInfo.mixes.push(mixinName);
            }
          } else if (tag.tagName.text === 'mixin') {
            classInfo.isMixin = true;
          }
        }
      }

      // Handle Property/Field Declaration
      if (
        (ts.isPropertyDeclaration(node) ||
          ts.isGetAccessor(node) ||
          ts.isSetAccessor(node)) &&
        node.name
      ) {
        const classNode = node.parent;
        if (classNode && ts.isClassDeclaration(classNode) && classNode.name) {
          const className = classNode.name.text;
          const fieldName = node.name.getText();
          const classInfo = getOrCreateClassInfo(modulePath, className);

          const fieldInfo: any = {};
          const tags = ts.getJSDocTags(node);
          for (const tag of tags) {
            if (tag.tagName.text === 'deprecated') {
              fieldInfo.deprecated = getCommentString(tag.comment) || true;
            } else if (tag.tagName.text === 'since') {
              fieldInfo.since = getCommentString(tag.comment);
            } else if (tag.tagName.text === 'see') {
              fieldInfo.see = getCommentString(tag.comment);
            } else if (tag.tagName.text === 'readonly') {
              fieldInfo.readonly = true;
            } else if (tag.tagName.text === 'writeonly') {
              fieldInfo.writeonly = true;
            }
          }

          if (Object.keys(fieldInfo).length > 0) {
            classInfo.fields.set(fieldName, fieldInfo);
          }
        }
      }

      // Handle Method Declaration
      if (
        (ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) &&
        node.name
      ) {
        const classNode = node.parent;
        if (classNode && ts.isClassDeclaration(classNode) && classNode.name) {
          const className = classNode.name.text;
          const methodName = node.name.getText();
          const classInfo = getOrCreateClassInfo(modulePath, className);

          const methodInfo: any = {
            params: new Map<string, string>(),
            returns: undefined,
          };

          const tags = ts.getJSDocTags(node);
          for (const tag of tags) {
            if (ts.isJSDocParameterTag(tag) && tag.name) {
              const paramName = tag.name.getText();
              const paramComment = getCommentString(tag.comment);
              if (paramComment) {
                methodInfo.params.set(paramName, paramComment);
              }
            } else if (
              tag.tagName.text === 'returns' ||
              tag.tagName.text === 'return'
            ) {
              const returnComment = getCommentString(tag.comment);
              if (returnComment) {
                methodInfo.returns = returnComment;
              }
            } else if (tag.tagName.text === 'deprecated') {
              methodInfo.deprecated = getCommentString(tag.comment) || true;
            } else if (tag.tagName.text === 'since') {
              methodInfo.since = getCommentString(tag.comment);
            } else if (tag.tagName.text === 'see') {
              methodInfo.see = getCommentString(tag.comment);
            }
          }

          if (
            methodInfo.params.size > 0 ||
            methodInfo.returns ||
            methodInfo.deprecated !== undefined ||
            methodInfo.since ||
            methodInfo.see
          ) {
            classInfo.methods.set(methodName, methodInfo);
          }
        }
      }
      // Handle standalone Function/Method Declaration that uses @memberof
      if (ts.isFunctionDeclaration(node) && node.name) {
        const functionName = node.name.text;
        const tags = ts.getJSDocTags(node);
        let memberOfClass: string | undefined;
        for (const tag of tags) {
          if (tag.tagName.text === 'memberof') {
            memberOfClass = getCommentString(tag.comment).trim();
          }
        }

        if (memberOfClass) {
          const classInfo = getOrCreateClassInfo(modulePath, memberOfClass);
          const methodInfo: any = {
            params: new Map<string, string>(),
            returns: undefined,
          };

          for (const tag of tags) {
            if (ts.isJSDocParameterTag(tag) && tag.name) {
              const paramName = tag.name.getText();
              const paramComment = getCommentString(tag.comment);
              if (paramComment) {
                methodInfo.params.set(paramName, paramComment);
              }
            } else if (
              tag.tagName.text === 'returns' ||
              tag.tagName.text === 'return'
            ) {
              const returnComment = getCommentString(tag.comment);
              if (returnComment) {
                methodInfo.returns = returnComment;
              }
            } else if (tag.tagName.text === 'deprecated') {
              methodInfo.deprecated = getCommentString(tag.comment) || true;
            } else if (tag.tagName.text === 'since') {
              methodInfo.since = getCommentString(tag.comment);
            } else if (tag.tagName.text === 'see') {
              methodInfo.see = getCommentString(tag.comment);
            }
          }
          classInfo.methods.set(functionName, methodInfo);
        }
      }
    },

    moduleLinkPhase({ moduleDoc }: { moduleDoc: any }) {
      const modulePath = moduleDoc.path;
      if (!modulePath) return;

      const classMap = moduleCache.get(modulePath);
      if (!classMap) return;

      for (const [className, info] of classMap.entries()) {
        const decl = moduleDoc.declarations?.find(
          (d: any) => d.name === className && d.kind === 'class',
        );
        if (!decl) continue;

        // 1. Inject class-level tags
        if (info.deprecated !== undefined) decl.deprecated = info.deprecated;
        if (info.since) decl.since = info.since;
        if (info.see) decl.see = info.see;
        if (info.summary) decl.summary = info.summary;
        if (info.tagName) {
          decl.tagName = info.tagName;
          decl.customElement = true;
        }
        if (info.isMixin) {
          decl.kind = 'mixin';
        }
        if (info.mixes && info.mixes.length > 0) {
          decl.mixins = decl.mixins || [];
          for (const mName of info.mixes) {
            if (!decl.mixins.some((m: any) => m.name === mName)) {
              decl.mixins.push({ name: mName });
            }
          }
        }

        // 2. Inject CSS Custom States
        if (info.cssStates.length > 0) {
          decl.cssStates = info.cssStates;
        }

        // 3. Inject field tags
        if (info.fields.size > 0) {
          decl.members = decl.members || [];
          for (const [fieldName, fieldInfo] of info.fields.entries()) {
            const fieldDecl = decl.members.find(
              (m: any) => m.kind === 'field' && m.name === fieldName,
            );
            if (fieldDecl) {
              if (fieldInfo.deprecated !== undefined)
                fieldDecl.deprecated = fieldInfo.deprecated;
              if (fieldInfo.since) fieldDecl.since = fieldInfo.since;
              if (fieldInfo.see) fieldDecl.see = fieldInfo.see;
              if (fieldInfo.readonly !== undefined)
                fieldDecl.readonly = fieldInfo.readonly;
              if (fieldInfo.writeonly !== undefined)
                fieldDecl.writeonly = fieldInfo.writeonly;
            }
          }
        }

        // 4. Inject parameter/returns/method tags
        if (info.methods.size > 0) {
          decl.members = decl.members || [];
          for (const [methodName, methodInfo] of info.methods.entries()) {
            let methodDecl = decl.members.find(
              (m: any) => m.kind === 'method' && m.name === methodName,
            );
            if (!methodDecl) {
              methodDecl = {
                kind: 'method',
                name: methodName,
                description: '',
              };
              decl.members.push(methodDecl);
            }
            if (methodDecl) {
              if (methodInfo.deprecated !== undefined)
                methodDecl.deprecated = methodInfo.deprecated;
              if (methodInfo.since) methodDecl.since = methodInfo.since;
              if (methodInfo.see) methodDecl.see = methodInfo.see;

              // Parameter descriptions
              if (methodDecl.parameters) {
                for (const param of methodDecl.parameters) {
                  if (methodInfo.params.has(param.name)) {
                    param.description = methodInfo.params.get(param.name);
                  }
                }
              }
              // Returns description
              if (methodInfo.returns) {
                methodDecl.return = methodDecl.return || {};
                methodDecl.return.description = methodInfo.returns;
              }
            }
          }
        }
      }
    },
  };
}
