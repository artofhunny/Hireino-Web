import { BASE_URL } from "@/utils/constants";
import { addAllJobs, addJob } from "@/utils/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useFetchAllJobs = (searchQuery, location, company_id) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/jobs", {
        params: {
          title: searchQuery || "",
          location: location || "All",
          company: company_id || "All",
        },
        withCredentials: true,
      });

      setIsLoading(false);
      dispatch(addAllJobs(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, location, company_id]);

  return { isLoading };
};

export const useFetchJob = (_id) => {
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  const dispatch = useDispatch();

  const fetchJob = async () => {
    try {
        setIsLoadingJob(true);
        const res = await axios.get(
            BASE_URL + "/job/" + _id,
            { withCredentials: true },
        );
        dispatch(addJob(res.data.data));
        setIsLoadingJob(false);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [_id]);

  return { isLoadingJob };
};
