import { FC, useEffect, useState } from "react";
import { TbSchool, TbMail, TbLock } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Asserts/blueLogo.png";
import signInImg from "../../Asserts/signin.png";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import AlertsWrapper from "../../Components/Toast Notifications/AlertsWrapper";
import { updateUser } from "../../Redux/Slices/UserSlice";
import {
  addCurrencies,
  addPeriods,
  updateSchool_Obj,
  selectTerm,
} from "../../Redux/Slices/SchoolSettingsSlice";
import {
  updatePayments_Data,
  updateStudents_Data,
  updateUsers_Data,
  updateCredits_Data,
} from "../../Redux/Slices/School_DataSlice";

type Props = {};

const SignIn: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [submitStatus, setStatus] = useState<boolean>(false);
  const [input, setInput] = useState({
    school: "",
    email: "",
    password: "",
  });
  // const signIn = async () => {
  //   const { user, session, error } = await supabase.auth.signIn({
  //     email: "example@email.com",
  //     password: "example-password",
  //   });
  // };

  const crypt = (salt: any, text: any) => {
    const textToChars = (text: any) =>
      text.split("").map((c: any) => c.charCodeAt(0));
    const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };

  const handleSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus(true);
    fetch(
      `https://script.google.com/macros/s/AKfycbwjtNzbj6EiVcuoeUlwlFr36rG031WFcueUAOQcIn69ErRY3exWaLg9zwxyKkF2lW_bIQ/exec?action=signin&email=${
        input.email
      }&password=${crypt(input.email, input.password)}&school=${input.school}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.auth?.isAuthenticated === true) {
          setStatus(true);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Successfully signed in",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateUser(data[0]?.auth));
          dispatch(
            addCurrencies(
              data[0]?.school?.currencies
                ?.split(/\[|\]/)[1]
                ?.replace(/(},)/gim, "}},")
                ?.split("},")
                ?.map((data: any) => "{" + data?.split(/{|}/)[1] + "}")
                ?.map((data: any) => {
                  let tempdataArray = data?.split(/\{|\}|,|:/);
                  return {
                    name: `${tempdataArray[2]?.trim()?.replace(/"|'/gim, "")}`,
                    symbol: `${tempdataArray[4]
                      ?.trim()
                      ?.replace(/"|'/gim, "")}`,
                    rate_multiplier: `${tempdataArray[6]
                      ?.trim()
                      ?.replace(/"|'/gim, "")}`,
                  };
                })
            )
          );
          dispatch(
            selectTerm(
              data[0]?.school?.periods_term
                ?.split(/\[|\]/)[1]
                ?.split(",")
                ?.map((data: any) =>
                  data.split(":")[1]?.split("}")[0]?.replace(/"/gim, "")?.trim()
                )
            )
          );
          dispatch(
            addPeriods(
              data[0]?.school?.periods_term
                ?.split(/\[|\]/)[1]
                ?.split(",")
                ?.map((data: any) => ({
                  name: data
                    .split(":")[1]
                    ?.split("}")[0]
                    ?.replace(/"/gim, "")
                    ?.trim(),
                }))
            )
          );
          dispatch(updateSchool_Obj(data[0]?.school));
          dispatch(updatePayments_Data(data[0]?.payment_data));
          dispatch(updateCredits_Data(data[0]?.credits));
          dispatch(updateStudents_Data(data[0]?.students));
          dispatch(updateUsers_Data(data[0]?.users_data));

          //saving data locally ==========
          window.localStorage.setItem("user", JSON.stringify(data[0]?.auth));
          window.localStorage.setItem(
            "currencies",
            JSON.stringify(
              data[0]?.school?.currencies
                ?.split(/\[|\]/)[1]
                ?.replace(/(},)/gim, "}},")
                ?.split("},")
                ?.map((data: any) => "{" + data?.split(/{|}/)[1] + "}")
                ?.map((data: any) => {
                  let tempdataArray = data?.split(/\{|\}|,|:/);
                  return {
                    name: `${tempdataArray[2]?.trim()?.replace(/"|'/gim, "")}`,
                    symbol: `${tempdataArray[4]
                      ?.trim()
                      ?.replace(/"|'/gim, "")}`,
                    rate_multiplier: `${tempdataArray[6]
                      ?.trim()
                      ?.replace(/"|'/gim, "")}`,
                  };
                })
            )
          );
          window.localStorage.setItem(
            "selectedTerm",
            JSON.stringify(
              data[0]?.school?.periods_term
                ?.split(/\[|\]/)[1]
                ?.split(",")
                ?.map((data: any) =>
                  data.split(":")[1]?.split("}")[0]?.replace(/"/gim, "")?.trim()
                )
            )
          );
          window.localStorage.setItem(
            "periods",
            JSON.stringify(
              data[0]?.school?.periods_term
                ?.split(/\[|\]/)[1]
                ?.split(",")
                ?.map((data: any) => ({
                  name: data
                    .split(":")[1]
                    ?.split("}")[0]
                    ?.replace(/"/gim, "")
                    ?.trim(),
                }))
            )
          );
          window.localStorage.setItem(
            "schoolObj",
            JSON.stringify(data[0]?.school)
          );
          window.localStorage.setItem(
            "payments_record",
            JSON.stringify(data[0]?.payment_data)
          );
          window.localStorage.setItem(
            "credits",
            JSON.stringify(data[0]?.credits)
          );
          window.localStorage.setItem(
            "students",
            JSON.stringify(data[0]?.students)
          );
          window.localStorage.setItem(
            "users_team",
            JSON.stringify(data[0]?.users_data)
          );
          setInput({
            school: "",
            email: "",
            password: "",
          });
          navigate("/app");
        } else if (data?.auth?.isAuthenticated === false) {
          setStatus(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: data.message,
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        }
      })
      .catch(() => {
        setStatus(false);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Failed to sign in",
              color: "bg-red-200",
              id: new Date().getTime(),
            },
          ])
        );
      });
  };

  //Automatically Log User If Aleady Signed In
  useEffect(() => {
    user?.isAuthenticated === true && navigate("/app");
  }, [user, navigate]);

  //Component ==============
  return (
    <div className="w-screen h-screen min-h-[40rem] grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 h-full flex flex-col justify-center items-center">
        {/**Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 absolute left-2 top-2" />
        </Link>
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
              onChange={(e) => {
                setInput((prev) => ({ ...prev, school: e.target.value }));
              }}
              value={input?.school}
              type="text"
              name="school_name"
              id="school_name"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 text-sm focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="School Name"
            />
            <TbSchool className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <label
            htmlFor="email"
            className="w-full flex justify-center mt-2 relative"
          >
            <input
              onChange={(e) => {
                setInput((prev) => ({ ...prev, email: e.target.value }));
              }}
              value={input?.email}
              type="email"
              name="email"
              id="email"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 text-sm focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="Email"
            />
            <TbMail className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <label
            htmlFor="password"
            className="w-full flex justify-center mt-2 relative"
          >
            <input
              onChange={(e) => {
                setInput((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              value={input?.password}
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              className="w-[80%] h-10 border-b border-gray-200 placeholder:text-xs placeholder:text-gray-400 text-gray-700 text-sm focus:ring-0 focus:outline-none focus:border-0 focus:border-b focus:border-blue-600 transition-all pr-6 pl-2"
              placeholder="Password"
            />
            <TbLock className="absolute right-12 top-3 text-lg text-gray-400" />
          </label>
          <button
            type="submit"
            disabled={submitStatus}
            className={`mt-6 h-10 w-[80%] bg-blue-600 hover:opacity-80 transition-all duration-150 rounded-full text-white text-sm tracking-wide flex justify-center items-center space-x-2 ${
              submitStatus ? "opacity:80 cursor-not-allowed" : ""
            }`}
          >
            <div
              className={`h-5 w-5 border-4 border-white border-l-blue-300 rounded-full animate-spin ${
                submitStatus ? "" : "hidden"
              }`}
            ></div>
            <span>SignIn</span>{" "}
          </button>
          <span className="mt-12 text-sm text-gray-400">
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

      {/**Alerts Componetn */}
      <AlertsWrapper />
    </div>
  );
};

export default SignIn;
