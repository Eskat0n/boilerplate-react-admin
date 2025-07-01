import {useState} from "react";

export const useForm = function <T>(
    defaultForm: T
): [
    T,
    (value: Partial<T>) => void,
    () => void
] {
    const [form, setForm] = useState(defaultForm);

    return [
        form,
        (value: Partial<T>) => setForm({...form, ...value}),
        () => setForm(defaultForm)
    ];
}
