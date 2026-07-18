import swc from '@swc/core';

/**
 * Parse a full TypeScript module code string to a SWC Module AST.
 */
export function parseModule(source: string): any {
  return swc.parseSync(source, {
    syntax: 'typescript',
    tsx: false,
    decorators: true,
    comments: true,
    target: 'es2022',
  });
}

/**
 * Parse class properties/methods into an array of SWC ClassMember AST nodes.
 */
export function parseClassMembers(source: string): any[] {
  const ast = swc.parseSync(`class T { ${source} }`, {
    syntax: 'typescript',
    decorators: true,
  });
  const classDecl = ast.body[0] as any;
  return classDecl?.declaration?.body || classDecl?.body || [];
}

/**
 * Parse arrow function code block and extract its statement nodes.
 */
export function extractStatementsFromArrow(source: string): any[] {
  const members = parseClassMembers(`static temp = () => { ${source} }`);
  const method = members[0];
  const arrowFn = method?.value;
  if (arrowFn?.body?.type === 'BlockStatement') {
    return arrowFn.body.stmts || [];
  }
  return [];
}

/**
 * Find class declaration node inside a parsed Module AST.
 */
export function findClassDeclaration(moduleAst: any): any {
  const exportDecl = moduleAst.body.find(
    (n: any) =>
      n.type === 'ExportDeclaration' &&
      n.declaration?.type === 'ClassDeclaration',
  );
  return exportDecl?.declaration;
}

/**
 * Find decorator by name (e.g. Component, Directive) on a class declaration.
 */
export function findComponentDecorator(
  classDecl: any,
  decoratorName = 'Component',
): any {
  return classDecl?.decorators?.find(
    (d: any) => d.expression?.callee?.value === decoratorName,
  );
}

/**
 * Parses an object literal definition string and returns its SWC properties AST array.
 */
export function extractObjectProperties(source: string): any[] {
  const moduleAst = parseModule(`const t = { ${source} };`);
  const varDecl = moduleAst.body[0];
  const objExpr = varDecl?.declarations?.[0]?.init;
  return objExpr?.properties || [];
}
