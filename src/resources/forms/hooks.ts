import {useState} from "react";
import {useSnackbar} from "notistack";
import {APIResult} from "../types";

type CreateEndpoint = (form: any) => Promise<APIResult>;
type UpdateEndpoint = (id: any, form: any) => Promise<APIResult>;
type SubmitHandler<TForm> = {
    handleSubmit: (form: TForm, id?: number | string) => Promise<void>;
    loading: boolean;
};

export const useSubmitHandler = function <TForm>(
    createEndpoint: CreateEndpoint | null,
    updateEndpoint: UpdateEndpoint | null,
    entityName: string
): SubmitHandler<TForm> {
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (form: TForm, id?: number | string) => {
        if (loading)
            return Promise.reject();

        if (!id && createEndpoint) {
            setLoading(true);
            return createEndpoint(form)
                .then(result => new Promise<void>(resolve => {
                    if (result.success) {
                        enqueueSnackbar(`${entityName} successfully created`);
                        resolve();
                    }
                }))
                .finally(() => setLoading(false));
        } else if (updateEndpoint) {
            setLoading(true);
            return updateEndpoint(id, form)
                .then(result => new Promise<void>(resolve => {
                    if (result.success) {
                        enqueueSnackbar(`${entityName} successfully updated`);
                        resolve();
                    }
                }))
                .finally(() => setLoading(false));
        } else {
            return Promise.reject();
        }
    }

    return {
        handleSubmit,
        loading
    };
};
