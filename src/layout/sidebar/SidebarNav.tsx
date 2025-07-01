import React, { useRef, useState } from "react";
import { InputAdornment, List, makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHotkeys } from "react-hotkeys-hook";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarItem } from "./SidebarItem";

export type StructureItem = {
    id?: string;
    path: string;
    title: string;
    icon?: React.ReactElement;
    children?: Omit<StructureItem, "children">[];
};

export type SidebarNavProps = {
    search?: boolean;
    structure: StructureItem[];
}

const useStyles = makeStyles(theme => ({
    searchContainer: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    }
}));

const filterByTerm = (item: StructureItem, term: string): boolean => {
    return !term
        || (item.title.toLowerCase().indexOf(term.toLowerCase()) >= 0)
        || (!!item.children && item.children.some(child => filterByTerm(child, term)));
};

export const SidebarNav = ({ structure, ...props }: SidebarNavProps) => {
    const classes = useStyles();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [term, setTerm] = useState("");

    useHotkeys("alt+n", () => {
        if (searchInputRef.current)
            searchInputRef.current.focus();
    });

    return (
        <div>
            {
                props.search &&
                <div className={classes.searchContainer}>
                    <TextField
                        inputRef={searchInputRef}
                        size="small"
                        placeholder="Use Alt+N to search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        value={term}
                        onChange={event => setTerm(event.target.value)}
                    />
                </div>
            }
            <List component="nav" dense>
                {structure
                    .filter(item => filterByTerm(item, term))
                    .map(item =>
                        item.children && item.children.length > 0
                            ? (
                                <SidebarMenu
                                    key={item.path} id={item.id}
                                    path={item.path}
                                    name={item.title ?? ""}
                                    icon={item.icon}
                                >
                                    {item.children
                                        .filter(item => filterByTerm(item, term))
                                        .map(child =>
                                            <SidebarItem
                                                key={child.path} id={item.id}
                                                to={item.path + child.path}
                                                name={child.title ?? ""}
                                                icon={child.icon}
                                            />
                                        )}
                                </SidebarMenu>
                            )
                            : (
                                <SidebarItem
                                    key={item.path} id={item.id}
                                    to={item.path}
                                    name={item.title ?? ""}
                                    icon={item.icon}
                                />
                            )
                    )}
            </List>
        </div>
    );
};
