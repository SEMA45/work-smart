import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { TbSquareCheck, TbSquare } from "react-icons/tb";
import { updateCredits_Data } from "../../Redux/Slices/School_DataSlice";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  creditModal: any;
  setCreditModal: any;
};

const AddCredit: FC<Props> = ({ creditModal, setCreditModal }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const periods = useSelector(
    (state: RootState) => state.SchoolSettings.periods_terms
  );
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedArray, setSelected] = useState<any>([]);
  const [credits_obj, setCreditsObj] = useState({
    students_ids: [],
    credit_amount_usd: "",
    term_ref: "",
    type: "",
  });
  const [search, searchValue] = useState("");
  const students_data = useSelector(
    (state: RootState) => state.SchoolData.students
  )
    ?.filter(
      (data: any) =>
        data?.student_name
          ?.toLowerCase()
          ?.replace(/\s/gim, "")
          ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
        data?.grade
          ?.toString()
          ?.toLowerCase()
          ?.replace(/\s/gim, "")
          ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
        data?.parent_name
          ?.toLowerCase()
          ?.replace(/\s/gim, "")
          ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
    )
    ?.slice(0, 5);
  const [showCredits, setCredits] = useState<Boolean>(false);

  //Close search modal on click utside
  const studentsRef = useOnClickOutside(() => {
    setCredits(false);
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    //clear fields on complete
    const clear = () => {
      setCreditsObj({
        students_ids: [],
        credit_amount_usd: "",
        term_ref: "",
        type: "",
      });
      setLoading(false);
      setCreditModal(false);
      formRef && formRef.current?.reset();
    };

    if (selectedArray?.length >= 1) {
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=add_credit&schoolID=${
          user?.school_id
        }&${JSON.stringify({
          ...credits_obj,
          students_ids: selectedArray?.toString()?.replace(/,/gim, "|"),
        })
          ?.toString()
          ?.replace(/,/gim, "&")
          ?.replace(/"|\{|\}/gim, "")
          ?.replace(/:/gim, "=")}`
      )
        .then((res) => res.json())
        .then((data: any) => {
          clear();
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Credit(s) added successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateCredits_Data(data[0]?.credits));
          //saving data locally ==========
          window.localStorage.setItem(
            "payments_record",
            JSON.stringify(data[0]?.payment_data)
          );
          window.localStorage.setItem(
            "credits",
            JSON.stringify(data[0]?.credits)
          );
        })
        .catch(() => {
          clear();
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Failed to add credits(s) please retry",
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
    }else{dispatch(
      updateAlert([
        ...alerts,
        {
          message: "Make sure all fields are filled properly",
          color: "bg-red-200",
          id: new Date().getTime(),
        },
      ])
    );
    setLoading(false);}
  };

  //companent
  return (
    <div
      className={`bg-slate-900/70 fixed left-0 right-0 -top-6 bottom-0 z-[99999]
       p-6 pt-20 flex justify-center overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar ${
         creditModal ? "" : "hidden"
       }`}
    >
      {/**Close Modal ========== */}
      <button
        disabled={loading}
        onClick={() => setCreditModal(false)}
        type="button"
        className="h-6 w-6 absolute top-8 right-3 rounded-sm bg-red-600 text-white text-sm"
      >
        &times;
      </button>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white w-[35rem] min-h-[25rem] h-fit rounded p-6 space-y-4 relative"
      >
        {/**Student Details ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0 relative">
          <legend className="p-1 text-slate-500">Student</legend>
          <div className="w-full h-10 flex items-center overflow-hidden">
            <input
              onFocus={() => {
                setCredits(true);
              }}
              onBlur={() => {
                setCredits(true);
              }}
              type="search"
              className={`w-full h-full outline-none focus:border-0 focus:ring-0 ${
                selectedArray?.length <= 0
              ?"placeholder:text-slate-400":"placeholder:text-slate-700"}`}
              placeholder={
                selectedArray?.length <= 0
                  ? "Search for a student(s)"
                  : selectedArray?.length + " Students Selected"
              }
              value={search}
              onChange={(e) => {
                searchValue(e.target.value);
              }}
            />
          </div>
          {showCredits && students_data?.length >= 1 && (
            <div
              ref={studentsRef}
              className="absolute top-14 left-0 z-[9999] drop-shadow-xl shadow-xl w-full min-h-[3rem] bg-slate-200 rounded-sm border border-blue-300 p-2 space-y-2"
            >
              <button
                type="button"
                onClick={() => {
                  if (selectedArray?.length <= 0) {
                    setSelected(
                      students_data?.map((data: any) => data?.student_id)
                    );
                  } else {
                    setSelected([]);
                  }
                }}
                className={`bg-white hover:opacity-75 transition-all text-blue-600 text-xs flex items-center justify-center space-x-2 h-10 w-full px-2 rounded-md border border-blue-300`}
              >
                {selectedArray?.length <= 0 ? (
                  <TbSquare className="text-base" />
                ) : (
                  <TbSquareCheck className="text-lg" />
                )}
                <span className="pt-1">
                  {selectedArray?.length <= 0 ? "Mark all" : "Unmark all"}
                </span>
              </button>
              {students_data?.map((student: any) => {
                return (
                  <div
                    onClick={() => {
                      setCreditsObj((prev: any) => ({
                        ...prev,
                        student_id: student?.student_id,
                      }));
                      searchValue("");
                    }}
                    key={student?.student_id}
                    className="w-full h-fit rounded-sm border border-slate-50 p-2 px-4 text-slate-600 text-sm bg-slate-100 flex items-center space-x-3"
                  >
                    <span className="overflow-hidden cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          selectedArray?.some(
                            (data: any) => data === student?.student_id
                          )
                            ? true
                            : false
                        }
                        onChange={(e: any) => {
                          if (e.target.checked === true) {
                            if (
                              selectedArray?.some(
                                (data: any) => data === student?.student_id
                              )
                            ) {
                              dispatch(
                                updateAlert([
                                  ...alerts,
                                  {
                                    message: "Item is already selected",
                                    color: "bg-green-200",
                                    id: new Date().getTime(),
                                  },
                                ])
                              );
                            } else {
                              setSelected((prev: any) => [
                                ...prev,
                                student?.student_id,
                              ]);
                            }
                          } else {
                            setSelected((prev: any) => [
                              ...prev?.filter(
                                (data: any) => data !== student?.student_id
                              ),
                            ]);
                          }
                        }}
                      />
                    </span>
                    <div className="text-xs text-slate-500 grid">
                      <span className="text-sm text-slate-600">
                        {student?.student_name}
                      </span>
                      <span className="overflow-hidden">
                        {user?.school_type?.toLowerCase() === "primary school"
                          ? "Grade-"
                          : ""}
                        {student?.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </fieldset>

        {/**Term ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Term | Period</legend>
          <select
            onChange={(e) => {
              setCreditsObj((prev: any) => ({
                ...prev,
                term_ref: e.target.value?.toLowerCase(),
              }));
            }}
            required
            name="payment_time"
            id="payment_time"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          >
            <option value="">Term | Period</option>
            {periods?.map((data: any, index: number) => {
              return (
                <option key={index} value={data?.name}>
                  {data?.name}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/**Amount ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Amount</legend>
          <div className="w-full h-10 flex justify-between items-center capitalize text-slate-700 overflow-hidden">
            <input
              onChange={(e) => {
                setCreditsObj((prev: any) => ({
                  ...prev,
                  credit_amount_usd: e.target.value,
                }));
              }}
              required
              value={credits_obj?.credit_amount_usd}
              type="credit_amount_usd"
              id="credit_amount_usd"
              placeholder="0.00"
              className="w-[75%] h-full border-r border-slate-200 focus:border-0 focus:border-r focus:ring-0 focus:outline-none px-3"
            />
            <div className="h-full w-[25%] px-2 flex justify-center items-center text-slate-500 text-sm">
              USD
            </div>
          </div>
        </fieldset>

        {/**Credit For ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Credit For</legend>
          <input
            onChange={(e) => {
              setCreditsObj((prev: any) => ({
                ...prev,
                type: e.target.value,
              }));
            }}
            type="text"
            required
            name="type"
            id="type"
            value={credits_obj?.type}
            placeholder="e.g School Levy"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none text-sm text-slate-700 resize-none"
          />
        </fieldset>

        {/**Controls ========== */}
        <div className="w-full flex items-center space-x-4">
          <button
            onClick={() => setCreditModal(false)}
            type="button"
            disabled={loading}
            className="h-10 w-32 rounded-sm bg-slate-300 text-slate-700 text-base hover:opacity-80 transition-all pt-1"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="h-10 min-w-[8rem] rounded-sm bg-blue-600 text-slate-50 text-base hover:opacity-80 transition-all px-4 flex items-center justify-center space-x-2 disabled:cursor-not-allowed  disabled:opacity-80"
          >
            {loading && (
              <div className="h-4 w-4 rounded-full border-2 border-t-white border-r-white border-blue-500 animate-spin"></div>
            )}
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCredit;
