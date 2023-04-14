import React from "react";

import { AppBar, Toolbar, Typography, Button, IconButton , MenuItem } from "@mui/material";
import { Menu } from "@mui/icons-material";

const NavBar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu"><Menu/></IconButton>
                    <Typography variant="h6" style={style}>
                        React applications
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const style = {
    flexGrow : 1
}

export default NavBar;