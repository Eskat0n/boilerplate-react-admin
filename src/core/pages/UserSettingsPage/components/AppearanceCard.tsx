import React from "react";
import {
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Switch,
    Typography,
} from "@material-ui/core";
import { useThemeSelector } from "../../../../themes/ThemeSelector";

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

type Theme = "light" | "dark";

export const AppearanceCard = () => {
    const classes = useStyles();
    const themeSelector = useThemeSelector();
    // const user = firebase.auth().currentUser;

    return (
        <Paper className={classes.paper}>
            <form className={classes.form}>
                <Typography variant="body1" gutterBottom>
                    <strong>Appearance</strong>
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                        label="Theme"
                        disabled={themeSelector.syncWithOS}
                        value={themeSelector.theme}
                        onChange={event => themeSelector.setTheme(event.target.value as Theme)}
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    label="Sync with OS"
                    control={
                        <Switch
                            checked={themeSelector.syncWithOS}
                            onChange={event => themeSelector.setSyncWithOS(event.target.checked)}
                            name="syncWithOS"
                            color="primary"
                        />
                    }
                />
            </form>
        </Paper>
    );
};
