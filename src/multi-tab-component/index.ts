import { strings } from '@angular-devkit/core';
import { apply, Rule, SchematicContext, Tree, url, template, mergeWith, SchematicsException, move } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';

export function multiTabComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplate = url('./files');


    const workspaceAsBuffer = tree.read('angular.json');
    if (!workspaceAsBuffer) {
      throw new SchematicsException("Not an Angular CLI workspace");
    }
    const workspace = JSON.parse(workspaceAsBuffer.toString());
    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];
    const path = `${project.sourceRoot}/${project.projectType === 'application' ? 'app' : 'lib'}`;
    const parsed = parseName(path, _options.name);
    _options.name = parsed.name;


    const sourceParametrizedTemplate = apply(sourceTemplate, [
      template(
        {
          ..._options,
          ...strings,
        }
      ),
      move(parsed.path)
    ]);

    tree = mergeWith(sourceParametrizedTemplate)(tree, _context) as Tree;

    return tree;
  };
}