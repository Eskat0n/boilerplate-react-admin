import React from "react";
import {Fab, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

type ButtonType = "primary" | "secondary";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: ButtonType;
    icon?: React.ReactElement;
}

export const ActionButton: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <Fab
            className={classes.fab}
            color={props.type ?? "primary"}
            onClick={props.onClick}
        >
            {props.icon ?? <AddIcon/>}
        </Fab>
    );
}
