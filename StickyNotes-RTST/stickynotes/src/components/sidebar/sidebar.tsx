import React from "react";
import  Drawer  from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem  from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface SidebarProps
{
    open:boolean;
    toggleSidebar:()=>void;
}

const SideBar:React.FC<SidebarProps> = ({open , toggleSidebar})=>
{
    return(
        <Drawer anchor="left" open={open} onClose={toggleSidebar}>

            <List>

                <ListItem>
                    <ListItemText primary="Theme">

                    </ListItemText>
                </ListItem>

                <ListItem >
                        <ListItemText primary="URL">

                        </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemText primary={<h3>STICKY-NOTES</h3>}>

                    </ListItemText>

                </ListItem>




            </List>

        </Drawer>
    );
}

export default SideBar;