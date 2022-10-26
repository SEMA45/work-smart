import { FC, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {
  updatePayments_Data,
  updateCredits_Data,
} from "../../Redux/Slices/School_DataSlice";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  paymentModal: any;
  setPayModal: any;
};

const PaymentOptions: FC<Props> = ({ paymentModal, setPayModal }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const currencies = useSelector(
    (state: RootState) => state.SchoolSettings.currencies
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
  const credits_data = useSelector(
    (state: RootState) => state.SchoolData.credits_record
  );
  const [search, searchValue] = useState("");
  const [showCredits, setCredits] = useState<Boolean>(false);
  const searchResults = useMemo(() => {
    return credits_data
      ?.filter(
        (data: any) =>
          data?.student_name
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
          data?.term_ref
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
          data?.type
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
      )
      ?.slice(0, 5);
  }, [credits_data, search]);

  //Close search modal on click utside
  const studentsRef = useOnClickOutside(() => {
    setCredits(false);
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
      (payment_obj?.payment_method === "cash" &&
        payment_obj?.student_name?.length >= 1) ||
      (payment_obj?.payment_method === "other" &&
        payment_obj?.student_name?.length >= 1)
    ) {
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=add_payment&schoolID=${
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
    } else {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Make sure all fields are filled properly",
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
      className={`bg-slate-900/70 fixed left-0 right-0 -top-6 bottom-0 z-[99999]
       p-6 pt-14 flex justify-center overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar ${
         paymentModal ? "" : "hidden"
       }`}
    >
      {/**Close Modal ========== */}
      <button
        disabled={loading}
        onClick={() => setPayModal(false)}
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
                payment_obj?.student_name?.length >= 1 && "hidden"
              }`}
              placeholder="Search for an Invoice"
              value={search}
              onChange={(e) => {
                searchValue(e.target.value);
              }}
            />
            {!showCredits && payment_obj?.student_name?.length >= 1 && (
              <div className="bg-blue-100 border border-slate-00 rounded-full flex justify-between items-center h-7 text-xs text-slate-600 px-2 p-1 space-x-2">
                <span className="h-full pt-0.5 px-2">
                  {payment_obj?.student_name}
                </span>
                <button
                  onClick={() => {
                    setPaymentObj((prev: any) => ({
                      ...prev,
                      student_id: "",
                      student_name: "",
                      school_id: "",
                      grade: "",
                    }));
                    setCredits(true);
                  }}
                  type="button"
                  className="h-full flex justify-center items-center px-2 border-l border-slate-400 text-lg text-red-600"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
          {showCredits && searchResults?.length >= 1 && (
            <div
              ref={studentsRef}
              className="absolute top-14 left-0 z-[9999] drop-shadow-xl shadow-xl w-full min-h-[3rem] bg-slate-200 rounded-sm border border-slate-300 p-2 space-y-2"
            >
              {searchResults?.map((data: any) => {
                return (
                  <div
                    onClick={() => {
                      setPaymentObj((prev: any) => ({
                        ...prev,
                        student_id: data?.student_id,
                        student_name: data?.student_name,
                        school_id: data?.school_id,
                        grade: data?.grade,
                        type: data?.type,
                        term_ref: data?.term_ref,
                      }));
                      searchValue("");
                      setCredits(false);
                    }}
                    key={data?.student_id}
                    className="w-full h-fit rounded-sm border border-slate-50 p-2 text-slate-600 text-sm cursor-pointer bg-slate-100"
                  >
                    <span>{data?.student_name}</span>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="w-[50%] overflow-hidden">
                        {data?.term_ref}
                      </span>
                      <span className="w-[50%] overflow-hidden text-right">
                        $ {data?.credit_amount_usd}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

        {/**Payment Date ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">Payment Date</legend>
          <input
            onChange={(e) => {
              setPaymentObj((prev: any) => ({
                ...prev,
                payment_date: new Date(
                  e.target.value ? e.target.value : ""
                ).getTime(),
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
