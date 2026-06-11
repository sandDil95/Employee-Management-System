import { Box, Container, Typography } from "@mui/material";

export default function Footer () {
    return (
        <Box component="footer" sx={{ mt: "auto", py: 2, backgroundColor: "#1E3A8A", color: "white", textAlign: "center",}}>
            <Container maxWidth="lg">
                <Typography variant="body2">
                    © { new Date().getFullYear() } Employee Management System. All rights reserved.
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 0.5 }} >
                    Developed by Dilhara Wijethunga
                </Typography>
            </Container>
        </Box>
    );
}