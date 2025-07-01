import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Avatar,
    CircularProgress,
    ClickAwayListener,
    Grow,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Paper,
    Popper,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles(theme => ({
    "@global": {
        "input[type=\"search\"]::-webkit-search-decoration": {
            "-webkit-appearance": "none"
        },
        "input[type=\"search\"]::-webkit-search-cancel-button": {
            "-webkit-appearance": "none"
        },
        "input[type=\"search\"]::-webkit-search-results-button": {
            "-webkit-appearance": "none"
        },
        "input[type=\"search\"]::-webkit-search-results-decoration": {
            "-webkit-appearance": "none"
        }
    },
    root: {
        fontFamily: theme.typography.fontFamily,
        position: "relative",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: `rgba(255, 255, 255, 0.15)`,
        "&:hover": {
            backgroundColor: `rgba(255, 255, 255, 0.25)`
        },
        "& $inputInput": {
            transition: theme.transitions.create("width"),
            width: 140,
            "&:focus": {
                width: 170
            }
        }
    },
    search: {
        width: theme.spacing(9),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 9)
    },
    paper: {
        transformOrigin: "top right"
    },
    list: {
        width: theme.spacing(80),
        maxHeight: theme.spacing(60),
        overflow: "auto"
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(1, 0)
    }
}));

type SearchResult = {
    url?: string;
    image?: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
};

export type GlobalSearchProps = {
    dataSource: (term: string) => Promise<SearchResult[]>;
};

export const GlobalSearch = (props: GlobalSearchProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("sm"));
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState("");
    const debouncedTerm = useDebounce(term, 500);
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if (!term) {
            setResults([]);
            return;
        }
    }, [term]);

    useEffect(() => {
        if (!debouncedTerm)
            return;

        setLoading(true);
        props.dataSource(term)
            .then(setResults)
            .finally(() => setLoading(false));
    }, [debouncedTerm, props.dataSource]);

    useEffect(() => {
        console.log("Search results", results);
        setOpen(results.length > 0);
    }, [results]);

    return (
        <Fragment>
            <div
                className={classes.root} style={{ display: desktop ? "flex" : "none" }}
                ref={anchorRef}
            >
                <div className={classes.search}>
                    <SearchIcon />
                </div>
                <Input
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    id="global-search"
                    type="search"
                    disableUnderline
                    placeholder={`Search…`}
                    value={term}
                    onChange={event => setTerm(event.target.value)}
                />
            </div>
            <Popper
                id="global-search-popup"
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
                                    {
                                        !loading && results.map((item, i) =>
                                            <SearchResultItem key={i} data={item} />
                                        )
                                    }
                                    {
                                        loading &&
                                        <div className={classes.loading}>
                                            <CircularProgress size={32} />
                                        </div>
                                    }
                                </List>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                )}
            </Popper>
        </Fragment>
    );
};

const SearchResultItem = ({ data }: { data: SearchResult }) => {
    const content = (
        <Fragment>
            {
                data.image &&
                <ListItemAvatar>
                    <Avatar variant="rounded" src={data.image} />
                </ListItemAvatar>
            }
            <ListItemText
                primary={data.title}
                secondary={data.subtitle}
            />
        </Fragment>
    );

    if (data.url && data.url.startsWith("http")) {
        return (
            <ListItem button component="a" href={data.url}>
                {content}
            </ListItem>
        );
    }

    if (data.url) {
        return (
            <ListItem button component={RouterLink} to={data.url}>
                {content}
            </ListItem>
        );
    }

    return (
        <ListItem>
            {content}
        </ListItem>
    );
};
