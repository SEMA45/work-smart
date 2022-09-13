import { FC } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

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
      {/**Side Nav */}
      <SideNav />
      {/**Side Nav */}
      <div className="h-full w-[calc(100%-14rem)] flex flex-col">
        <TopNav />
        {/**Main */}
        <div className="w-full h-[calc(100%-3.5rem)]">
          <Outlet />
        </div>
        {/**Main */}
      </div>
    </div>
  );
};

export default AppShell;
