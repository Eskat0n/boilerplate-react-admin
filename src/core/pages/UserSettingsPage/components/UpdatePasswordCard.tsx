import React, { useState } from "react";
import { TextField, makeStyles, Typography, Paper } from "@material-ui/core";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import { ProgressButton } from "../../../../components";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    form: {
        maxWidth: 350,
        "& > :not(:last-child)": {
            marginBottom: theme.spacing(2)
        }
    }
}));

export const UpdatePasswordCard = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        password: "",
        passwordRepeat: ""
    });
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Paper className={classes.paper}>
            <form
                className={classes.form}
                onSubmit={event => {
                    event.preventDefault();

                    setLoading(true);
                    firebase.auth().currentUser?.updatePassword(form.password)
                        .then(() => {
                            enqueueSnackbar("Password changed", { variant: "success" });
                        })
                        .catch(error => {
                            enqueueSnackbar("Error while changing password", { variant: "error" });
                            console.log(error);
                        })
                        .finally(() => setLoading(false))
                }}
            >
                <Typography variant="body1" gutterBottom>
                    <strong>Change password</strong>
                </Typography>
                <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={event => setForm({ ...form, password: event.target.value })}
                />
                <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Confirm password"
                    autoComplete="false"
                    value={form.passwordRepeat}
                    onChange={event => setForm({ ...form, passwordRepeat: event.target.value })}
                />
                <ProgressButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    loading={loading}
                >
                    Change
                </ProgressButton>
            </form>
        </Paper>
    );
};
