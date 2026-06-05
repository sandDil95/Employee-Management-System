import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useAuth } from "../auth/AuthContext";
import { useEmployeeSearchParams } from "../../hooks/useEmployeeSearchParams";

import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Navbar from "../../components/Navbar";

export default function EmployeeListPage() {

    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const { page, size, keyword, sort, setSearchParams } = useEmployeeSearchParams();
    const navigate = useNavigate();

    const loadEmployees = async () => {
        const response = await getEmployees({ page: page, direction: "asc"});
        setEmployees(response.data.content);
        setPagination(response.data.pagination);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if ( !confirmed ) {
            return;
        } 
        try {
            await deleteEmployee(id);
            setEmployees((prev) => {
                return prev.filter((emp) => emp.id !== id);
            });
            toast.success("Employee deleted successfully")
        } catch (error) {
            toast.error("Failed to delete Employee");
        }
    };

    const handleNext = () => {
        const nextPage = page + 1;
        setSearchParams({ page: nextPage, size, keyword });
    };

    const handlePrevious = () => {
        const prevPage = page - 1;
        setSearchParams({ page: prevPage, size, keyword });
    }

    useEffect(() => { loadEmployees() }, [page]);

    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{mt: 4, mb: 3 }}>
                    Employee Management Page
                </Typography>
                <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate("/employees/create")}>Add Employee</Button>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.salary}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button variant="contained" color="warning" startIcon={<EditIcon />} 
                                                    onClick={() => navigate(`/employees/edit/${employee.id}?page=${page}`)}>Edit</Button>
                                                <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                                                    onClick={() => handleDelete(employee.id)}>Delete</Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" startIcon={<NavigateBeforeIcon />}
                                disabled={page === 0} onClick={() => handlePrevious()}> Prev </Button>
                            {page + 1} of {pagination?.totalPages}
                            <Button variant="contained" color="primary" startIcon={<NavigateNextIcon />}
                                disabled={page+1 >= pagination.totalPages} onClick = {() => handleNext()}> Next </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}