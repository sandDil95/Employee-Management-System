import { useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employeeService";

export default function CreateEmployeePage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
        try {
            await createEmployee(data);
            alert("Employee created successfully");
            navigate("/employees");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create employee");
        }
    }
    
    return (
        <div>
            <h2>Create Employee</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <input placeholder="First Name" {...register("firstName", {required: "First Name is required"})}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                    <input placeholder="Last Name" {...register("lastName", {required: "Last Name is required"})}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
                <div>
                    <input placeholder="Email" {...register("email", {required: "Email is required"})}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
                <div>
                    <input placeholder="Department" {...register("department", {required: "Department is required"})}
                    />
                    {errors.department && <p>{errors.department.message}</p>}
                </div>
                <div>
                    <input placeholder="Salary" {...register("salary", {required: "Salary is required"})}
                    />
                    {errors.salary && <p>{errors.salary.message}</p>}
                </div>

                <button type="submit">Create</button>
                <button type="button" onClick={() => navigate("/employees")}>Cancel</button>
            </form>
        </div>
    );   
}