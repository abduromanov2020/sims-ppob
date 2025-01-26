declare module '*.css' {
    const css: any
    export default css
}

interface TopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onConfirm: () => void;
    isLoading?: boolean;
}

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    error: string;
}

