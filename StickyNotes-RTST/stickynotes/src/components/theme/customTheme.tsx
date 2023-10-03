import { createTheme } from "@mui/material";
const Theme=createTheme(
    {
        components:{
    MuiIconButton:
    {
        styleOverrides:{
            root:{
                color:"black",
            }
        }
    }
        }
    }
)
export default Theme;