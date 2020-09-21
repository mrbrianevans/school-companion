import React from "react";
import {Grid, Paper} from "@material-ui/core";

interface BlockProps {
    xs?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    width?: "full" | "half" | "quarter" | "third" | "auto"
}

const Block: React.FC<BlockProps> = (props) => {
    const sizeConverter: { [key: string]: BlockProps["xs"] } = {
        full: 12,
        half: 6,
        quarter: 3,
        third: 4,
        auto: "auto"
    }
    return (
        <Grid item sm={sizeConverter[props.width || "full"]} xs={12}>
            <Paper variant={"elevation"} elevation={3} style={BlockStyles}>
                {props.children}
            </Paper>
        </Grid>
    )
}

const BlockStyles = {
    padding: 10
}

export default Block
