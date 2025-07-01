import React, { Fragment, useRef, useState } from "react";
import {
    Badge,
    CircularProgress,
    ClickAwayListener,
    Grow,
    IconButton,
    List,
    makeStyles,
    Paper,
    Popper,
    Tooltip
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles(theme => ({
    paper: {
        transformOrigin: "top right"
    },
    list: {
        width: theme.spacing(40),
        maxHeight: theme.spacing(40),
        overflow: "auto"
    },
    listItem: {
        display: "flex",
        flexDirection: "column"
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(1, 0)
    },
    divider: {
        margin: theme.spacing(1, 0)
    }
}));

export const Notifications = () => {
    const classes = useStyles();
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setTooltipOpen(false);
    };

    return (
        <Fragment>
            <Tooltip
                open={tooltipOpen}
                onOpen={() => {
                    setTooltipOpen(!open);
                }}
                onClose={() => {
                    setTooltipOpen(false);
                }}
                title="Toggle notifications"
                enterDelay={300}
            >
                <IconButton
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={open ? "notifications-popup" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    data-ga-event-category="AppBar"
                    data-ga-event-action="toggleNotifications"
                >
                    <Badge
                        color="secondary"
                        badgeContent={0}
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Popper
                id="notifications-popup"
                anchorEl={anchorRef.current}
                open={open}
                placement="bottom-end"
                transition
                disablePortal
                role={undefined}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <Grow in={open} {...TransitionProps}>
                            <Paper className={classes.paper}>
                                <List className={classes.list}>
                                    {/*{messageList ? (*/}
                                    {/*    messageList.map((message, index) => (*/}
                                    {/*        <React.Fragment key={message.id}>*/}
                                    {/*            <ListItem alignItems="flex-start" className={classes.listItem}>*/}
                                    {/*                <Typography gutterBottom>{message.title}</Typography>*/}
                                    {/*                <Typography gutterBottom variant="body2">*/}
                                    {/*                    <span*/}
                                    {/*                        id="notification-message"*/}
                                    {/*                        dangerouslySetInnerHTML={{ __html: message.text }}*/}
                                    {/*                    />*/}
                                    {/*                </Typography>*/}
                                    {/*                {message.date && (*/}
                                    {/*                    <Typography variant="caption" color="text.secondary">*/}
                                    {/*                        {new Date(message.date).toLocaleDateString("en-US", {*/}
                                    {/*                            year: "numeric",*/}
                                    {/*                            month: "long",*/}
                                    {/*                            day: "numeric"*/}
                                    {/*                        })}*/}
                                    {/*                    </Typography>*/}
                                    {/*                )}*/}
                                    {/*            </ListItem>*/}
                                    {/*            {index < messageList.length - 1 ? (*/}
                                    {/*                <Divider className={classes.divider} />*/}
                                    {/*            ) : null}*/}
                                    {/*        </React.Fragment>*/}
                                    {/*    ))*/}
                                    {/*) : (*/}
                                    {/*    <div className={classes.loading}>*/}
                                    {/*        <CircularProgress size={32} />*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                    <div className={classes.loading}>
                                        <CircularProgress size={32} />
                                    </div>
                                </List>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                )}
            </Popper>
        </Fragment>
    );
};
