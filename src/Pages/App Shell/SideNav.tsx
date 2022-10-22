import { FC,useState } from "react";
import packageJson from "../../../package.json";
import logo from "../../Asserts/blueLogo.png";
import shortLogo from "../../Asserts/smallicon.png";
import {
  TbSearch,
  TbSmartHome,
  TbChartDonut,
  TbChartAreaLine,
  TbSettings,
  TbUsers,
  TbLogout,
  TbFriends,
  TbChecklist,
  TbFileSpreadsheet,
} from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { updateUser } from "../../Redux/Slices/UserSlice";

type Props = {};

const SideNav: FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [signingOut,setSigningOut] = useState<boolean>(false)
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );

  //Component
  return (
    <div className="min-w-[4rem] w-[4rem] lg:min-w-[14.5rem] lg:w-[14.5rem] h-full bg-blue-600 flex flex-col justify-between">
      <div className="w-ful h-fit">
        <div className="w-full min-h-[3.5rem] h-14 bg-blue-300 flex items-center justify-center lg:justify-between px-1 pr-3  relative overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="w-36 object-center hidden lg:flex"
          />
          <img
            src={shortLogo}
            alt="logo"
            className="w-10 object-center lg:hidden flex"
          />
          <div className="bg-blue-400 px-2 py-0.5 pt-1 rounded-full border border-blue-500 text-[0.65rem] text-blue-700 hidden lg:flex items-center justify-center">
            V.{packageJson.version}
          </div>
        </div>
        <label
          htmlFor="uni_search"
          className="w-full h-fit pt-5 pb-1 bg-inherit flex justify-center items-center relative"
        >
          <input
            type="search"
            name="uni_search"
            id="uni_search"
            className="h-8 w-[80%] lg:w-[90%] bg-white/20 rounded-full border border-gray-200/50 placeholder:text-xs placeholder:text-gray-100 text-gray-50 text-sm focus:ring-0 focus:outline-none focus:border-white transition-all px-3 pr-8"
            placeholder="Quick find ..."
          />
          <TbSearch className="absolute right-6 text-gray-200" />
        </label>

        {/**Nav List */}
        <div className="w-full fle fle-col mt-4">
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/app"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbSmartHome className="text-lg" />
            <span className="mt-1 hidden lg:flex">Dashboard</span>
          </NavLink>
          <NavLink
            to="/app/balance_sheet"
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/app/balance_sheet"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbFileSpreadsheet className="text-lg" />
            <span className="mt-1 hidden lg:flex">Balance Sheet</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/overal-report"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbChartDonut className="text-lg" />
            <span className="mt-1 hidden lg:flex">Overal Report</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/students-management"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbFriends className="text-lg" />
            <span className="mt-1 hidden lg:flex">Students</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/students-management"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbChecklist className="text-lg" />
            <span className="mt-1 hidden lg:flex">Attendance Reg</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/attadance-report"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbChartAreaLine className="text-lg" />
            <span className="mt-1 hidden lg:flex">Attendance Report</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/settings"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbSettings className="text-lg" />
            <span className="mt-1 hidden lg:flex">Settings</span>
          </NavLink>
          <NavLink
            to=""
            className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
              location.pathname === "/team-users"
                ? "border-l-4 border-white bg-white/20"
                : "border-l-4 border-transparent"
            }`}
          >
            <TbUsers className="text-lg" />
            <span className="mt-1 hidden lg:flex">Team & Users</span>
          </NavLink>
        </div>
      </div>

      {/**Sign Out */}
      <div className="flex justify-center items-center">
        <button
          disabled={signingOut}
          onClick={() => {
            setSigningOut(true);
            fetch(
              `https://script.google.com/macros/s/AKfycbw0I-xRvrHTdVWOi8naWjXzMPVwxe6F92qOjubeEjrtfpZ2AeY1oTAGJ_u23-3E5S6WOA/exec?action=signout&email=${user?.email}&uid=${user?.uid}`
            )
              .then((res) => res.json())
              .then((data) => {
                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: data[0]?.auth.message,
                      color: "bg-green-200",
                      id: new Date().getTime(),
                    },
                  ])
                );
                setSigningOut(false);
                dispatch(updateUser(null));
                navigate("/login");
                window.localStorage.clear();
              })
              .catch(() => {
                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: "Failed to sign out",
                      color: "bg-red-200",
                      id: new Date().getTime(),
                    },
                  ])
                );
                setSigningOut(false);
              });
          }}
          className="text-sm text-white flex justify-start items-center space-x-2 px-4 py-4 w-[80%] hover:opacity-80 transition-all"
        >
          <TbLogout className="text-xl" />
          <span className="mt-1 hidden lg:flex">Sign Out</span>
          {signingOut && (
            <div className="h-4 w-4 rounded-full border-2 border-t-white border-r-white border-blue-500 animate-spin"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
