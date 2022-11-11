import { FC, useMemo, useState } from "react";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import { updateUser } from "../../../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";

type Props = {};

const Account: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const school = useSelector(
    (state: RootState) => state.SchoolSettings.schoolObj
  );
  const allMembers = useSelector(
    (state: RootState) => state.SchoolData.users_team
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [schoolValues, setValues] = useState<any>(school);
  const [passObj, setPass] = useState<any>({
    oldPass: "",
    newPass: "",
  });
  const data = useMemo(() => {
    return [
      {
        name: "Total Users",
        value:
          school.plan === "basic"
            ? ((5 / allMembers.length) * 100).toFixed(0)
            : school.plan === "pro"
            ? ((20 / allMembers.length) * 100).toFixed(0)
            : school.plan === "proplus"
            ? ((50 / allMembers.length) * 100).toFixed(0)
            : 0,
      },
    ];
  }, [school,allMembers]);
  console.log(data)

  //Component ==========
  return (
    <div className="w-full h-full space-y-4 overflow-hidden overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      <form className="w-full h-[7.5rem] bg-white rounded-md grid grid-cols-4 overflow-hidden divide divide-x divide-slate-300 p-1 py-2">
        <div className="col-span-1 h-full overflow-hidden p-4 flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-sm font-bold capitalize text-slate-600">
            institute Name
          </div>
          <label
            htmlFor="instutute_name"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded overflow-hidden border border-slate-200 text-slate-700"
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
          <div className="text-center text-sm font-bold capitalize text-slate-600">
            Address
          </div>
          <label
            htmlFor="address"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded overflow-hidden border border-slate-200 text-slate-700"
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
          <div className="text-center text-sm font-bold capitalize text-slate-600">
            Email
          </div>
          <label
            htmlFor="email"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded overflow-hidden border border-slate-200 text-slate-700"
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
          <div className="text-center text-sm font-bold capitalize text-slate-600">
            Phone
          </div>
          <label
            htmlFor="phone"
            className="w-full max-w-[15rem] h-10 bg-blue-50 rounded overflow-hidden border border-slate-200 text-slate-700"
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
        <div className="col-span-1 h-full border overflow-hidden">
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={75}
              cy={75}
              innerRadius={45}
              outerRadius={65}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={"#60a5fa"}
                />
              ))}
            </Pie>
          </PieChart>
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
