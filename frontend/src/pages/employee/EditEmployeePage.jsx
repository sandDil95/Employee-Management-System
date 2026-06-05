import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";
import { useEmployeeSearchParams } from "../../hooks/useEmployeeSearchParams";
import { Container, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import Navbar from "../../components/Navbar";

export default function EditEmployeepage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: {errors},} = useForm();
    const { page, size, keyword, sort } = useEmployeeSearchParams();

    const backToListUrl = `/employees?page=${page}&size=${size}&keyword=${keyword}`;
    
    useEffect( () => { loadEmployee(); }, [id]);

    const loadEmployee = async () => {
        try {
        const response = await getEmployeeById(id);
        reset ({ firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            department: response.data.department, 
            salary: response.data.salary });
        } catch (error) {
            toast.error("Failed to load employee");
            navigate("/employees");
        }
    }

    const onSubmit = async (data) => {
        try {
            await updateEmployee(id, data);
            toast.success("Employee updated successfully");
            navigate(backToListUrl);
        } catch(error) {
            const response = error.response?.data;
            if (response?.errors) {
                Object.values(response.errors).forEach((msg) => toast,error(msg));
            } else {
                toast.error(response?.message || "Failed to update employee");
            }
        }
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{p: 4, mt: 5}}>
                    <Typography variant="h5" mb={3}>Edit Employee</Typography><br/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField placeholder="First Name" {...register("firstName", {required: "First Name is required"})} />
                            {errors.firstName && <p>{errors.firstName.message}</p>}
                            <TextField placeholder="Last Name" {...register("lastName", {required: "Last Name is required"})} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                            <TextField placeholder="Email" {...register("email", {required: "Email is required"})} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                            <TextField placeholder="Department" {...register("department", {required: "Department is required"})}/>
                            {errors.department && <p>{errors.department.message}</p>}
                            <TextField placeholder="Salary" {...register("salary", {required: "Salary is required"})} />
                            {errors.salary && <p>{errors.salary.message}</p>}
                            <Button variant="contained" color="primary"  type="submit">Update</Button>
                            <Button variant="contained" color="warning"  type="button" onClick={() => navigate(backToListUrl)}>Cancel</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
}