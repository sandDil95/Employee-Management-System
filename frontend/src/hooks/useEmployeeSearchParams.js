import { useSearchParams } from "react-router-dom";

export const useEmployeeSearchParams = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    return {
        page: Number(searchParams.get("page")) || 0,
        size: Number(searchParams.get("size")) || 10,
        keyword: searchParams.get("keyword") || "",
        sort: searchParams.get("sort") || "id,asc",
        setSearchParams
    }
};