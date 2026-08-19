import createSnapshot from '../createSnapshot';
import type { PushHistoryParams } from './index.types';

const pushHistory = ({ past, ...state }: PushHistoryParams) => {
  return {
    past: [...past, createSnapshot(state)],
    future: [],
  };
};

export default pushHistory;
