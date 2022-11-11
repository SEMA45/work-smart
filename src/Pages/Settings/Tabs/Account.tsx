import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import{TbPhoto} from "react-icons/tb"
import { RingProgress, Text } from "@mantine/core";

type Props = {};

const Account: FC<Props> = () => {
  const school = useSelector(
    (state: RootState) => state.SchoolSettings.schoolObj
  );
  const allMembers = useSelector(
    (state: RootState) => state.SchoolData.users_team
  );
  const [schoolValues, setValues] = useState<any>(school);

  //Component ==========
  return (
    <div className="w-full h-full space-y-4 overflow-hidden overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      <form className="w-full h-[7.5rem] bg-white rounded-md grid grid-cols-4 overflow-hidden p-1 py-2">
        <div className="col-span-1 h-full overflow-hidden p-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-xs font-bold uppercase text-slate-600">
            institute Name
          </div>
          <label
            htmlFor="instutute_name"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded-sm overflow-hidden border border-slate-200 text-slate-700"
          >
            <input
              type="text"
              name="instutute_name"
              id="instutute_name"
              className="w-full h-full outline-none bg-inherit focus:ring-0 focus:border-0 focus:outlinee-none text-xs text-slate-600 text-center px-4 p-1"
              placeholder="e.g Test School"
              value={schoolValues?.school_name}
              onChange={(e: any) => {
                setValues((prev: any) => ({
                  ...prev,
                  school_name: e.target.value,
                }));
              }}
              autoComplete="off"
            />
          </label>
        </div>
        <div className="col-span-1 h-full overflow-hidden p-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-xs font-bold uppercase text-slate-600">
            Address
          </div>
          <label
            htmlFor="address"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded-sm overflow-hidden border border-slate-200 text-slate-700"
          >
            <input
              type="text"
              name="address"
              id="address"
              className="w-full h-full outline-none bg-inherit focus:ring-0 focus:border-0 focus:outlinee-none text-xs text-slate-600 text-center px-4 p-1"
              placeholder="e.g 45 Luke St, HA"
              value={schoolValues?.address}
              onChange={(e: any) => {
                setValues((prev: any) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
              autoComplete="off"
            />
          </label>
        </div>
        <div className="col-span-1 h-full overflow-hidden p-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-xs font-bold uppercase text-slate-600">
            Email
          </div>
          <label
            htmlFor="email"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded-sm overflow-hidden border border-slate-200 text-slate-700"
          >
            <input
              type="email"
              name="email"
              id="email"
              className="w-full h-full outline-none bg-inherit focus:ring-0 focus:border-0 focus:outlinee-none text-xs text-slate-600 text-center px-4 p-1"
              placeholder="e.g example@mail.com"
              value={schoolValues?.email}
              onChange={(e: any) => {
                setValues((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              autoComplete="off"
            />
          </label>
        </div>
        <div className="col-span-1 h-full overflow-hidden p-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-xs font-bold uppercase text-slate-600">
            Phone
          </div>
          <label
            htmlFor="phone"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded-sm overflow-hidden border border-slate-200 text-slate-700"
          >
            <input
              type="tel"
              name="phone"
              id="phone"
              className="w-full h-full outline-none bg-inherit focus:ring-0 focus:border-0 focus:outlinee-none text-xs text-slate-600 text-center px-4 p-1"
              placeholder="e.g (000) 000 0000"
              value={schoolValues?.phone}
              onChange={(e: any) => {
                setValues((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              autoComplete="off"
            />
          </label>
        </div>
      </form>

      <div className="w-full h-[15rem] bg-white rounded-md grid grid-cols-3 divide divide-x divide-slate-300 overflow-hidden p-4">
        <div className="col-span-1 h-full overflow-hidden flex flex-col justify-between items-center p-6">
          <div className="text-base text-slate-600 font-bold">Team</div>
          <RingProgress
            thickness={8}
            sections={[
              {
                value:
                  school.plan === "basic"
                    ? Number(((allMembers.length / 5) * 100).toFixed(0))
                    : school.plan === "pro"
                    ? Number(((allMembers.length / 20) * 100).toFixed(0))
                    : school.plan === "proplus"
                    ? Number(((allMembers.length / 50) * 100).toFixed(0))
                    : 0,
                color: "#2563eb",
              },
            ]}
            label={
              <Text color="#475569" weight={500} align="center" size="xs">
                {allMembers.length}/
                {school.plan === "basic"
                  ? 5
                  : school.plan === "pro"
                  ? 20
                  : school.plan === "proplus"
                  ? 50
                  : 0}{" "}
                Users
              </Text>
            }
          />
        </div>
        {/**Logo */}
        <div className="col-span-1 h-full overflow-hidden flex flex-col justify-between items-center p-6">
          <div className="text-base text-slate-600 font-bold">Logo</div>
          <form action="" className="h-fit w-fit">
            <label htmlFor="logo" className="w-full h-full">
              <div className="h-[5rem] w-[6rem] rounded-sm bg-blue-50 border border-dashed border-slate-300 flex items-center justify-center text-2xl text-slate-400">
                <TbPhoto />
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  className="hidden"
                  accept=""
                />
              </div>
            </label>
            <button className="mt-3 px-6 h-8 rounded-sm bg-blue-600 text-white text-xs uppercase">
              Upload
            </button>
          </form>
        </div>
        {/**Plan */}
        <div className="col-span-1 h-full overflow-hidden flex flex-col justify-between items-center p-6">
          <div className="text-base text-slate-600 font-bold">Plan</div>
        </div>
      </div>

      <div className="w-full h-[15rem] bg-inherit grid grid-cols-2 gap-8 overflow-hidden">
        <div className="h-[15rem] col-span-1 bg-white rounded-md overflow-hidden"></div>
        <div className="h-[15rem] col-span-1 bg-white rounded-md overflow-hidden"></div>
      </div>
    </div>
  );
};

export default Account;
