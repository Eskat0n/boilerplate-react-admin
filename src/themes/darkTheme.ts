import { createTheme } from "@material-ui/core";

const darkTheme = createTheme({
    palette: {
        type: "dark"
    }
});

darkTheme.overrides = {
    MuiCssBaseline: {
        "@global": {
            "form > *:not(:last-child)": {
                marginBottom: darkTheme.spacing(2)
            }
        }
    }
};

export default darkTheme;
