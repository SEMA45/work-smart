import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { TbBell, TbSpeakerphone } from "react-icons/tb";
import { selectCurrency } from ".././../Redux/Slices/SchoolSettingsSlice";

type Props = {};

const TopNav: FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const currencies = useSelector(
    (state: RootState) => state.SchoolSettings.currencies
  );
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );

  //Component =====
  return (
    <div className="w-full min-h-[3.5rem] h-14 bg-white flex items-center justify-between px-4">
      <div className="h-full flex items-center space-x-2">
        <div className=" border border-gray-300 px-4 pt-1 rounded">
          <select
            onChange={(e: any) => {
              dispatch(selectCurrency(JSON.parse(e.target.value)));
              window.localStorage.setItem(
                "selectedCurrency",
                JSON.stringify(e.target.value)
              );
            }}
            className="bg-inherit h-7 w-32 text-gray-700 focus:outline-none uppercase text-xs"
          >
            <option value={selectedCurrency}>{selectedCurrency.name}</option>
            {currencies?.map((cur: any) => {
              return (
                <option key={cur.name} value={JSON.stringify(cur)}>
                  {cur.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="h-full flex items-center space-x-2">
        {/** New Btn and Modal*/}
        <div className="relative">
          <button className="bg-blue-600 hover:bg-blue-500 transition-all rounded-full px-4 h-8 w-28 text-white text-base">
            new
          </button>
          <div className="absolute top-12 -left-20 w-[15rem] h-[15rem] rounded-lg bg-white shadow-2xl drop-shadow-2xl"></div>
        </div>
        {/** New Btn and Modal*/}
        <button className="h-8 w-8 flex items-center justify-center text-gray-600 bg-blue-100 text-xl hover:bg-blue-200 rounded-lg transition-all">
          <TbSpeakerphone />
        </button>
        <button className="h-8 w-8 flex items-center justify-center text-gray-600 bg-blue-100 text-xl hover:bg-blue-200 rounded-lg transition-all">
          <TbBell />
        </button>
        {/**Profile ======== */}
        <img
          src={user?.profileUrl}
          alt="profile"
          className="h-9 w-9 object-cover object-center border-2 border-blue-600 rounded-full"
        />
        {/**Profile ======== */}
      </div>
    </div>
  );
};

export default TopNav;
