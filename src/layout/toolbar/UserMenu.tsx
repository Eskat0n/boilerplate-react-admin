import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { Button, Hidden, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import firebase from "firebase/app";

export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClose = () => setAnchorEl(null);

    return (
        <React.Fragment>
            <Hidden smDown>
                <Button
                    color="inherit"
                    onClick={event => setAnchorEl(event.currentTarget)}
                >
                    {firebase.auth().currentUser?.email}
                </Button>
            </Hidden>
            <Hidden mdUp>
                <IconButton
                    color="inherit"
                    onClick={event => setAnchorEl(event.currentTarget)}
                >
                    <AccountCircleIcon />
                </IconButton>
            </Hidden>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                <MenuItem component={RouteLink} to="/user/settings">
                    Settings
                </MenuItem>
                <MenuItem onClick={() => {
                    firebase.auth().signOut()
                        .finally(() => handleClose());
                }}>
                    Sign out
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};
