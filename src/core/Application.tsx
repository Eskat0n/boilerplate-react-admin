import React, { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import firebase from "firebase/app";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import Joyride, { Step } from "react-joyride";
import { AppProgress } from "./AppProgress";
import { SignInPage } from "../auth";
import { AppLayout, AppLayoutProps } from "../layout";
import { UserSettingsPage } from "./pages/UserSettingsPage";
import { SidebarNav, SidebarNavProps } from "../layout/sidebar/SidebarNav";
import { ThemeSelector } from "../themes/ThemeSelector";
import { Notifications } from "../layout/toolbar/Notifications";
import { GlobalSearch, GlobalSearchProps } from "../layout/toolbar/GlobalSearch";
import TourTooltip from "../tour/TourTooltip";
import { AppMetadata } from "./createApplication";
import { ApplicationProvider } from "./ApplicationContext";

type ComponentWithChildren =
    React.FunctionComponent<{children: React.ReactNode}>
    | React.ComponentClass<{children: React.ReactNode}>;

type ApplicationProps = PropsWithChildren<{
    id: string;
    name: string;
    metadata: AppMetadata;
    tour?: Step[];
    showNotifications?: boolean;
    toolbarSearch?: GlobalSearchProps;
    toolbarNotifications?: boolean;
    sidebarNav?: SidebarNavProps;
    AppContentComponent?: ComponentWithChildren;
    onAuth?: () => void | Promise<void>;
    onReady?: () => void;
} & AppLayoutProps>;

export const Application = (props: ApplicationProps) => {
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        console.log("Application", props.name);

        firebase.auth().onAuthStateChanged(async user => {
            setUser(user);
            if (props.onAuth)
                await props.onAuth();

            setReady(true);
            if (props.onReady)
                props.onReady();
        });
    }, [props.name, props.onAuth, props.onReady]);

    const routes = (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={!user
                    ? <SignInPage />
                    : <Navigate to="/" />
                } />
                <Route path="/" element={user
                    ? (
                        <AppLayout
                            toolbarContent={<Fragment>
                                {props.toolbarSearch && <GlobalSearch {...props.toolbarSearch} />}
                                {props.toolbarContent}
                                {props.toolbarNotifications && <Notifications />}
                            </Fragment>}
                            sidebarContent={
                                props.sidebarNav
                                    ? <SidebarNav {...props.sidebarNav} />
                                    : undefined
                            }
                            pageHeader={props.pageHeader}
                            pageFooter={props.pageFooter}
                        />
                    )
                    : <Navigate to="/login" />
                }>
                    {props.children}
                    <Route path="/user/settings" element={<UserSettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    return (
        <ApplicationProvider metadata={props.metadata}>
            <ThemeSelector defaultTheme="light">
                <SnackbarProvider maxSnack={3}>
                    <ConfirmProvider>
                        <CssBaseline />
                        {!ready && <AppProgress />}
                        {
                            ready &&
                            React.createElement(props.AppContentComponent ?? "div", {
                                children: (
                                    <Fragment>
                                        {routes}
                                        {
                                            props.tour &&
                                            <Joyride
                                                steps={props.tour}
                                                tooltipComponent={TourTooltip}
                                                debug
                                            />
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </ConfirmProvider>
                </SnackbarProvider>
            </ThemeSelector>
        </ApplicationProvider>
    );
};
