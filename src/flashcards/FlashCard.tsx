import React, {useEffect, useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Cached, Star, StarBorder} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {FlashCardProperties} from "./FlashCardsScreen";

interface FlashCardProps extends FlashCardProperties{
    ratingCallback: (rating: number)=>void
}

const FlashCard: React.FC<FlashCardProps> = (props) => {
    const [answerShowing, showHideAnswer] = useState(false)
    const [starRating, setStarRating] = useState(props.rating)
    useEffect(()=>{
        props.ratingCallback(starRating)
    }, [props, starRating])
    return (
        <Grid item sm={3} xs={6} style={{height: "100%"}}>
            <Paper
                variant={"elevation"}
                elevation={3}
                   style={{
                        padding: 10,
                       height: "100%",
                       minHeight: "100px",
                       backgroundColor: answerShowing?"palegreen":"lightcoral"
                   }}
            >
                    <IconButton onClick={()=>{showHideAnswer(prevState => !prevState)}}
                                style={{float: "right"}}
                    >
                        <Cached/></IconButton>
                    <Typography variant={"h6"}>{props.question}</Typography>
                    <Typography variant={"body1"} style={{color: answerShowing?"black":"transparent", userSelect: "none"}}>{props.answer}</Typography>
                {Array(starRating).fill(0).map((element, index)=>(
                    <Star style={{color: answerShowing?"black":"transparent"}} key={index}
                          onClick={()=>{setStarRating(index+1)}}
                    />
                    ))}
                {Array(5-starRating).fill(0).map((element, index)=>(
                    <StarBorder style={{color: answerShowing?"black":"transparent"}} key={index}
                          onClick={()=>{setStarRating(prevState => index+prevState+1)}}
                    />
                    ))}
            </Paper>
        </Grid>
    )
}

export default FlashCard
