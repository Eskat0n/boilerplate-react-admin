import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import {
    AppBar,
    Box,
    colors,
    Container,
    Divider,
    Drawer,
    IconButton,
    LinearProgress,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Copyright } from "./Copyright";
import { PageProvider } from "./PageContext";
import { UserMenu } from "./toolbar/UserMenu";
import { useAppMetadata } from "../core/ApplicationContext";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        backgroundColor: theme.palette.secondary.main,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarDev: {
        backgroundColor: colors.green[700]
    },
    appBarStage: {
        backgroundColor: colors.blueGrey[700]
    },
    appBarProd: {
        backgroundColor: theme.palette.primary.main
    },
    // appBarShift: {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(["width", "margin"], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        position: "relative",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    progress: {
        background: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    }
}));

export type AppLayoutProps = {
    toolbarContent?: React.ReactNode;
    sidebarContent?: React.ReactNode;
    pageHeader?: React.ReactElement;
    pageFooter?: React.ReactElement;
};

export const AppLayout = (props: AppLayoutProps) => {
    const classes = useStyles();
    const metadata = useAppMetadata();
    const [title, setTitle] = useState<ReactNode>("");
    const [loading, setLoading] = useState(false);
    const [open] = useState(true);
    // const handleDrawerOpen = () => setOpen(true);
    // const handleDrawerClose = () => setOpen(false);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarDev]: metadata.environment === "development",
                [classes.appBarStage]: metadata.environment === "staging",
                [classes.appBarProd]: metadata.environment === "production"
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        // onClick={handleDrawerClose}
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {title}
                    </Typography>
                    {props.toolbarContent}
                    <UserMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
                open={open}
            >
                <Toolbar />
                <Divider />
                {props.sidebarContent}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <PageProvider value={{ title, setTitle, setLoading }}>
                    <Container maxWidth="xl" className={classes.container}>
                        {
                            loading &&
                            <LinearProgress
                                className={classes.progress}
                                variant="indeterminate"
                            />
                        }
                        {props.pageHeader}
                        <Outlet />
                        {props.pageFooter}
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </PageProvider>
            </main>
        </div>
    );
};
