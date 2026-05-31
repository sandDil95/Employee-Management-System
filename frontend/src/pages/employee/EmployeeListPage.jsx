import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useAuth } from "../auth/AuthContext";

export default function EmployeeListPage() {

    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [keyword, setKeyword] = useState(Number(searchParams.get("keyword")) || "");

    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadEmployees = async () => {
        const response = await getEmployees({ page: page, size: 5, direction: "asc"});
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
        const nextpage = page + 1;
        setPage(nextpage);
        setSearchParams({ page: nextPage, size, keyword });
    };

    const handlePrevious = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        setSearchParams({ page: prevPage, size, keyword });
    }

    useEffect(() => { loadEmployees() }, [page]);

    return (
        <div>
            <h2>Employees</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button onClick={() => navigate(`/employees/edit/${employee.id}?page=${page}`)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button disabled={page === 0} onClick={() => handlePrevious()}> Previous </button>
            <button disabled={page+1 >= pagination.totalPages} onClick = {() => handleNext()}> Next </button>

            <button onClick={() => navigate("/employees/create")}>Add Employee</button>
            <button onClick = { logout }>Logout</button>
        </div>
    );
}