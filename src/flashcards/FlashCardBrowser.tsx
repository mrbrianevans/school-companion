import React, {Dispatch, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FlashCardPack from "./FlashCardPack";
import {PackMetadata} from "./FlashCardsScreen";

const FlashCardBrowser: React.FC<{ onSelect: Dispatch<any> }> = (props) => {
    const [flashcardPacks, setFlashcardPacks] = useState<undefined | PackMetadata[]>(undefined)
    const getFlashcards = () => {
        fetch("https://brianevans.tech/projects/school-companion/api.php")
            .then(r => r.json())
            .then(data => setFlashcardPacks(data))
    }
    const [hasLoadedFlashcards, setLoadedFlashcards] = useState(false)
    if (!hasLoadedFlashcards) {
        setLoadedFlashcards(true)
        getFlashcards()
    }
    return (
        <>
            <Paper elevation={3}
                   style={{margin: "10px", padding: "0 10px 10px 10px", textAlign: "center"}}>
                <Typography variant={"h4"} display={"inline"} color={"primary"} gutterBottom>
                    Flash Card Browser
                </Typography>
                <Typography variant={"body2"} display={"inline"} color={"secondary"} gutterBottom
                            component={"sup"}>
                    [ v1 ]
                </Typography>
            </Paper>

            <Grid container spacing={2} alignItems={"stretch"} justify={"center"} direction={"row"}>
                {flashcardPacks !== undefined ? flashcardPacks?.map((flashCardDetails: PackMetadata, index: number) => (
                    <FlashCardPack name={flashCardDetails.id}
                                   description={flashCardDetails.count + " cards"}
                                   rating={4} onSelect={props.onSelect} key={index}
                    />
                )) : <Typography>Loading</Typography>}
            </Grid>
        </>
    )
}

export default FlashCardBrowser
