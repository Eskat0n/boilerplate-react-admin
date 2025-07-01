import React, { PropsWithChildren, useState, Fragment } from "react";
import { useMatch } from "react-router-dom";
import { Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
    nested: {
        "& > .MuiListItem-root": {
            paddingLeft: theme.spacing(5)
        }
    }
}));

type Props = PropsWithChildren<{
    id?: string;
    path: string;
    name: string;
    icon?: React.ReactElement;
}>;

export const SidebarMenu = (props: Props) => {
    const classes = useStyles();
    const match = useMatch(`${props.path}/*`);
    const [open, setOpen] = useState(!!match);

    return (
        <Fragment>
            <ListItem
                id={props.id}
                button
                onClick={() => setOpen(!open)}
            >
                {
                    props.icon &&
                    <ListItemIcon>{props.icon}</ListItemIcon>
                }
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" dense disablePadding className={classes.nested}>
                    {props.children}
                </List>
            </Collapse>
        </Fragment>
    );
};
