import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, Box, Typography, AccordionDetails, styled, Tooltip, CardContent, Card, CardHeader, CssBaseline } from "@mui/material";
import { useRecoilValue } from "recoil";
import { creatureSpawnsAtom, creatureSpawnsLoadedAtom } from "../state/atoms";
import { DateTime } from "luxon";
import { green, grey} from "@mui/material/colors"
import { creatures } from "../logic/CreatureCalculator";
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CreatureList() {
    const creatureSpawns = useRecoilValue(creatureSpawnsAtom);
    const creatureSpawnsLoaded = useRecoilValue(creatureSpawnsLoadedAtom);
    const [creatureNamesBySpawnTime, setCreatureNamesBySpawnTime] = useState<string[]>([])

    const AccordionContainer = styled("div")({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px"
    })

    const SummaryDiv = styled("div")({
        width: "100%",
        display: "flex", 
        flexDirection: "row",
        justifyContent: "flex-start"
    })

    const SpawnConditionsDiv = styled("div")((props) => ({
        width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        [props.theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        },
        [props.theme.breakpoints.up("md")]: {
            flexDirection: "row"
        },
    }))

    const buggedCreatures = [
        "Goobue",
        "Twinklefleece",
        "Alligator",
        "Paissa"
    ]

    useEffect(() => {
        setCreatureNamesBySpawnTime(
            Object.keys(creatureSpawns).sort((a, b) => {
                if (creatureSpawns[b] && creatureSpawns[b].length > 0) {
                    if (creatureSpawns[a] && creatureSpawns[a].length > 0) {
                        if (creatureSpawns[a][0].startTime > creatureSpawns[b][0].startTime) {
                            return 1
                        } else {
                            return -1
                        }
                    } else {
                        return -1
                    }
                } else {
                    return -1
                }
            })
        )
    }, [creatureSpawns])

    if (creatureSpawnsLoaded) {
        return (
            <AccordionContainer>
                {creatureNamesBySpawnTime.map(creatureName => 
                    <Accordion key={creatureName} sx={{width: "80%"}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={(theme) => ({
                            backgroundColor: (creatureSpawns[creatureName][0]?.startTime < DateTime.now() && creatureSpawns[creatureName][0].endTime > DateTime.now()) ? green[200] : theme.palette.background.paper,
                        })}>
                            <SummaryDiv >
                                <Typography sx={(theme) => ({[theme.breakpoints.down('sm')]: { width: "50%"}, width: "20%"})}>{`${creatureName}`}</Typography>
                                <Typography sx={(theme) => ({[theme.breakpoints.down('sm')]: { display: "none" }, width: "10%"})}>{`${creatures[creatureName].type}`}</Typography>
                                <Typography sx={(theme) => ({[theme.breakpoints.down('md')]: { display: "none" }, width: "9%"})}>{`[${creatures[creatureName].coordinates.x}, ${creatures[creatureName].coordinates.y}]`}</Typography>
                                <Typography sx={(theme) => ({[theme.breakpoints.down('sm')]: { display: "none" }, width: "12%"})}>{`${creatureSpawns[creatureName][0]?.startTime.toLocaleString({weekday: "short", month: "short", day: "2-digit"})}`}</Typography>
                                <Typography sx={(theme) => ({[theme.breakpoints.down('sm')]: { display: "none" }, width: "20%"})}>{`${creatureSpawns[creatureName][0]?.startTime.toLocaleString(DateTime.TIME_SIMPLE)} to ${creatureSpawns[creatureName][0]?.endTime.toLocaleString(DateTime.TIME_SIMPLE)}`}</Typography>
                                {buggedCreatures.includes(creatureName) && (<>
                                    <Tooltip title="A bug has been identified with this creature that requires you to be off the island when the weather changes in order for it to spawn.  For the best chance to spawn this creature, leave the island at the indicated time, and return only when the spawn window becomes active.">
                                        <WarningIcon sx={{width: "5%"}}color="error"/>
                                    </Tooltip>
                                    <Typography sx={(theme) => ({[theme.breakpoints.down('sm')]: { display: "none" }, width: "20%", fontWeight:"bold"})}>{`LEAVE THE ISLAND BY ${creatureSpawns[creatureName][0]?.weatherCycleStartTime.toLocaleString(DateTime.TIME_SIMPLE)}`}</Typography>
                                </>
                                )}
                            </SummaryDiv>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SpawnConditionsDiv>
                                <Card sx={{backgroundColor: grey[300], marginRight: "7px", marginTop: "7px", flexGrow: 1}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: "bold"}}>Start (ET)</Typography>
                                        <Typography>{`${creatures[creatureName].requiredTimeEorzea.startTimeHour}:00`}</Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{backgroundColor: grey[300], marginRight: "7px", marginTop: "7px", flexGrow: 1}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: "bold"}}>End (ET)</Typography>
                                        <Typography>{`${creatures[creatureName].requiredTimeEorzea.endTimeHour}:00`}</Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{backgroundColor: grey[300], marginRight: "7px", marginTop: "7px", flexGrow: 1}}>
                                    <CardContent>
                                        <Typography sx={{fontWeight: "bold"}}>Weather</Typography>
                                        <Typography>{`${creatures[creatureName].requiredWeather}`}</Typography>
                                    </CardContent>
                                </Card>
                            </SpawnConditionsDiv>
                            <Card sx={{marginTop: "7px", backgroundColor: grey[300]}}>
                                <CssBaseline/>
                                <CardHeader variant="h5" title="Future Spawn Times"/>
                                <CardContent sx={{maxHeight: "150px", overflowY: "auto"}}>
                                    {creatureSpawns[creatureName].map(spawn => 
                                        <Typography key={spawn.startTime.toISO()}>
                                            {`${spawn.startTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </AccordionDetails>
                    </Accordion>    
                )}
            </AccordionContainer>
        )

    } else {
        return <></>;
    }
}