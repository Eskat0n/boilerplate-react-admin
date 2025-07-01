import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    stack: {
        display: "flex",
    },
    stackVertical: {
        flexDirection: "column",
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2)
        }
    },
    stackHorizontal: {
        flexDirection: "row",
        '& > *:not(:last-child)': {
            marginRight: theme.spacing(2)
        }
    }
}))

type Props = {
    className?: string;
    direction?: "vertical" | "horizontal"
};

export const Stack: React.FC<Props> = props => {
    const classes = useStyles();
    const direction = props.direction ?? "vertical";

    return (
        <div className={clsx(props.className, classes.stack, {
            [classes.stackVertical]: direction == "vertical",
            [classes.stackHorizontal]: direction == "horizontal",
        })}>
            {props.children}
        </div>
    );
};
