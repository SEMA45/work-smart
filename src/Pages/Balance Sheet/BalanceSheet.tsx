import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { numberWithSpaces } from "../../Reusable Functions/Functions";
import { TbSearch } from "react-icons/tb";

type Props = {};

const BalanceSheet: FC<Props> = () => {
  const [tab, setTab] = useState<string>("payments");
  const [search, setSearch] = useState<string>("");
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
  const credits_data = useSelector(
    (state: RootState) => state.SchoolData.credits_record
  )?.filter((data: any) =>
    selectedTerm?.some((term: any) =>
      term
        ?.replace(/\s|\(|\)/gi, "")
        ?.toLowerCase()
        ?.includes(data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase())
    )
  );

  /**Payment List ================== */
  const payments_list =
    payment_data?.length >= 1 &&
    tab === "payments" &&
    [...payment_data]
      ?.filter(
        (data: any) =>
          data?.student_name
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
          data?.type
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
      )
      ?.sort(
        (a: any, b: any) => Number(b.payment_date) - Number(a.payment_date)
      )
      ?.map((payment: any, index: any) => {
        return (
          <tr
            key={payment?.payment_id}
            className={`min-h-[3rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative flex justify-between px-4`}
          >
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              <input type="checkbox" className="" />
            </td>
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <strong>{payment?.student_name}</strong>
              <span className="text-slate-500">({payment?.term_ref})</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%]">
              <span>{payment?.type}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%]">
              <span>{new Date(payment?.payment_date).toDateString()}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%]">
              <span>{payment?.payment_method}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%]">
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
            {/**Print Or View Statement */}
            <button
              onClick={() => {
                window.localStorage.setItem(
                  "paymentInvoiceData",
                  JSON.stringify(payment)
                );
              }}
              className="absolute right-4 top-2.5 h-6 px-3 bg-blue-200 text-slate-800 rounded-full"
            >
              view
            </button>
          </tr>
        );
      });

  /**Credits List ================== */

  const credits_list =
    credits_data?.length >= 1 &&
    tab === "debt" &&
    [...credits_data]
      ?.filter(
        (data: any) =>
          data?.student_name
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
          data?.type
            ?.toLowerCase()
            ?.replace(/\s/gim, "")
            ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
      )
      ?.sort(
        (a: any, b: any) => Number(b.payment_date) - Number(a.payment_date)
      )
      ?.map((payment: any, index: any) => {
        return (
          <tr
            key={payment?.payment_id}
            className={`min-h-[3rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative flex justify-between px-4`}
          >
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              <input type="checkbox" className="" />
            </td>
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%] flex flex-col">
              <strong>{payment?.student_name}</strong>
              <span className="text-slate-500">({payment?.term_ref})</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%]">
              <span>{payment?.type}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%]">
              <span>{payment?.grade}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%]">
              <span>
                {selectedCurrency?.symbol}&nbsp;
                {numberWithSpaces(
                  (
                    selectedCurrency?.rate_multiplier *
                    Number(payment?.credit_amount_usd)
                  ).toFixed(2)
                )}
              </span>
            </td>
            {/**Print Or View Statement */}
            <button
              onClick={() => {
                window.localStorage.setItem(
                  "paymentInvoiceData",
                  JSON.stringify(payment)
                );
              }}
              className="absolute right-4 top-2.5 h-6 px-3 bg-blue-200 text-slate-800 rounded-full"
            >
              view
            </button>
          </tr>
        );
      });

  //components
  return (
    <div
      className={`w-full h-full min-h-[100%] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-blue-100 p-4 relative space-y-4`}
    >
      <nav className="h-12 w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <button
              onClick={() => {
                setTab("debt");
              }}
              className={`${
                tab !== "payments" ? "bg-blue-600" : "bg-blue-400"
              } text-white text-xs flex items-center justify-center h-10 w-20 px-3 rounded-l-lg border-r border-blue-300`}
            >
              Debts
            </button>
            <button
              onClick={() => {
                setTab("payments");
              }}
              className={`${
                tab === "payments" ? "bg-blue-600" : "bg-blue-400"
              } text-white text-xs flex items-center justify-center h-10 w-20 px-3 rounded-r-lg`}
            >
              Payments
            </button>
          </div>
        </div>
        <div className="w-fit h-fit relative">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            type="search"
            name="search"
            id="search"
            className="h-10 w-[18rem] rounded-full px-3 p-1 pt-1 pr-8 border border-blue-300"
            placeholder="Quick search"
          />
          <TbSearch className="absolute right-3 top-3 text-slate-400" />
        </div>
      </nav>

      {/**Tables ========================= */}
      <div className="w-full min-h-[30rem] h-[calc(100%-3.8rem)] bg-white border border-blue-300 rounded-lg overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        {tab === "payments" ? (
          <table className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            <thead className="w-full h-12 bg-slate-100 sticky top-0 z-[99]">
              <tr className="h-full w-full px-4 py-1 flex items-center justify-between text-sm text-slate-700">
                <th className="pt-3 w-[5%] h-full text-left cursor-pointer text-blue-600">
                  Select
                </th>
                <th className="pt-3 w-[5%] h-full text-left">Index</th>
                <th className="pt-3 w-[15%] h-full text-left">Payment For</th>
                <th className="pt-3 w-[15%] h-full text-left">Type</th>
                <th className="pt-3 w-[15%] h-full text-left">Payment Date</th>
                <th className="pt-3 w-[15%] h-full text-left">
                  Payment Method
                </th>
                <th className="pt-3 w-[15%] h-full text-left">Amount ($)</th>
              </tr>
            </thead>
            <tbody className="h-[calc(100%-3rem)] w-full px-4 text-sm text-slate-700 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
              {payments_list}
            </tbody>
          </table>
        ) : (
          <table className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            <thead className="w-full h-12 bg-slate-100 sticky top-0 z-[99]">
              <tr className="h-full w-full px-4 py-1 flex items-center justify-between text-sm text-slate-700">
                <th className="pt-3 w-[5%] h-full text-left cursor-pointer text-blue-600">
                  Select
                </th>
                <th className="pt-3 w-[5%] h-full text-left">Index</th>
                <th className="pt-3 w-[17.5%] h-full text-left">Payment For</th>
                <th className="pt-3 w-[17.5%] h-full text-left">Type</th>
                <th className="pt-3 w-[17.5%] h-full text-left">grade</th>
                <th className="pt-3 w-[17.5%] h-full text-left">Amount ($)</th>
              </tr>
            </thead>
            <tbody className="h-[calc(100%-3rem)] w-full px-4 text-sm text-slate-700 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
              {credits_list}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BalanceSheet;
