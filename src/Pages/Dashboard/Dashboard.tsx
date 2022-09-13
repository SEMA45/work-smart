import { FC } from "react";
import GradesStatistics from "./GradesStatistics";
import RecentActivities from "./RecentActivities";
import Summary from "./Summary";

type Props = {};

const Dashboard: FC<Props> = () => {

  //Component
  return (
    <div
      className={`w-full h-fit min-h-[100%] overflow-hidden overflow-y-scroll bg-blue-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 p-4`}
    >
     <Summary/>
	 <GradesStatistics/>
	 <RecentActivities/>
    </div>
  );
};

export default Dashboard;
