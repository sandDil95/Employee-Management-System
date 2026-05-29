import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { useAuth } from "../auth/AuthContext";

export default function EmployeeListPage() {

    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(0);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadEmployees = async () => {
        const response = await getEmployees({ page: page, size: 10, direction: "asc"});
        setEmployees(response.data.content);
        setPagination(response.data.pagination);
    };

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
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button disabled={page === 0} onClick={() => setPage( page - 1 )}> Previous </button>
            <button disabled={page+1 >= pagination.totalPages} onClick = {() => setPage( page + 1 )}> Next </button>

            <button onClick={() => navigate("/employees/create")}>Add Employee</button>

            <button onClick = { logout }>Logout</button>
        </div>
    );
}