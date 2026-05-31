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

export const getEmployeeById = async (id) => {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response.data;
}

export const updateEmployee = async (id, employee) => {
  const response = await axiosInstance.put(`/employees/${id}`, employee);
  return response.data;
};


export const deleteEmployee = async (id) => {
    await axiosInstance.delete(`/employees/${id}`);
};