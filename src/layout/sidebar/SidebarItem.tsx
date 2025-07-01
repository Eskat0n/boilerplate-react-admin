import React from "react";
import {Link as RouterLink, useMatch} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

type Props = {
    id?: string;
    to: string;
    name: string;
    icon?: React.ReactElement;
};

export const SidebarItem = (props: Props) => {
    const match = useMatch(props.to);

    return (
        <ListItem
            id={props.id}
            button
            selected={!!match}
            component={RouterLink}
            to={props.to}
        >
            {
                props.icon &&
                <ListItemIcon>{props.icon}</ListItemIcon>
            }
            <ListItemText primary={props.name}/>
        </ListItem>
    );
};
