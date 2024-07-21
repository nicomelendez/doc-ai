import { create } from 'zustand';

const useStore = create((set) => ({
  apiResponse: null,
  setApiResponse: (response) => set({ apiResponse: response }),
}));

export default useStore;
