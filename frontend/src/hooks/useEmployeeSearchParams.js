import { useSearchParams } from "react-router-dom";

export const useEmployeeSearchParams = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    return {
        page: Number(searchParams.get("page")) || 0,
        size: Number(searchParams.get("size")) || 9,
        keyword: searchParams.get("keyword") || "",
        department: searchParams.get("department") || "",
        sort: searchParams.get("sortBy") || "id",
        direction: searchParams.get("direction") || "asc",
        setSearchParams
    }
};