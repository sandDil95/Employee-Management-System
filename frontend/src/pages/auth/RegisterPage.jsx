import {useForm} from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/authService";
import { Box, Button, Container, Paper, TextField, Typography, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed.");
        }
    }
    return (
        <Container maxWidth="xs">
            <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 3, }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold"> EMS Registration </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}> Register to access Employee Management System</Typography>
                </Box><br/>
                <Stack spacing={2}>
                    <TextField label="Username" fullWidth {...register("username", { required: "Username is required",})}/>
                    <TextField label="Email" fullWidth type="email" {...register("email", { required: "Email is required",})}/>
                    <TextField label="Password" fullWidth type="password" {...register("password", { required: "password is required",})}/>
                    <Button type="submit" fullWidth variant="contained" size="large" startIcon={<PersonAddIcon onClick={handleSubmit(onSubmit)}/>}>Register</Button>
                </Stack>
                <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </Typography>
            </Paper>
        </Container>
    );
}