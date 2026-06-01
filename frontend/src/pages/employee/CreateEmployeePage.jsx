import { useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createEmployee, getEmployees } from "../../services/employeeService";
import { useEmployeeSearchParams } from "../../hooks/useEmployeeSearchParams";

export default function CreateEmployeePage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const { page, size, keyword, sort } = useEmployeeSearchParams();

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
            const response = await createEmployee(data);
            const createdEmployee = response.data;
            const targetPage = await getTargetPageAfterCreate();
            alert("Employee created successfully");
            navigate(buildListUrl(targetPage));
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create employee");
        }
    }

    const handleCancel = () => {
        navigate(buildListUrl(0));
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
                <button type="button" onClick={() => handleCancel()}>Cancel</button>
            </form>
        </div>
    );   
}