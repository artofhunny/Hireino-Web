import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/constants";
import { addUser } from "@/utils/userSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectRole = async (role) => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/select-role/" + role,
        {},
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));

      if(role === "candidate"){
        navigate("/jobs");
      }
      else{
        navigate("/post-job");
      }

    } catch (error) {
      console.error(error);
    }
  };

  // if(!isLoaded) {
  //   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  // }

  return (
    <section>
      <div className="mt-10 flex flex-col gap-10 md:mt-20">
        <h1 className="text-xl sm:text-4xl md:text-7xl text-center font-extrabold">
          I am a...
        </h1>
        <div className="px-4 sm:px-10 md:px-40 grid grid-cols-2 gap-3 md:gap-4">
          <Button
            onClick={() => handleSelectRole("candidate")}
            variant={"blue"}
            className="h-32 text-xl"
          >
            Candidate
          </Button>
          <Button
            onClick={() => handleSelectRole("recruiter")}
            variant={"destructive"}
            className="h-32 text-xl"
          >
            Recruiter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OnBoarding;
