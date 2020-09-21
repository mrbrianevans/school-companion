import React from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";


const NavBar: React.FC = () => {
    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton>
                    <Favorite/>
                </IconButton>
                <Typography variant={"h6"}>
                    Home Schooooool
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
