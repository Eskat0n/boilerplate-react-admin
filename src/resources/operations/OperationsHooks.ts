import {useState} from "react";
import {useSnackbar} from "notistack";
import {useConfirm} from "material-ui-confirm";
import {APIResult, OrderForm} from "../types";

type Item = {
    id: number | string;
}

type ReorderEndpoint = (positions: OrderForm[]) => Promise<APIResult>;
type ReorderHandler<TItem> = {
    handleReorder: (items: TItem[]) => Promise<void>;
    loading: boolean;
};

export const useReorderHandler = function <TItem extends Item>(
    endpoint: ReorderEndpoint
): ReorderHandler<TItem> {
    const [loading, setLoading] = useState(false);

    const handleReorder = (items: TItem[]) => {
        const order = items.map((x, i) => ({
            id: x.id,
            orderIndex: i
        }));

        setLoading(true);
        return endpoint(order)
            .then(() => {

            })
            .finally(() => setLoading(false));
    }

    return {
        handleReorder,
        loading,
    };
};

type RemoveEndpoint = (...args: any[]) => Promise<APIResult>;
type RemoveHandler<TItem> = {
    handleRemove: (item: TItem) => Promise<void>;
    loading: boolean;
};

export const useRemoveHandler = function <TItem extends Item>(
    func: RemoveEndpoint,
    entityName: string,
): RemoveHandler<TItem> {
    const confirm = useConfirm();
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleRemove = (item: TItem) => {
        return confirm({
            title: "Confirmation",
            description: `Are you sure you want to delete ${entityName.toLowerCase()}?`,
        })
            .then(() => {
                setLoading(true);
                return func(item.id);
            })
            .then(result => new Promise<void>(resolve => {
                if (result.success) {
                    enqueueSnackbar(`${entityName} successfully deleted`);
                    resolve();
                }
            }))
            .finally(() => setLoading(false));
    };

    return {
        handleRemove,
        loading,
    };
};
