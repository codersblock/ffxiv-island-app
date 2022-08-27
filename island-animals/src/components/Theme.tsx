import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
interface Props {
    children?: React.ReactNode
}
export default function IslandThemeProvider(props: Props) {

    return <ThemeProvider theme={createTheme({
        palette: {
            primary: {
                main: '#388e3c',
                light: '#5FA463',
                dark: '#27632A',
                contrastText: '#ffffff'
            },
            secondary: {
                main: '#40c4ff',
                light: '#66CFFF',
                dark: '#2C89B2',
                contrastText: '#000000'
            },
        }
    })}>
        {props.children}
    </ThemeProvider>
}