import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FlashCard from "./FlashCard";

const FlashCardBrowser: React.FC = () => {
    const [flashcardPacks, setFlashcardPacks] = useState([{created:1600808927,"modified":1600808927,"accessed":1600815200,"count":88,"id":"ctqimvygfbg329871"},{"created":1600813959,"modified":1600813959,"accessed":1600815200,"count":90,"id":"cydhqxivwuy2897"},{"created":1600809000,"modified":1600809000,"accessed":1600815200,"count":88,"id":"jhtygkuttvo153209"},{"created":1600808992,"modified":1600808992,"accessed":1600815200,"count":88,"id":"luvyyxvvthf7036"},{"created":1600808902,"modified":1600808902,"accessed":1600815200,"count":88,"id":"rvsxijetsbo383079"},{"created":1600812762,"modified":1600813132,"accessed":1600815200,"count":2,"id":"uyfoogdypoo816373"},{"created":1600808975,"modified":1600808975,"accessed":1600815200,"count":88,"id":"yqvpfhsrsby430140"}])
    const getFlashcards = () => {
        fetch("https://brianevans.tech/projects/school-companion/api.php")
            .then(r  => r.json())
            .then(data=>setFlashcardPacks(data))
    }
    useEffect(()=>{
        getFlashcards()
    })
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
                {flashcardPacks.map((flashCardDetails: {id: string, count: number}, index: number) => (
                    <Grid item xs>
                        <Paper>
                            <Typography>{flashCardDetails.id}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default FlashCardBrowser
