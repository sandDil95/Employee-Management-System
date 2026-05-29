import axiosInstance from "../api/axiosInstance";

export const createEmployee = async(employee) => {
    const response = await axiosInstance.post("/employees", employee);
    return response.data;
};

export const getEmployees = async ({
  keyword, department, page, size, sortBy, direction,
}) => {
    const response = await axiosInstance.get("/employees", { params: { keyword, department , page, size, sortBy, direction}
    });
    return response.data;
}

export const deleteEmployee = async (id) => {
    await axiosInstance.delete(`/employees/${id}`);
};