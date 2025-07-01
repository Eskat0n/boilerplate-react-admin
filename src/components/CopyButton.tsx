import React from "react";
import {IconButton, makeStyles, Tooltip} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {useSnackbar} from "notistack";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles(theme => ({
    copyButton: {
        marginLeft: theme.spacing(1)
    }
}));

type Props = {
    text: string;
    title?: string;
    notification?: string;
    onCopy?: () => void;
}

export const CopyButton: React.FC<Props> = props => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    return (
        <Tooltip title={props.title ?? "Copy"}>
            <CopyToClipboard
                text={props.text}
                onCopy={props.onCopy ?? (() => enqueueSnackbar(props.notification ?? "Copied to clipboard"))}
            >
                {
                    props.children ??
                    <IconButton className={classes.copyButton} size="small">
                        <FileCopyIcon fontSize="inherit"/>
                    </IconButton>
                }
            </CopyToClipboard>
        </Tooltip>
    );
};
