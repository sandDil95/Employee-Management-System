import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useEmployeeSearchParams } from "../../hooks/useEmployeeSearchParams";

import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography, Paper, Table, TableBody, TableCell, 
         TableContainer, TableHead, TableRow, Button, Stack, Box, 
         Chip, Divider, TextField, Select, MenuItem, InputLabel, FormControl 
       } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function EmployeeListPage() {

    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const { page, size, keyword, department, sort, direction, setSearchParams } = useEmployeeSearchParams();
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);
    const [ selectedEmployeeId, setSelectedEmployeeId ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    const loadEmployees = async () => {
        try {
        setLoading(true);
        const response = await getEmployees({ page: page, keyword: searchKeyword, sortBy: sort, direction: direction});
        setEmployees(response.data.content);
        setPagination(response.data.pagination);
        } catch( error ) {
            toast.error(" Failed to load employees ");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setSearchParams({ page: page, size, keyword: searchKeyword });
        loadEmployees();
    }

    const handleClearSearch = () => {
        setSearchKeyword("");
        setSearchParams({ page: 0, size, keyword: searchKeyword, sort});
        loadEmployees();
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedEmployeeId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedEmployeeId(null);
        setDeleteDialogOpen(false);
    }

    const handleConfirmDelete = async () => {
        try { 
            await deleteEmployee(selectedEmployeeId);
            setEmployees((prev) => {
                return prev.filter((emp) => emp.id !== selectedEmployeeId);
            });
            toast.success("Employee deleted successfully");
            handleCloseDeleteDialog();
        } catch (error) {
            toast.error("Failed to delete Employee");
        }
    };

    const handleSortByChange = (event) => {
        setSearchParams({ page, size, keyword: searchKeyword, sortBy: event.target.value, direction, });
    }

    const handleDirectionChange = (event) => {
        setSearchParams({ page, size, keyword: searchKeyword, sortBy: sort, direction: event.target.value });
    }

    const handleNext = () => {
        const nextPage = page + 1;
        setSearchParams({ page: nextPage, size, keyword: searchKeyword,  sortBy: sort, direction });
    };

    const handlePrevious = () => {
        const prevPage = page - 1;
        setSearchParams({ page: prevPage, size, keyword: searchKeyword,  sortBy: sort, direction });
    }

    useEffect(() => { setSearchKeyword(searchKeyword)}, [searchKeyword]);
    useEffect(() => { loadEmployees() }, [page, size, searchKeyword, sort, direction]);

    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{mt: 4, mb: 3 }}>
                    Employee Management Page
                </Typography>
                <Button variant="contained" sx={{ mb: 2 }} startIcon={<AddIcon />} onClick={() => navigate("/employees/create")}>Add Employee</Button>
                <Paper elevation={3}>
                    {/* Search / Filter Bar */}
                    <Box sx={{ p: 3 }}>
                        <Stack direction={{ xs: "column", sm: "row"}} spacing={2}>
                            <TextField size="small" fullWidth placeholder="Search by name, email or department" value={searchKeyword}
                                onChange= {(e) => setSearchKeyword(e.target.value)}/>
                            <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch} sx={{ minWidth: 130 }}> Search </Button>
                            <Button variant="outlined" startIcon={<ClearIcon />} onClick={handleClearSearch} sx={{ minWidth: 110 }}>Clear</Button>
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select label="Sort By" value={sort} onChange={handleSortByChange}>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="department">Department</MenuItem>
                                    <MenuItem value="salary">Salary</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Direction</InputLabel>
                                <Select label="Direction" value={direction} onChange={handleDirectionChange}>
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f0f3f7", }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {loading ? (
                                        <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                            <CircularProgress />
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            Loading employees...
                                            </Typography>
                                        </TableCell>
                                        </TableRow>
                                    ) : employees.length === 0 ? (
                                        <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                            <Typography color="text.secondary">
                                            No employees found
                                            </Typography>
                                        </TableCell>
                                        </TableRow>
                                    ) : (  employees?.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.id}</TableCell>
                                            <TableCell>
                                                <Typography fontWeight="600">{employee.firstName} {employee.lastName}</Typography>
                                            </TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>
                                                <Chip label={employee.department} size="small" color="primary" variant="outlined"/>
                                            </TableCell>
                                            <TableCell>{Number(employee.salary).toLocaleString("en-US")}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    <Button variant="contained" color="warning" startIcon={<EditIcon />} 
                                                        onClick={() => navigate(`/employees/edit/${employee.id}?page=${page}`)}>Edit</Button>
                                                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                                                        onClick={() => handleOpenDeleteDialog(employee.id)}>Delete</Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                        ))
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    {/* Pagination Footer */}
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between"}}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" startIcon={<NavigateBeforeIcon />}
                                disabled={loading || page === 0} onClick={() => handlePrevious()}> Prev </Button>
                            {page + 1} of {pagination?.totalPages}
                            <Button variant="contained" color="primary" startIcon={<NavigateNextIcon />}
                                disabled={loading || page+1 >= pagination.totalPages} onClick = {() => handleNext()}> Next </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container><br/><br/>
            <Dialog open={ deleteDialogOpen } onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this employee? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="inherit" > Cancel </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </>
    );
}