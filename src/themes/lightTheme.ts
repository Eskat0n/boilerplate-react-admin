import { createTheme } from "@material-ui/core";

const lightTheme = createTheme({
    palette: {
        type: "light"
    }
});

lightTheme.overrides = {
    MuiCssBaseline: {
        "@global": {
            "form > *:not(:last-child)": {
                marginBottom: lightTheme.spacing(2)
            }
        }
    }
};

export default lightTheme;
