import { FC } from "react";
import logo from "../../Asserts/lightLogo.png";
import {
  TbSearch,
  TbSmartHome,
  TbChartDonut,
  TbChartAreaLine,
  TbSettings,
  TbUsers,
  TbLogout,
} from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

type Props = {};

const AppShell: FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //Component
  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      {/**SIde Nav */}
      <div className="min-w-[14.5rem] w-[14.5rem] h-full bg-blue-600 flex flex-col justify-between">
        <div className="w-ful h-fit">
          <div className="w-full min-h-[3.5rem] h-14 bg-blue-700 flex justify-center items-center">
            <img src={logo} alt="logo" className="w-40 mt-2 object-center" />
          </div>
          <label
            htmlFor="uni_search"
            className="w-full h-fit pt-5 pb-1 bg-inherit flex justify-center items-center relative"
          >
            <input
              type="search"
              name="uni_search"
              id="uni_search"
              className="h-8 w-[90%] bg-white/20 rounded-full border border-gray-200/50 placeholder:text-xs placeholder:text-gray-100 text-gray-50 text-sm focus:ring-0 focus:outline-none focus:border-white transition-all px-3 pr-8"
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
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to=""
              className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
                location.pathname === "/grades-report"
                  ? "border-l-4 border-white bg-white/20"
                  : "border-l-4 border-transparent"
              }`}
            >
              <TbChartDonut className="text-lg" />
              <span>Grades Report</span>
            </NavLink>
            <NavLink
              to=""
              className={`h-10 w-full flex items-center space-x-2 px-4 text-sm text-white ${
                location.pathname === "/overall-report"
                  ? "border-l-4 border-white bg-white/20"
                  : "border-l-4 border-transparent"
              }`}
            >
              <TbChartAreaLine className="text-lg" />
              <span>Overall Report</span>
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
              <span>Settings</span>
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
              <span>Team & Users</span>
            </NavLink>
          </div>
        </div>

        {/**Sign Out */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-sm text-white flex justify-start items-center space-x-2 px-4 py-4 w-[80%] hover:opacity-80 transition-all"
          >
            <TbLogout className="text-xl" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      {/**SIde Nav */}
      <div className="h-full w-[calc(100%-14rem)] flex flex-col">
        <div className="w-full min-h-[3.5rem] h-14 bg-white"></div>
      </div>
    </div>
  );
};

export default AppShell;