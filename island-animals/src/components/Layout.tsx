import React from "react"
import { AppBar, CssBaseline, IconButton, styled, Typography } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
    children?: React.ReactNode
}

const IslandAppBar = styled(AppBar)({
    margin: "0px",
    paddingTop: "7px",
    paddingBottom: "7px",
    flexDirection: "row",
    justifyContent: "center"
})

const AppBarDivInternal = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%"
})

const AppBarDivLeft = styled("div")({
    display: "flex",
    justifyContent: "flex-start"
})

const AppBarDivRight = styled("div")({
    display: "flex",
    justifyContent: "flex-end"
})

export default function Layout(props: Props) {
    return (
        <>
            <IslandAppBar position="static">
                <CssBaseline>
                    <AppBarDivInternal>
                        <AppBarDivLeft>
                            <Typography variant="h4">
                                Island Animals
                            </Typography>
                        </AppBarDivLeft>
                        <AppBarDivRight>
                            <IconButton href="https://github.com/codersblock/ffxiv-island-app" aria-label="Source">
                                <GitHubIcon/>
                            </IconButton>
                        </AppBarDivRight>
                    </AppBarDivInternal>
                </CssBaseline>
            </IslandAppBar>
            {props.children}
        </>
    ) 
}