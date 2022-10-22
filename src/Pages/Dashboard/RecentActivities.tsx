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
      ?.slice(0, 6)
      ?.map((payment: any) => {
        return (
          <tr
            key={payment?.payment_id}
            className={`min-h-[3.5rem] h-[16%] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b dark:border-gray-800 snap_childTwo relative`}
          >
            <td className="text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>{payment?.student_name}</span>
            </td>
            <td className="text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>{payment?.grade}</span>
            </td>
            <td className="text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>{new Date(payment?.payment_date).toDateString()}</span>
            </td>
            <td className="text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>
                {selectedCurrency?.symbol}&nbsp;
                {numberWithSpaces(
                  (
                    selectedCurrency?.rate_multiplier *
                    Number(payment?.equivalent_amount_usd)
                  ).toFixed(2)
                )}
              </span>
            </td>
            <td className="text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>{payment?.payment_method}</span>
            </td>
            {/**Print Or View Statement */}
            <button
              onClick={() => {
                setPreview(true);
              }}
              className="absolute right-4 top-2.5 h-6 px-3 bg-blue-200 text-slate-800 rounded-full"
            >
              view
            </button>
          </tr>
        );
      });

  //componet ==========
  return (
    <div className="h-[22rem] lg:h-full min-h-[22rem] lg:row-span-1 col-span-1 md:col-span-2 lg:col-span-3 bg-white border border-blue-200 rounded overflow-hidden">
      {" "}
      <div className="h-12 w-full bg-nherit flex items-center justify-between px-4 text-lg font-medium text-gray-600">
        <span>Recent Payments</span>
      </div>
      <table className="w-full h-[calc(100%-3rem)] p-4 overflow-hidden overflow-y-scroll">
        <thead className="sticky top-0 h-fit w-full rounded-lg bg-slate-100 dark:bg-[#2626266c] z-[9]">
          <tr className="h-14 w-full text-xs leading-none text-slate-700 uppercase font-bold tracking-wider">
            <th className="font-bold text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>Student Name</span>
            </th>
            <th className="font-bold text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>Student Grade</span>
            </th>
            <th className="font-bold text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>Payment Date</span>
            </th>
            <th className="font-bold text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>Payment Amount</span>
            </th>
            <th className="font-bold text-left space-x-4 p-1 pl-4 border-l dark:border-gray-800">
              <span>Payment Method</span>
            </th>
          </tr>
        </thead>
        <tbody className="w-full h-[calc(100%-3.5rem)] px-1">{list}</tbody>
      </table>
    </div>
  );
};

export default RecentActivities;
