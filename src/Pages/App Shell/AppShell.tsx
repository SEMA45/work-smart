import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import AlertsWrapper from "../../Components/Toast Notifications/AlertsWrapper";

type Props = {};

const AppShell: FC<Props> = () => {
  const user = useSelector((state: RootState) => state.UserInfo.user);

  //Sign Out If not authorized
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //Component
  return (
    <div className="w-screen h-screen bg-blue-100 flex">
      {/**Alerts */}
      <AlertsWrapper />
      {/**Side Nav */}
      <SideNav />
      {/**Side Nav */}
      <div className="h-full w-[calc(100%-4rem)] lg:w-[calc(100%-14rem)] flex flex-col">
        <TopNav />
        {/**Main */}
        <div className="w-full h-[calc(100%-3.5rem)] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
          <Outlet />
        </div>
        {/**Main */}
      </div>
    </div>
  );
};

export default AppShell;
