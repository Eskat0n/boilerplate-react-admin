export type EditModalProps<TItem> = {
    isOpen: boolean;
    item: TItem | null;
    onSuccess: () => void;
    onClose: () => void;
};
