import { create } from 'zustand';

interface SingupModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSingUpModalStore = create<SingupModalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        set({isOpen: true});
    },
    onClose: () => {
        set({ isOpen: false });
    }
}));

export default  useSingUpModalStore;