import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
