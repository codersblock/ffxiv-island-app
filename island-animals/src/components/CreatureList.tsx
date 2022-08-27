import React from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { creatureSpawnsAtom, creatureSpawnsLoadedAtom } from "../state/atoms";
import { DateTime } from "luxon";


export default function CreatureList() {
    const creatureSpawns = useRecoilValue(creatureSpawnsAtom);
    const creatureSpawnsLoaded = useRecoilValue(creatureSpawnsLoadedAtom);

    const SummaryDiv = styled("div")({
        width: "50%",
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between"
    })

    if (creatureSpawnsLoaded) {
        return (
            <>
                {Object.keys(creatureSpawns).map(creatureName => 
                    <Accordion>
                        <AccordionSummary >
                            <SummaryDiv>
                                <Typography>{`${creatureName}`}</Typography>
                                <Typography>{`next spawn: ${creatureSpawns[creatureName][0]?.startTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`}</Typography>
                            </SummaryDiv>
                        </AccordionSummary>
                        <AccordionDetails>
                            {creatureSpawns[creatureName].map(spawn => 
                                <Typography>
                                    {`${spawn.startTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`}
                                </Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>    
                )}
            </>
        )

    } else {
        return <></>;
    }
}