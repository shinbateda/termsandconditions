export type PhaseId = 'phase1' | 'phase2' | 'compare';

export type DocId = 'p1-doc1' | 'p1-doc2' | 'p1-doc3' | 'p1-doc4' | 'p2-doc1' | 'p2-doc2' | 'p2-doc3' | 'p2-doc4';

export type DocCategory = 'doc1' | 'doc2' | 'doc3' | 'doc4';

export interface DocMetadata {
  id: string;
  category: DocCategory;
  title: string;
  label: string;
  phase: 'phase1' | 'phase2';
  effectiveDate: string;
  badge?: string;
  summary: string;
}

export interface ArticleItem {
  id: string;
  articleNumber: string;
  title: string;
  content: string[];
  subpoints?: string[];
  highlights?: string[];
  isNewOrUpdated?: boolean;
}

export interface DiffItem {
  category: DocCategory;
  categoryName: string;
  topic: string;
  phase1: string;
  phase2: string;
  legalImpact: string;
  tag: string;
}
