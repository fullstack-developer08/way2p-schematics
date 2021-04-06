import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

export function hello(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const name = _options.name;
    tree.create('hello.js', `console.log('Hello ${name}!')`);
    return tree;
  };
}
