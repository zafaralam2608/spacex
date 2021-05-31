import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import SearchLayout from "./sections/SearchLayout";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    }
});

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <SearchLayout/>
        </ThemeProvider>
    );
}
