import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { forgotPassword } from "../../services/authService";

export default function ForgotPasswordPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await forgotPassword(data.email);
            toast.success("Password reset instructions sent to your email")
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset instructions");
        }
    }

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: "#f5f7fa", }}>
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{p: 4, borderRadius: 3}}>
                    <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", mb: 1 }}>
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
                        Enter your email address to reset of your password.
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Email" type="email" fullWidth {...register("email", { required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format", }, })} 
                        error={!!errors.email} helperText={errors.email?.message}>

                        </TextField>
                    </Stack><br/>
                    <Button type="submit" variant="contained" size="large" fullWidth onSubmit={handleSubmit(onSubmit)}>
                        Send Reset Link
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: "center", mt: 3 }}>
                        Remember password? <Link to="/login">Back to login</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}