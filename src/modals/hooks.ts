import {useState} from "react";

type ModalState<T> = {
    isOpen: boolean;
    model: T | null;
};

type OpenFunction<T> = (model?: T | null) => void;
type CloseFunction = () => void;

export function useModalState<T>(defaultState: ModalState<T> = {
    isOpen: false,
    model: null,
}): [
    ModalState<T>,
    OpenFunction<T>,
    CloseFunction
] {
    const [state, setState] = useState<ModalState<T>>(defaultState);
    return [
        state,
        (model: T | null = null) => setState({isOpen: true, model}),
        () => setState({...state, isOpen: false})
    ];
}

export function useEditModal<T>(defaultState: ModalState<T> = {
    isOpen: false,
    model: null,
}): ModalState<T> & {
    open: OpenFunction<T>;
    close: CloseFunction;
} {
    const [state, setState] = useState<ModalState<T>>(defaultState);
    return {
        ...state,
        open: (model: T | null = null) => setState({isOpen: true, model}),
        close: () => setState({...state, isOpen: false})
    };
}
