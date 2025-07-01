import React, {ReactNode, useEffect, Fragment} from "react";
import {usePage} from "./PageContext";
// import {getSettings} from "../Settings";
// import {arrayCyclePush} from "../../utils/ArrayUtils";

type Props = {
    title: ReactNode;
    loading?: boolean;
};

export const Page: React.FC<Props> = props => {
    // const settings = getSettings();
    // const location = useLocation();
    const page = usePage();

    useEffect(() => {
        page.setTitle(props.title);
        // const recentPages = settings.recentPages;
        // if (props.title && location.pathname != "/" && !recentPages.find(x => x.path == location.pathname))
        //     settings.recentPages = arrayCyclePush(recentPages, {
        //         title: props.title,
        //         path: location.pathname
        //     }, 5);
    }, [props.title]);

    useEffect(() => {
        page.setLoading(props.loading ?? false);
    }, [props.loading]);

    return <Fragment>{props.children}</Fragment>;
}
