import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, Box, Typography, AccordionDetails, styled, Tooltip } from "@mui/material";
import { useRecoilValue } from "recoil";
import { creatureSpawnsAtom, creatureSpawnsLoadedAtom } from "../state/atoms";
import { DateTime } from "luxon";
import { green, red } from "@mui/material/colors"
import { creatures } from "../logic/CreatureCalculator";
import WarningIcon from '@mui/icons-material/Warning';
import { fontWeight } from "@mui/system";


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
                        <AccordionSummary sx={(theme) => ({
                            backgroundColor: (creatureSpawns[creatureName][0]?.startTime < DateTime.now() && creatureSpawns[creatureName][0].endTime > DateTime.now()) ? green[200] : theme.palette.background.paper,
                        })}>
                            <SummaryDiv >
                                <Typography sx={{width: "20%"}}>{`${creatureName}`}</Typography>
                                <Typography sx={{width: "9%"}}>{`[${creatures[creatureName].coordinates.x}, ${creatures[creatureName].coordinates.y}]`}</Typography>
                                <Typography sx={{width: "15%"}}>{`${creatureSpawns[creatureName][0]?.startTime.toLocaleString({weekday: "short", month: "short", day: "2-digit"})}`}</Typography>
                                <Typography sx={{width: "20%"}}>{`${creatureSpawns[creatureName][0]?.startTime.toLocaleString(DateTime.TIME_SIMPLE)} to ${creatureSpawns[creatureName][0]?.endTime.toLocaleString(DateTime.TIME_SIMPLE)}`}</Typography>
                                {buggedCreatures.includes(creatureName) && (<>
                                    <Tooltip title="A bug has been identified with this creature that requires you to be off the island when the weather changes in order for it to spawn.  For the best chance to spawn this creature, leave the island at the indicated time, and return only when the spawn window becomes active.">
                                        <WarningIcon sx={{width: "5%"}}color="error"/>
                                    </Tooltip>
                                    <Typography sx={{width: "20%", fontWeight:"bold"}}>{`LEAVE THE ISLAND BY ${creatureSpawns[creatureName][0].weatherCycleStartTime.toLocaleString(DateTime.TIME_SIMPLE)}`}</Typography>
                                </>
                                )}
                            </SummaryDiv>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{maxHeight: "150px", overflowY: "auto"}}>
                                {creatureSpawns[creatureName].map(spawn => 
                                    <Typography key={spawn.startTime.toISO()}>
                                        {`${spawn.startTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`}
                                    </Typography>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>    
                )}
            </AccordionContainer>
        )

    } else {
        return <></>;
    }
}