import React from "react";
import { Navigate } from "react-router-dom";
import firebase from "firebase/app";
import { Paper, makeStyles } from "@material-ui/core";
import { Page, Stack } from "../../../layout";
import { UpdatePasswordCard } from "./components/UpdatePasswordCard";
import { AppearanceCard } from "./components/AppearanceCard";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    }
}));

export const UserSettingsPage = () => {
    const classes = useStyles();
    const user = firebase.auth().currentUser;

    if (!user)
        return <Navigate to="/" />;

    return (
        <Page title="User settings">
            <Stack>
                <Paper className={classes.paper}>
                    email: {user.email}
                    <br />
                    email verified: {user.emailVerified ? "yes" : "no"}
                </Paper>
                <UpdatePasswordCard />
                <AppearanceCard />
            </Stack>
        </Page>
    );
};
