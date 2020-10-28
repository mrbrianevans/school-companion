import React, {Dispatch} from "react";
import {Paper, Typography} from "@material-ui/core";
import {DeleteForever, Slideshow, Star, StarBorder} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

interface FlashCardPackProps {
    rating: number,
    name: string,
    description: string,
    onSelect: Dispatch<any>,
    count: number,
    deleteCallback: () => void
}

const FlashCardPack: React.FC<FlashCardPackProps> = (props) => {
    return (
        <Grid item sm={3} xs={6} style={{height: "100%"}}>
            <Badge color={"primary"} badgeContent={props.count}>
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
                        // props.onSelect(props.name)
                        console.log("User chose " + props.name)
                    }}
                >
                    <Typography variant={"h6"}>{props.name}</Typography>
                    <Typography variant={"body1"} style={{
                        color: "black",
                        userSelect: "none"
                    }}>{props.description}</Typography>
                    {Array(props.rating).fill(0).map((element, index) => (
                        <Star style={{color: "black"}} key={index}/>
                    ))}
                    {Array(5 - props.rating).fill(0).map((element, index) => (
                        <StarBorder style={{color: "black"}} key={index}/>
                    ))}
                    <IconButton onClick={() => props.onSelect(props.name)} color={"primary"}>
                        <Slideshow/></IconButton>
                    <IconButton onClick={props.deleteCallback} color={"secondary"}> <DeleteForever/></IconButton>
                </Paper>
            </Badge>
        </Grid>
    )
}

export default FlashCardPack
