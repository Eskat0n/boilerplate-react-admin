import React from "react";
import { ButtonProps, makeStyles, Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "relative",
        display: "inline-flex",
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    }
}));

type Props = ButtonProps & {
    loading: boolean;
}

export const ProgressButton = ({ loading, disabled, ...props }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button disabled={loading || disabled} {...props} />
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
};
