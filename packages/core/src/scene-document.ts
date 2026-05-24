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

export interface SceneDocumentMeta {
  tenantId: string;
  projectId: string;
  draftId: string;
  createdAtIso: string;
  updatedAtIso: string;
  createdBy: string;
}

export interface SceneDocument {
  id: string;
  pageId: string;
  schemaVersion: string;
  pages: ScenePage[];
  assets: SceneAsset[];
  metadata: SceneDocumentMeta;
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
    if (!page.nodesById[page.rootNodeId]) {
      issues.push(createValidationIssue({ code: 'SCENE_ROOT_NODE_NOT_FOUND', message: 'ScenePage rootNodeId must exist in nodesById.', path: `pages.${page.id}.rootNodeId`, severity: 'error' }));
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

  if (!document.metadata?.tenantId || !document.metadata?.projectId || !document.metadata?.draftId) {
    issues.push(createValidationIssue({ code: 'SCENE_METADATA_REQUIRED', message: 'SceneDocument metadata tenant/project/draft is required.', path: 'metadata', severity: 'error' }));
  }

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
  assets: [],
  metadata: {
    tenantId: 'tenant_prod_001',
    projectId: 'project_prod_001',
    draftId: 'draft_prod_001',
    createdAtIso: '2026-01-01T00:00:00.000Z',
    updatedAtIso: '2026-01-01T00:00:00.000Z',
    createdBy: 'system'
  }
});
