import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";

export default function EditEmployeepage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: {errors},} = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || 5;
    const keyword = searchParams.get("keyword") || "";

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
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <input placeholder="First Name" { ...register("firstName", { required: "First name is required", })}
                    />{ errors.firstName && <p>{ errors.firstName.message }</p> }
                    <input placeholder="Last Name" { ...register("lastName", { required: "Last name is required", })}
                    />{ errors.lastName && <p>{ errors.lastName.message }</p> }
                    <input placeholder="Email" { ...register("email", { required: "Email is required", })}
                    />{ errors.email && <p>{ errors.email.message }</p> }
                    <input placeholder="Department" { ...register("department", { required: "Department is required", })}
                    />{ errors.department && <p>{ errors.department.message }</p> }
                    <input placeholder="Salary" { ...register("salary", { required: "Salary is required", })}
                    />{ errors.salary && <p>{ errors.salary.message }</p> }
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate(backToListUrl)}Cancel></button>
            </form>
        </div>
    );
}