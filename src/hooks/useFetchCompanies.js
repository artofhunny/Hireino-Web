import { addCompanies } from "@/utils/companySlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetchCompanies = () =>{
    const [loadingCompanies, setLoadingCompanies] = useState(false);

    const dispatch = useDispatch();

    const fetchCompanies = async () => {
        try {
            setLoadingCompanies(true);
            const res = await axios.get(
                BASE_URL + "/companies",
                { withCredentials: true },
            );

            dispatch(addCompanies(res.data.data));
            setLoadingCompanies(false);
            
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return { loadingCompanies };
}



export { useFetchCompanies };