import type { EditorSnapshot } from '@/types/shape';

export interface PushHistoryParams extends EditorSnapshot {
  past: EditorSnapshot[];
}
