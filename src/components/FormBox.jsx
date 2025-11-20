import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const FormBox = ({ closeSigninBox }) => {
  const [isSignin, setIsSignin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z ]{2,50}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const signupSchema = Yup.object({
    firstName: Yup.string()
      .matches(nameRegex, "Enter valid first name")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(nameRegex, "Enter valid last name")
      .required("Last name is required"),
    emailId: Yup.string()
      .matches(emailRegex, "Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(passwordRegex, "Enter strong password")
      .required("Password is required"),
  });

  const signinSchema = Yup.object({
    emailId: Yup.string()
      .matches(emailRegex, "Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(passwordRegex, "Enter strong password")
      .required("Password is required"),
  });

  const Formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    },
    validationSchema: isSignin ? signinSchema : signupSchema,

    onSubmit: async (values, { setErrors }) => {
      try {
        if (isSignin) {
          const res = await axios.post(
            BASE_URL + "/auth/login",
            {
              emailId: values.emailId,
              password: values.password,
            },
            { withCredentials: true }
          );

          dispatch(addUser(res?.data.data));
          // console.log(res);
          closeSigninBox();

          navigate("/onboarding");
        } else {
          const res = await axios.post(BASE_URL + "/auth/signup", values, {
            withCredentials: true,
          });
          closeSigninBox();
          navigate("/onboarding");
        }
      } catch (error) {
        console.error(error);
        const backendError =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data ||
          "Something went wrong";
        
        setErrors({
          password: backendError,
        });
      }
    },
  });

  // const handleSignin = async (e) => {
  //   e.preventDefault();
  // };

  // const handleSignup = (e) => {
  //   e.preventDefault();
  // };

  return (
    <form
      onSubmit={Formik.handleSubmit}
      className=" relative text-black overflow-hidden rounded-lg shadow-lg w-[350px]"
    >
      <button
        type="button"
        onClick={() => closeSigninBox()}
        className="absolute top-3 right-3 text-white hover:text-yellow-500"
      >
        <X size={20} />
      </button>
      <div className="bg-[#3B3B7E] p-8">
        <div className="pb-2 mb-6 border-b">
          <h2 className="text-xl font-medium text-white text-center">
            {isSignin ? "Sign In" : "Sign up"} to Hireino
          </h2>
          <p className="text-sm text-gray-400 text-center mb-4">
            {isSignin
              ? "Welcome back! Please sign in to continue"
              : "Hello! Please sign up to continue"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {!isSignin && (
            <>
              <div className="flex flex-col w-full gap-[6px]">
                <label
                  htmlFor="fname"
                  className="text-sm text-white font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={Formik.values.firstName}
                  name="firstName"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  className="rounded border border-gray-400 font-medium  text-xs placeholder:text-xs w-full bg-zinc-800 text-gray-200 py-1 px-3 "
                  id="fname"
                />
                {Formik.touched.firstName && Formik.errors.firstName && (
                  <p className="text-red-400 text-xs">
                    {Formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full gap-[6px]">
                <label
                  htmlFor="lname"
                  className="text-sm text-white font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={Formik.values.lastName}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  className="rounded border border-gray-400 font-medium  text-xs placeholder:text-xs w-full bg-zinc-800 text-gray-200 py-1 px-3 "
                  id="lname"
                />
                {Formik.touched.lastName && Formik.errors.lastName && (
                  <p className="text-red-400 text-xs">
                    {Formik.errors.lastName}
                  </p>
                )}
              </div>{" "}
            </>
          )}
          <div className="flex flex-col w-full gap-[6px]">
            <label htmlFor="email" className="text-sm text-white font-medium">
              Email address
            </label>
            <input
              type="text"
              placeholder="Enter your email address"
              name="emailId"
              value={Formik.values.emailId}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className="rounded border border-gray-400 font-medium  text-xs placeholder:text-xs w-full bg-zinc-800 text-gray-200 py-1 px-3 "
              id="email"
            />
            {Formik.touched.emailId && Formik.errors.emailId && (
              <p className="text-red-400 text-xs">{Formik.errors.emailId}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-[6px]">
            <label
              htmlFor="password"
              className="text-sm text-white font-medium"
            >
              Password
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className="rounded border border-gray-400 font-medium  text-xs placeholder:text-xs w-full bg-zinc-800 text-gray-200 py-1 px-3 "
              id="password"
            />
            {Formik.touched.password && Formik.errors.password && (
              <p className="text-red-400 text-xs">{Formik.errors.password}</p>
            )}
          </div>

          <div className="mt-2">
            <button className="w-full py-1 text-xs rounded font-medium text-zinc-800 bg-yellow-500">
              {isSignin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#424279] px-8 py-4 ">
        <p
          onClick={() => setIsSignin(!isSignin)}
          className="text-white text-sm cursor-pointer text-center"
        >
          {isSignin ? (
            <>
              <span>Don't have an account? </span>
              <span className="text-yellow-500 font-medium">Sign up</span>
            </>
          ) : (
            <>
              <span>Already have account? </span>
              <span className="text-yellow-500 font-medium">Sign in</span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default FormBox;
