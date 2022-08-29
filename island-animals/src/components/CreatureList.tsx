import React from "react";
import { Accordion, AccordionSummary, Box, Typography, AccordionDetails, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { creatureSpawnsAtom, creatureSpawnsLoadedAtom } from "../state/atoms";
import { DateTime } from "luxon";


export default function CreatureList() {
    const creatureSpawns = useRecoilValue(creatureSpawnsAtom);
    const creatureSpawnsLoaded = useRecoilValue(creatureSpawnsLoadedAtom);

    const AccordionContainer = styled("div")({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px"
    })

    const SummaryDiv = styled("div")({
        width: "50%",
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between"
    })

    if (creatureSpawnsLoaded) {
        return (
            <AccordionContainer>
                {Object.keys(creatureSpawns).map(creatureName => 
                    <Accordion sx={{width: "80%"}}>
                        <AccordionSummary >
                            <SummaryDiv>
                                <Typography>{`${creatureName}`}</Typography>
                                <Typography>{`next spawn: ${creatureSpawns[creatureName][0]?.startTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`}</Typography>
                            </SummaryDiv>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{maxHeight: "150px", overflowY: "auto"}}>
                                {creatureSpawns[creatureName].map(spawn => 
                                    <Typography>
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