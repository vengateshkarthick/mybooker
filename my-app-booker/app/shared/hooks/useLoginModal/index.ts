import { create } from 'zustand';

interface LoginMdoalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginMdoalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        set({isOpen: true});
    },
    onClose: () => {
        set({ isOpen: false });
    }
}));

export default  useLoginModal;