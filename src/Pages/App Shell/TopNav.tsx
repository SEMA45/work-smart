import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  TbBell,
  TbSpeakerphone,
  TbCreditCard,
  TbUsers,
  TbFriends,
  TbReportMoney,
} from "react-icons/tb";
import { selectCurrency } from ".././../Redux/Slices/SchoolSettingsSlice";
import PaymentOptions from "../../Components/Payment/PaymentOptions";
import TermFilter from "./TermFilter";
import UpdateNCreateSt from "../../Components/Student/UpdateNCreateSt";

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
  const [paymentModal, setPayModal] = useState<boolean>(false);
  const [studentModal, setStudentModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [studentObj, setstudentObj] = useState({
    student_id: "",
    student_name: "",
    school_id: user?.school_id,
    gender: "",
    dob: "",
    grade: "",
    parent_name: "",
    parent_type: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    province: "",
    financial_status: "",
    active: true,
  });

  //Component =====
  return (
    <>
      <div className="w-full min-h-[3.5rem] h-14 bg-white border-b border-blue-200 flex items-center justify-between px-4">
        <div className="h-full flex items-center">
          <div className="h-8 w-8 lg:w-32 border border-gray-200 rounded-l px-2 pt-1">
            <select
              onChange={(e: any) => {
                dispatch(selectCurrency(JSON.parse(e.target.value)));
                window.localStorage.setItem("selectedCurrency", e.target.value);
              }}
              className="h-full w-full bg-inherit text-gray-700 focus:outline-none uppercase text-xs"
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
          <div className="h-8 w-8 lg:w-36 border-l-0 border border-gray-200 rounded-r text-gray-700 capitalize text-sm flex items-center pt-1 px-2 relative">
            <TermFilter />
          </div>
        </div>

        <div className="h-full flex items-center space-x-2">
          {/** New Btn and Modal*/}
          <div className="relative group">
            <div className="bg-blue-600 hover:bg-blue-500 transition-all rounded-full px-4 pt-0.5 h-9 w-28 text-white text-base flex justify-center items-center select-none cursor-pointer">
              New
            </div>
            <div className="absolute top-8 -left-16 pt-2 hidden group-hover:flex z-[9999]">
              <div className="border border-blue-100 w-[13rem] h-[10rem] rounded-lg bg-white shadow-2xl drop-shadow-2xl grid grid-rows-3 p-4 text-sm textx-gray-600">
                <button
                  onClick={() => setPayModal(true)}
                  className="w-full row-span-1 hover:opacity-80 transition-all border-b border-gray-200 flex items-center space-x-2 focus:outline-none focus:border-b focus:border-0"
                >
                  <TbCreditCard className="text-lg" />
                  <span className="mt-1">New Payment</span>
                </button>
                <button
                  className="w-full row-span-1 hover:opacity-80 transition-all border-b border-gray-200 flex items-center space-x-2 focus:outline-none"
                >
                  <TbReportMoney className="text-lg" />
                  <span className="mt-1">New Debt</span>
                </button>
                <button
                  onClick={() => setStudentModal(true)}
                  className="w-full row-span-1 hover:opacity-80 transition-all border-b border-gray-200 flex items-center space-x-2 focus:outline-none"
                >
                  <TbFriends className="text-lg" />
                  <span className="mt-1">New Student</span>
                </button>
                <button className="w-full row-span-1 hover:opacity-80 transition-all flex items-center space-x-2 focus:outline-none">
                  <TbUsers className="text-lg" />
                  <span className="mt-1">New User</span>
                </button>
              </div>
            </div>
          </div>
          {/** New Btn and Modal*/}

          <button className="h-8 w-8 flex items-center justify-center text-gray-600 bg-blue-100 border border-gray-300 text-xl hover:border-blue-400 hover:bg-blue-200 rounded-lg transition-all">
            <TbSpeakerphone />
          </button>
          <button className="h-8 w-8 flex items-center justify-center text-gray-600 bg-blue-100 border border-gray-300 text-xl hover:border-blue-400 hover:bg-blue-200 rounded-lg transition-all">
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

      {/**Modals */}
      <PaymentOptions paymentModal={paymentModal} setPayModal={setPayModal} />
      <UpdateNCreateSt
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        studentObj={studentObj}
        setstudentObj={setstudentObj}
        edit={edit}
        setEdit={setEdit}
      />
    </>
  );
};

export default TopNav;
