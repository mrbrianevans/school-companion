import React, {Dispatch, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FlashCardPack from "./FlashCardPack";
import {PackMetadata} from "./FlashCardsScreen";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";

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
    const createNewPack = () => {
        // set packId to "new"
        // add a check for if packId=new, then display an empty screen
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

                <Grid item sm={3} xs={6} style={{height: "100%"}}>
                    <Badge color={"secondary"} badgeContent={"+"}>
                        <Paper
                            variant={"elevation"}
                            elevation={3}
                            style={{
                                padding: 10,
                                height: "100%",
                                minHeight: "100px",
                                backgroundColor: "coral",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                console.log("User chose to create a new pack")
                            }}
                        >
                            <Typography variant={"h6"}>Create new</Typography>
                            <Typography variant={"body1"} style={{
                                color: "black",
                                userSelect: "none"
                            }}>Click to create a blank pack of flashcards, to which you can add
                                individual cards</Typography>
                        </Paper>
                    </Badge>
                </Grid>

                {flashcardPacks !== undefined ? flashcardPacks?.map((flashCardDetails: PackMetadata, index: number) => (
                    <FlashCardPack name={flashCardDetails.id}
                                   description={flashCardDetails.count + " cards"}
                                   rating={4} onSelect={props.onSelect} key={index}
                                   count={flashCardDetails.count}
                    />
                )) : <CircularProgress/>}
            </Grid>
        </>
    )
}

export default FlashCardBrowser
