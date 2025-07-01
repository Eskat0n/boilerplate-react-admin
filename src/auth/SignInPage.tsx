import React, { useState } from "react";
import {
    Avatar,
    TextField,
    Paper,
    Box,
    Grid,
    makeStyles,
    Typography,
    Link
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import firebase from "firebase/app";
import { useSnackbar } from "notistack";
import { Copyright } from "../layout";
import { ProgressButton } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        // backgroundImage: `url(/static/images/signin_0${Math.floor(Math.random() * Math.floor(3)) + 1}.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "top"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export const SignInPage: React.FC = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={event => {
                            event.preventDefault();

                            if (!email) {
                                enqueueSnackbar("Please enter email", { variant: "warning" });
                                return;
                            }
                            if (!password) {
                                enqueueSnackbar("Please enter password", { variant: "warning" });
                                return;
                            }

                            setError("");
                            setLoading(true);
                            firebase.auth().signInWithEmailAndPassword(email, password)
                                .then(result => {
                                    enqueueSnackbar(`Signed in as ${result.user?.email}`, { variant: "success" });
                                })
                                .catch(error => setError(error.message))
                                .finally(() => setLoading(false));
                        }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            error={!!error}
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            helperText={error}
                            error={!!error}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <div className={classes.submit}>
                            <ProgressButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                loading={loading}
                            >
                                Sign In
                            </ProgressButton>
                        </div>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={() => {
                                        if (!email)
                                            return;

                                        setError("");
                                        setLoading(true);
                                        firebase.auth().sendPasswordResetEmail(email)
                                            .then(() => {
                                                enqueueSnackbar("Email sent");
                                            })
                                            .catch(error => setError(error.message))
                                            .finally(() => setLoading(false));
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};
