import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = () => {
    const {search} = useLocation()

    return useMemo(() => {
        return new URLSearchParams(search)
    },[search])
}