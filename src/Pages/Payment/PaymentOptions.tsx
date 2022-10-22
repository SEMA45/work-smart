import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {
  updatePayments_Data,updateCredits_Data
} from "../../Redux/Slices/School_DataSlice";

type Props = {
  paymentModal: any;
  setPayModal: any;
};

const PaymentOptions: FC<Props> = ({ paymentModal, setPayModal }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const students = useSelector((state: RootState) => state.SchoolData.students);
  const currencies = useSelector(
    (state: RootState) => state.SchoolSettings.currencies
  );
  const periods = useSelector(
    (state: RootState) => state.SchoolSettings.periods_terms
  );
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [payment_obj, setPaymentObj] = useState({
    student_id: "",
    student_name: "",
    school_id: "",
    grade: "",
    payment_date: "",
    payment_amount: "",
    payment_currency: "usd",
    payment_method: "",
    payment_description: "",
    equivalent_amount_usd: "",
    term_ref: "",
    payment_id: "",
    admin_email: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    //clear fields on complete
    const clear = () => {
      setPaymentObj({
        student_id: "",
        student_name: "",
        school_id: "",
        grade: "",
        payment_date: "",
        payment_amount: "",
        payment_currency: "usd",
        payment_method: "",
        payment_description: "",
        equivalent_amount_usd: "",
        term_ref: "",
        payment_id: "",
        admin_email: "",
      });
      setLoading(false);
      setPayModal(false);
      formRef && formRef.current?.reset();
    };

    if (
      payment_obj?.payment_method === "cash" ||
      payment_obj?.payment_method === "other"
    ) {
      fetch(
        `https://script.google.com/macros/s/AKfycbw0I-xRvrHTdVWOi8naWjXzMPVwxe6F92qOjubeEjrtfpZ2AeY1oTAGJ_u23-3E5S6WOA/exec?action=add_payment&schoolID=${
          user?.school_id
        }&${JSON.stringify({
          ...payment_obj,
          equivalent_amount_usd:
            payment_obj?.payment_currency?.toLowerCase() !== "usd"
              ? (
                  Number(payment_obj?.payment_amount) /
                  currencies?.filter(
                    (currrency: any) =>
                      currrency?.name?.toLowerCase() ===
                      payment_obj?.payment_currency?.toLowerCase()
                  )[0]?.rate_multiplier
                )?.toFixed(2)
              : payment_obj?.payment_amount,
          admin_email: user?.email,
        })
          ?.toString()
          ?.replace(/,/gim, "&")
          ?.replace(/"|\{|\}/gim, "")
          ?.replace(/:/gim, "=")}`
      )
        .then((res) => res.json())
        .then((data: any) => {
          clear();
          console.log(data);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Payment added successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updatePayments_Data(data[0]?.payment_data));
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
                message: "Failed to make payment please retry",
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
    }else{
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Payment Option is not available yet",
            color: "bg-red-200",
            id: new Date().getTime(),
          },
        ])
      );
      setLoading(false);
    }
  };

  //companent
  return (
    <div
      className={`w-screen h-screen bg-slate-900/40 fixed  left-0 right-0 top-0 bottom-0 z-[99999] flex justify-center items-center overflow-hidden no-scrollbar no-scrollbar::-webkit-scrollbar ${
        paymentModal ? "" : "hidden"
      }`}
    >
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white w-[35rem] min-h-[25rem] rounded-lg p-6 space-y-4 relative"
      >
        {/**Close Modal ========== */}
        <button
          disabled={loading}
          onClick={() => setPayModal(false)}
          type="button"
          className="h-6 w-6 absolute -top-3 -right-3 rounded-sm bg-red-600 text-white text-sm"
        >
          &times;
        </button>

        {/**Payment Method ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Payment Option</legend>
          <select
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                payment_method: e.target.value?.toLowerCase(),
              }));
            }}
            required
            name="payment_time"
            id="payment_time"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          >
            <option value="">Payment Option</option>
            <option value="cash">cash</option>
            <option value="debit_card">credit /debit card</option>
            <option value="eco cash">eco cash</option>
            <option value="other">other</option>
          </select>
        </fieldset>

        {/**Payment Amount ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Payment Amount</legend>
          <div className="w-full h-10 flex justify-between items-center capitalize text-slate-700 overflow-hidden">
            <input
              onChange={(e) => {
                setPaymentObj((prev: any) => ({
                  ...prev,
                  payment_amount: e.target.value,
                }));
              }}
              required
              value={payment_obj?.payment_amount}
              type="number"
              placeholder="0.00"
              className="w-[75%] h-full border-r border-slate-200 focus:border-0 focus:border-r focus:ring-0 focus:outline-none px-3"
            />
            <div className="h-full w-[25%] px-2">
              <select
                onChange={(e) => {
                  setPaymentObj((prev: any) => ({
                    ...prev,
                    payment_currency: e.target.value?.toLowerCase(),
                  }));
                }}
                required
                name="payment_currency"
                id="payment_currency"
                className="w-full h-full flex items-center justify-center pt-1 text-xs rounded focus:border-0 focus:ring-0 focus:outline-none uppercase text-slate-700"
              >
                {currencies?.map((currence: any) => {
                  return (
                    <option key={currence.name} value={currence?.name}>
                      {currence.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </fieldset>

        {/**Student Details ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Student Name</legend>
          <select
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                student_id: JSON.parse(e.target.value)?.student_id,
                student_name: JSON.parse(e.target.value)?.student_name,
                school_id: JSON.parse(e.target.value)?.school_id,
                grade: JSON.parse(e.target.value)?.grade,
              }));
            }}
            required
            name="payment_time"
            id="payment_time"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          >
            <option
              value={JSON.stringify({
                student_id: "",
                student_name: "",
                school_id: "",
                grade: "",
              })}
            >
              Student Name
            </option>
            {students?.map((student: any) => {
              return (
                <option
                  key={student?.student_id}
                  value={JSON.stringify(student)}
                >
                  {student?.student_name}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/**Period Ref ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Period</legend>
          <select
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                term_ref: JSON.parse(e.target.value)?.name,
              }));
            }}
            required
            name="payment_time"
            id="payment_time"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          >
            {periods?.map((period: any) => {
              return (
                <option key={period.name} value={JSON.stringify(period)}>
                  {period.name}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/**Payment Date ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Payment Date</legend>
          <input
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                payment_date: new Date(e.target.value?e.target.value:"").getTime(),
              }));
            }}
            required
            type="date"
            name="Payment Date"
            id="Payment Date"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none uppercase text-sm text-slate-700"
          />
        </fieldset>

        {/**Payment Description ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Payment Description</legend>
          <textarea
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                payment_description: e.target.value,
              }));
            }}
            required
            name="textarea"
            id="textarea"
            value={payment_obj?.payment_description}
            placeholder="Payment description"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none text-sm text-slate-700 resize-none"
          ></textarea>
        </fieldset>

        {/**Controls ========== */}
        <div className="w-full flex items-center space-x-4">
          <button
            onClick={() => setPayModal(false)}
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

export default PaymentOptions;
