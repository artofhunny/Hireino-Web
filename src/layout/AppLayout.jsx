import Header from '@/components/Header';
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '@/utils/constants';
import { addUser } from '@/utils/userSlice';
import { Toaster } from 'sonner';

const AppLayout = () => {


   // console.log("Hello");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile",
        { withCredentials: true },
      );

      const fetchedUser = res.data.data;

      dispatch(addUser(fetchedUser));

      if(fetchedUser.role === "unassigned"){
        navigate("/onboarding");
        return;
      }

      if(fetchedUser.role !== "unassigned" && location.pathname === "/onboarding"){
        navigate("/jobs");
      }

      // console.log(user && user.role);

      if(location.pathname === "/"){
        navigate("/jobs");
      }
      
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
        <Toaster richColors position="top-right" />
        <div className="grid-background"></div>
        <main className=' min-h-screen'>
          <Header />
          <Outlet/>
        </main>
        <div className='p-10 text-center bg-gray-600 '>
          Made by Hunny
        </div>
    </div>
  )
}

export default AppLayout;