import React from "react";
import {useLocation, useNavigate, matchPath} from "react-router-dom";
import {Tabs, Tab, TabsProps, TabProps} from "@material-ui/core";

type Props = Omit<TabsProps, "value" | "onChange"> & {
    basename?: string;
    tabs: TabProps & {
        to: string;
    }[];
};

export const NavTabs = ({basename = "", tabs, ...props}: Props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const item = tabs.find(item => matchPath(basename + item.to, location.pathname));
    const tabIndex = item ? tabs.indexOf(item) : 0;

    return (
        <Tabs
            variant="scrollable"
            scrollButtons="auto"
            {...props}
            value={tabIndex}
            onChange={(_, newValue) => navigate(basename + tabs[newValue].to)}
        >
            {tabs.map(({to, ...tabProps}, i) =>
                <Tab key={i} {...tabProps}/>
            )}
        </Tabs>
    );
};
