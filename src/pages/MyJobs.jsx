import CandidateJobs from '@/components/CandidateJobs';
import RecruiterJobs from '@/components/RecruiterJobs';
import { BASE_URL } from '@/utils/constants';
import { addMyJobs } from '@/utils/Myjobs';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MyJobs = () => {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/myjobs",
        { withCredentials: true },
      );
      dispatch(addMyJobs(res.data.data));
    
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMyJobs();
  }, []);

  if(!user) return <h1>Loading...</h1>

  return (
    <div className='px-2 sm:px-3 md:px-4 lg:px-5 py-6 '>
      <h1 className='text-center text-xl sm:text-2xl lg:text-4xl font-bold'>
        My Jobs
      </h1>

      {user.role === "candidate"? <CandidateJobs /> : <RecruiterJobs />}

    </div>
  )
}

export default MyJobs;