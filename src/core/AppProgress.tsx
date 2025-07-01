import React from "react";
import { Grid, LinearProgress, Typography } from "@material-ui/core";

export const AppProgress = () => {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={3}>
                <Typography variant="h5" gutterBottom>
                    App is loading
                </Typography>
                <LinearProgress />
            </Grid>
        </Grid>
    );
};
