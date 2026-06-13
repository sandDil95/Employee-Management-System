import {useForm} from "react-hook-form";
import {loginRequest} from "../../services/authService";
import {useAuth} from "../auth/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, Container, Paper, TextField, Typography, Stack } from "@mui/material";

export default function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginRequest(data);
            login(response.token);
            navigate("/employees");
        } catch (error) {
            alert("invalid Credentials");
        }
    }
    return (
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{ mt: 20, p: 4, borderRadius: 3, }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="m4" fontWeight="bold">EMS Login</Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>Sign in to continue</Typography>
                    </Box><br/>
                    <Stack spacing={2}>
                        <TextField label="Email" fullWidth {...register("email", { required: "Email is required",})}/>
                        <TextField type="password" label="Password" fullWidth {...register("password", { required: "Password is required",})}/>
                        <Typography variant="body2" sx={{ textAlign: "right", mt: -1 }}>
                            <Link to="/forgot-password">Forgot password?</Link>
                        </Typography>
                        <Button type="submit" variant="contained" size="large" fullWidth startIcon={<LoginIcon />}
                        onClick={handleSubmit(onSubmit)}>Login</Button>
                    </Stack>
                    <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
                        Don&apos;t have an account?{" "}
                        <Link to="/register"> Register </Link>
                    </Typography>
                </Paper>
            </Container>
    );
}