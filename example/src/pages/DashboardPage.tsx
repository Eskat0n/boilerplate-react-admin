import React from "react";
import { Typography } from "@material-ui/core";
import { Page } from "@codeparts/boilerplate-react-admin";

export const DashboardPage = () => {
    return(
        <Page title="Dashboard">
            Dashboard
            <Typography id="foo" variant="body2">
                Lorem ipsum
            </Typography>
        </Page>
    );
};
