import type { SceneNode } from './scene-node';
import { combineValidationResults, createValidationIssue, type ValidationResult, validResult } from './validation';
import { validateSceneNode } from './scene-node';
import type { SceneAsset } from './scene-asset';
import { validateSceneAsset } from './scene-asset';

export interface ScenePage {
  id: string;
  name: string;
  pageId: string;
  rootNodeId: string;
  nodesById: Record<string, SceneNode>;
}

export interface SceneDocument {
  id: string;
  pageId: string;
  schemaVersion: string;
  pages: ScenePage[];
  assets: SceneAsset[];
}

export const validateSceneDocument = (document: SceneDocument): ValidationResult => {
  const issues = [];
  if (document.pages.length === 0) issues.push(createValidationIssue({ code: 'SCENE_PAGES_EMPTY', message: 'SceneDocument pages must not be empty.', path: 'pages', severity: 'error' }));

  for (const page of document.pages) {
    if (page.pageId !== page.id) {
      issues.push(createValidationIssue({ code: 'SCENE_PAGE_ID_MISMATCH', message: 'ScenePage.pageId must match page.id.', path: `pages.${page.id}.pageId`, severity: 'error' }));
    }
    if (!page.nodesById || typeof page.nodesById !== 'object') {
      issues.push(createValidationIssue({ code: 'SCENE_NODES_REQUIRED', message: 'SceneDocument page must have nodesById object.', path: `pages.${page.id}.nodesById`, severity: 'error' }));
      continue;
    }
    const results = Object.values(page.nodesById).map((node) => validateSceneNode(node));
    const combined = combineValidationResults(...results);
    issues.push(...combined.issues.map((issue) => ({ ...issue, path: `pages.${page.id}.nodesById.${issue.path}` })));

    for (const node of Object.values(page.nodesById)) {
      if (node.type === 'group' || node.type === 'frame') {
        for (const childId of node.children) {
          if (!page.nodesById[childId]) {
            issues.push(createValidationIssue({ code: 'SCENE_CHILD_NOT_FOUND', message: `Child node ${childId} not found.`, path: `pages.${page.id}.nodesById.${node.id}.children`, severity: 'error' }));
          }
        }
      }
    }
  }

  const assetResults = document.assets.map((asset) => validateSceneAsset(asset));
  issues.push(...combineValidationResults(...assetResults).issues);

  return issues.length === 0 ? validResult() : { valid: false, issues };
};

export const createSceneDocumentFixture = (): SceneDocument => ({
  id: 'scene-doc-1',
  pageId: 'home',
  schemaVersion: '1.0.0',
  pages: [
    {
      id: 'home',
      pageId: 'home',
      name: 'Home',
      rootNodeId: 'root',
      nodesById: {
        root: { id: 'root', type: 'frame', x: 0, y: 0, width: 1200, height: 2000, children: ['hero'] },
        hero: { id: 'hero', type: 'text', x: 24, y: 24, width: 300, height: 80, text: 'Hello' }
      }
    }
  ],
  assets: []
});
