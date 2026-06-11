import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../pages/auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
    const { logout } = useAuth();

     return (
        <AppBar position="static" sx={{ backgroundColor: "#1127d1", }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 10 }}>EMS</Typography>
                 <Button variant="contained" startIcon={<LogoutIcon />}  
                    onClick = { logout } sx={{ backgroundColor: "white", color: "#1E3A8A", fontWeight: "bold", "&:hover": {
                    backgroundColor: "#E5E7EB", },
          }} >Logout</Button>
            </Toolbar>
        </AppBar>
     );
}