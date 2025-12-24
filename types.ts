
import { TreeState } from './constants';

export interface ParticleData {
  chaosPos: [number, number, number];
  targetPos: [number, number, number];
  size: number;
}

export interface AppState {
  treeState: TreeState;
  progress: number; // 0 to 1
  isThinking: boolean;
  messages: Array<{role: 'user' | 'ai', text: string}>;
}
