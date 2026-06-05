import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../pages/auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function navbar() {
    const { logout } = useAuth();

     return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 10 }}>EMS</Typography>
                 <Button variant="contained" color="inherit" startIcon={<LogoutIcon />}  
                    onClick = { logout }>Logout</Button>
            </Toolbar>
        </AppBar>
     );
}