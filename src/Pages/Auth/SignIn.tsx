import { FC } from "react";
import { TbSchool, TbMail, TbLock } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../../Asserts/blueLogo.png";
import signInImg from "../../Asserts/signin.png";
//import { supabase } from "./Supabase";

type Props = {};

const SignIn: FC<Props> = () => {
  const navigate = useNavigate();
  // const signIn = async () => {
  //   const { user, session, error } = await supabase.auth.signIn({
  //     email: "example@email.com",
  //     password: "example-password",
  //   });
  // };

  const handleSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  //Component ==============
  return (
    <div className="w-screen h-screen min-h-[40rem] grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 h-full flex flex-col justify-center items-center">
        {/**Logo */}
        <img src={logo} alt="logo" className="w-40 absolute left-2 top-2" />
        {/**Sign In Form */}
        <form
          onSubmit={(e) => handleSignIn(e)}
          className="min-w-[25rem] max-w-[27rem] w-[55%] rounded-xl flex flex-col justify-center items-center p-8 relative"
        >
          <h1 className="text-[2.5rem] font-bold text-gray-700">
            Welcome back
          </h1>
          <h2 className="text-lg text-gray-500">Let's get you signed in.</h2>
          <label
            htmlFor="school_name"
            className="w-full flex justify-center mt-8 relative"
          >
            <input
              type="text"
              name="school_name"
              id="school_name"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="School Name"
            />
            <TbSchool className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <label
            htmlFor="email"
            className="w-full flex justify-center mt-2 relative"
          >
            <input
              type="email"
              name="email"
              id="email"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="Email"
            />
            <TbMail className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <label
            htmlFor="password"
            className="w-full flex justify-center mt-2 relative"
          >
            <input
              type="password"
              name="password"
              id="password"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="Password"
            />
            <TbLock className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <button
            type="submit"
            className="mt-6 h-10 w-[80%] bg-blue-600 hover:opacity-80 transition-all duration-150 rounded-full text-white text-sm tracking-wide"
          >
            SignIn
          </button>
          <span className="mt-12 text-xs text-gray-400">
            &copy; Smartfee {new Date().getFullYear()}. All rights reserved.
          </span>
        </form>
      </div>
      <div
        style={{ backgroundImage: `url(${signInImg})` }}
        className="hidden lg:flex justify-centr items-center col-span-1 h-full bg-blue-600 bg-origin-content bg-auto bg-center bg-no-repeat relative"
      >
        <h3 className="text-[2.5rem] font-medium leading-[2.8rem] text-font text-white text-center w-full absolute bottom-24">
          Managing your levy,
          <br /> made easy
        </h3>
      </div>
    </div>
  );
};

export default SignIn;
