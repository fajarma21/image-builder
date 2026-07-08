import { create } from 'zustand';
import type { KeyboardStore } from './index.types';

const useKeyboardStore = create<KeyboardStore>((set) => ({
  spaceKey: false,
  toggleSpace: (value) => set(() => ({ spaceKey: value })),
}));

export default useKeyboardStore;
