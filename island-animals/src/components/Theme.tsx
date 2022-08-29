import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
interface Props {
    children?: React.ReactNode
}
export default function IslandThemeProvider(props: Props) {

    return <ThemeProvider theme={createTheme({
        typography: {
            fontFamily: [
                `"Roboto", sans-serif`
            ].join(','),
            fontSize: 16
        },
        palette: {
            primary: {
                main: '#00db6a',
                light: '#5FA463',
                dark: '#27632A',
                contrastText: '#000000',
            },
            secondary: {
                main: '#40c4ff',
                light: '#66CFFF',
                dark: '#2C89B2',
                contrastText: '#000000'
            },
            background: {
                default: "#828282",
                paper: "#dbdbdb"
            }
        }
    })}>
        {props.children}
    </ThemeProvider>
}