import { FC } from "react";

type Props = {};

const OverallReport: FC<Props> = () => {
  return (
    <div
      className={`w-full h-full min-h-[100%] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-blue-100 p-4 relative space-y-4 flex items-center justify-center`}
    > Coming Soon</div>
  );
};

export default OverallReport;
