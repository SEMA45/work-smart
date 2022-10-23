import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { numberWithSpaces } from "../../Reusable Functions/Functions";

type Props = {
  setPreview: any;
};

const RecentActivities: FC<Props> = ({ setPreview }) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );
  const selectedTerm = useSelector(
    (state: RootState) => state.SchoolSettings.selectedTerm
  );
  const payment_data = useSelector(
    (state: RootState) => state.SchoolData.payments_record
  )?.filter((data: any) =>
    selectedTerm?.some((term: any) =>
      term
        ?.replace(/\s|\(|\)/gi, "")
        ?.toLowerCase()
        ?.includes(data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase())
    )
  );

  const list =
    payment_data?.length >= 1 &&
    [...payment_data]
      ?.sort(
        (a: any, b: any) => Number(b.payment_date) - Number(a.payment_date)
      )
      ?.slice(0, 5)
      ?.map((payment: any) => {
        return (
          <div
            key={payment?.payment_id}
            className={`min-h-[3rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative grid grid-cols-5 px-2`}
          >
            <div className="text-left space-x-4 p-1 flex items-center h-full col-span-1">
              <span>{payment?.student_name}</span>
            </div>
            <div className="text-left space-x-4 p-1 flex items-center h-full col-span-1">
              <span>{payment?.grade}</span>
            </div>
            <div className="text-left space-x-4 p-1 flex items-center h-full col-span-1">
              <span>{new Date(payment?.payment_date).toDateString()}</span>
            </div>
            <div className="text-left space-x-4 p-1 flex items-center h-full col-span-1">
              <span>
                {selectedCurrency?.symbol}&nbsp;
                {numberWithSpaces(
                  (
                    selectedCurrency?.rate_multiplier *
                    Number(payment?.equivalent_amount_usd)
                  ).toFixed(2)
                )}
              </span>
            </div>
            <div className="text-left space-x-4 p-1 flex items-center h-full col-span-1">
              <span>{payment?.payment_method}</span>
            </div>
            {/**Print Or View Statement */}
            <button
              onClick={() => {
                window.localStorage.setItem('paymentInvoiceData',JSON.stringify(payment))
                setPreview(true);
              }}
              className="absolute right-4 top-2.5 h-6 px-3 bg-blue-200 text-slate-800 rounded-full"
            >
              view
            </button>
          </div>
        );
      });

  //componet ==========
  return (
    <div className="h-fit lg:h-full min-h-[22rem] lg:row-span-1 col-span-1 md:col-span-2 lg:col-span-3 bg-white border border-blue-200 rounded overflow-hidden">
      {" "}
      <div className="h-12 w-full bg-nherit flex items-center justify-between px-4 text-lg font-medium text-gray-600">
        <span>Recent Payments</span>
      </div>
      <div className="w-full h-[calc(100%-3rem)] overflow-hidden overflow-y-scroll">
        <div className="sticky top-0 h-fit w-full bg-slate-100 z-[9]">
          <div className="h-14 w-full text-xs leading-none text-slate-700 uppercase font-bold tracking-wider grid grid-cols-5 px-2">
            <div className="font-bold text-left space-x-4 p-1 h-full col-span-1 flex items-center">
              <span>Student Name</span>
            </div>
            <div className="font-bold text-left space-x-4 p-1 h-full col-span-1 flex items-center">
              <span>Student Grade</span>
            </div>
            <div className="font-bold text-left space-x-4 p-1 h-full col-span-1 flex items-center">
              <span>Payment Date</span>
            </div>
            <div className="font-bold text-left space-x-4 p-1 h-full col-span-1 flex items-center">
              <span>Payment Amount</span>
            </div>
            <div className="font-bold text-left space-x-4 p-1 h-full col-span-1 flex items-center">
              <span>Payment Method</span>
            </div>
          </div>
        </div>
        {payment_data?.length>=1?<div role="table" className="w-full h-fit">{list}</div>:<><p className="text-slate-400 text-lg font-semibold text-center mt-14">There are no  recent payments</p></>}
      </div>
    </div>
  );
};

export default RecentActivities;
