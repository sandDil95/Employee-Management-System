import { useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEmployee, getEmployees } from "../../services/employeeService";
import { useEmployeeSearchParams } from "../../hooks/useEmployeeSearchParams";
import { Container, Paper, TextField, Button, Typography, Stack, MenuItem } from "@mui/material";
import Navbar from "../../components/Navbar";

export default function CreateEmployeePage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const { page, size, keyword, sort } = useEmployeeSearchParams();
    const DEPARTMENTS = [
        "IT", "HR", "FINANCE", "MARKETING", "OPERATIONS"
    ];

    const buildListUrl = (page) => {
        const params = new URLSearchParams();
        params.set("page", page);
        params.set("size", size);
        params.set("sort", sort);

        if (keyword)  params.set("keyword", keyword);
        // if (highlightId) params.set("highlightId", highlightId);
        return `/employees?${params.toString()}`;
    };

    const getTargetPageAfterCreate = async () => {
        if (sort.toLowerCase().includes("desc")) {
            return 0;
        }
        try {//keyword, department, page, size, sortBy, direction,
            const response = await getEmployees({ keyword, page: 0, size, sort });
            const totalElements = response.data?.pagination?.totalElements || 0;
            return Math.max(Math.ceil(totalElements / size) - 1, 0);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create employee");
        }
    }

    const onSubmit = async (data) => {
        try {
            await createEmployee(data);
            toast.success("Employee created successfully");
            const targetPage = await getTargetPageAfterCreate();
            navigate(buildListUrl(targetPage));
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create employee");
        }
    }

    const handleCancel = () => {
        navigate(buildListUrl(0));
    }
    
    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{p: 4, mt: 5}}>
                    <Typography variant="h5" mb={3}>Create Employee</Typography><br/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField label="First Name" {...register("firstName", {required: "First Name is required"})} />
                            {errors.firstName && <p>{errors.firstName.message}</p>}
                            <TextField label="Last Name" {...register("lastName", {required: "Last Name is required"})} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                            <TextField placeholder="Email" {...register("email", {required: "Email is required"})} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                            <TextField select label="Department" {...register("department", {required: "Department is required"})}>
                                <MenuItem value="">Select Department</MenuItem>
                                { DEPARTMENTS.map((department) => (
                                    <MenuItem key={department} value={department}>
                                        { department }
                                    </MenuItem>
                                )) }
                            </TextField>
                            {errors.department && <p>{errors.department.message}</p>}
                            <TextField label="Salary" {...register("salary", {required: "Salary is required"})} />
                            {errors.salary && <p>{errors.salary.message}</p>}
                            <Button variant="contained" color="primary"  type="submit">Create</Button>
                            <Button variant="contained" color="warning"  type="button" onClick={() => handleCancel()}>Cancel</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );   
}