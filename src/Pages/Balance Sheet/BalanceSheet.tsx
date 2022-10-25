import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { numberWithSpaces } from "../../Reusable Functions/Functions";
import { TbSearch, TbTrash, TbSquareCheck, TbSquare } from "react-icons/tb";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {
  updatePayments_Data,
  updateCredits_Data,
} from "../../Redux/Slices/School_DataSlice";
import PreviewPrint from "../../Components/Payment/PreviewPrint";
import ActionPanel from "../../Components/Misc/ActionPanel";

type Props = {};

const BalanceSheet: FC<Props> = () => {
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [tab, setTab] = useState<string>("payments");
  const [search, setSearch] = useState<string>("");
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );
  const selectedTerm = useSelector(
    (state: RootState) => state.SchoolSettings.selectedTerm
  );
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [selectedArray, setSelected] = useState<any>([]);
  const [actionLoading, setAction] = useState<boolean>(false);
  const [showPreview, setPreview] = useState<boolean>(false);
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const payment_data = useSelector(
    (state: RootState) => state.SchoolData.payments_record
  )
    ?.filter((data: any) =>
      selectedTerm?.some((term: any) =>
        term
          ?.replace(/\s|\(|\)/gi, "")
          ?.toLowerCase()
          ?.includes(data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase())
      )
    )
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
    );
  const credits_data = useSelector(
    (state: RootState) => state.SchoolData.credits_record
  )
    ?.filter((data: any) =>
      selectedTerm?.some((term: any) =>
        term
          ?.replace(/\s|\(|\)/gi, "")
          ?.toLowerCase()
          ?.includes(data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase())
      )
    )
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
    );

  /**Payment List ================== */
  const payments_list =
    payment_data?.length >= 1 &&
    tab === "payments" &&
    [...payment_data]
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
              <input
                type="checkbox"
                checked={
                  selectedArray?.some(
                    (data: any) => data === payment?.payment_id
                  )
                    ? true
                    : false
                }
                onChange={(e: any) => {
                  if (e.target.checked === true) {
                    if (
                      selectedArray?.some(
                        (data: any) => data === payment?.payment_id
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
                        payment?.payment_id,
                      ]);
                    }
                  } else {
                    setSelected((prev: any) => [
                      ...prev?.filter(
                        (data: any) => data !== payment?.payment_id
                      ),
                    ]);
                  }
                }}
              />
            </td>
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <strong>{payment?.student_name}</strong>
              <span className="text-slate-500">[{payment?.payment_id}]</span>
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <span>{payment?.type}</span>
              <span className="text-slate-500">({payment?.term_ref})</span>
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
            <td
              onClick={() => {
                window.localStorage.setItem(
                  "paymentInvoiceData",
                  JSON.stringify(payment)
                );
                setPreview(true);
              }}
              className="absolute right-4 top-2.5 h-6 px-3 pt-0.5 bg-blue-200 text-slate-800 rounded-full cursor-pointer"
            >
              <div className="h-full w-fufll flex justify-center items-center lowercase">
                view
              </div>
            </td>
          </tr>
        );
      });

  /**Credits List ================== */
  const credits_list =
    credits_data?.length >= 1 &&
    tab === "debt" &&
    [...credits_data]
      ?.sort((a: any, b: any) => Number(a.id) - Number(b.id))
      ?.map((payment: any, index: any) => {
        return (
          <tr
            key={payment?.id}
            className={`min-h-[3rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative flex justify-between px-4`}
          >
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedArray?.some((data: any) => data === payment?.id)
                    ? true
                    : false
                }
                onChange={(e: any) => {
                  if (e.target.checked === true) {
                    if (
                      selectedArray?.some((data: any) => data === payment?.id)
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
                      setSelected((prev: any) => [...prev, payment?.id]);
                    }
                  } else {
                    setSelected((prev: any) => [
                      ...prev?.filter((data: any) => data !== payment?.id),
                    ]);
                  }
                }}
              />
            </td>
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%] flex flex-col">
              <strong>{payment?.student_name}</strong>
              <span className="text-slate-500">[ID-{payment?.id}]</span>
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[17.5%] flex flex-col">
              <span>{payment?.type}</span>
              <span className="text-slate-500">({payment?.term_ref})</span>
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
            <td
              onClick={() => {
                window.localStorage.setItem(
                  "paymentInvoiceData",
                  JSON.stringify(payment)
                );
                setPreview(true);
              }}
              className="absolute right-4 top-2.5 h-6 px-3 pt-0.5 bg-blue-200 text-slate-800 rounded-full cursor-pointer"
            >
              <div className="h-full w-fufll flex justify-center items-center lowercase">
                view
              </div>
            </td>
          </tr>
        );
      });

  //Delete credit
  const delete_credit = () => {
    setAction(true);
    fetch(
      `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=delete_credit&schoolID=${
        user?.school_id
      }&data=${selectedArray?.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSelected([]);
        dispatch(updatePayments_Data(data[0]?.payment_data));
        dispatch(updateCredits_Data(data[0]?.credits));
        setAction(false);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Credit(s) deleted successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
      })
      .catch(() => {
        setAction(false);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Failed to delete please retry",
              color: "bg-red-200",
              id: new Date().getTime(),
            },
          ])
        );
      });
  };

  //Delete payment
  const delete_payment = () => {
    setAction(true);
    fetch(
      `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=delete_payment&schoolID=${
        user?.school_id
      }&data=${selectedArray?.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSelected([]);
        dispatch(updatePayments_Data(data[0]?.payment_data));
        dispatch(updateCredits_Data(data[0]?.credits));
        window.localStorage.setItem(
          "payments_record",
          JSON.stringify(data[0]?.payment_data)
        );
        window.localStorage.setItem(
          "credits",
          JSON.stringify(data[0]?.credits)
        );
        setAction(false);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Credit(s) deleted successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
      })
      .catch(() => {
        setAction(false);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Failed to delete please retry",
              color: "bg-red-200",
              id: new Date().getTime(),
            },
          ])
        );
      });
  };

  //components
  return (
    <div
      className={`w-full h-full min-h-[100%] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-blue-100 p-4 relative space-y-4`}
    >
      <nav className="h-12 w-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              onClick={() => {
                setTab("payments");
                setSelected([]);
              }}
              className={`${
                tab === "payments" ? "bg-blue-600" : "bg-blue-400"
              } text-white text-xs flex items-center justify-center h-10 w-20 px-3 rounded-l-md hover:opacity-75 transition-all border-r border-blue-300`}
            >
              Payments
            </button>
            <button
              onClick={() => {
                setTab("debt");
                setSelected([]);
              }}
              className={`${
                tab !== "payments" ? "bg-blue-600" : "bg-blue-400"
              } text-white text-xs flex items-center justify-center h-10 w-20 px-3 rounded-r-md hover:opacity-75 transition-all`}
            >
              Debts
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (selectedArray?.length <= 0) {
                  if (tab === "debt") {
                    setSelected(credits_data?.map((data: any) => data?.id));
                  } else if (tab === "payments") {
                    setSelected(
                      payment_data?.map((data: any) => data?.payment_id)
                    );
                  }
                } else {
                  setSelected([]);
                }
              }}
              className={`bg-white hover:opacity-75 transition-all text-blue-600 text-xs flex items-center justify-center space-x-2 h-10 w-28 px-2 rounded-md border border-blue-300`}
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
            <button
              onClick={() => {
                if (selectedArray?.length >= 1) {
                  setActionPanel(true);
                }
              }}
              className={`bg-white hover:opacity-75 transition-all text-red-600 text-xs flex items-center justify-center space-x-2 h-10 w-28 px-3 rounded-md border border-red-300`}
            >
              <TbTrash className="text-base" />{" "}
              <span className="pt-1">Delete</span>
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
      {/**Loading Preloaeder ====== */}
      <div
        className={`z-[999] fixed -top-6 left-0 right-0 bottom-0 bg-blue-900/80 ${
          actionLoading ? "flex" : "hidden"
        } flex-col items-center justify-center`}
      >
        <div className="h-10 w-10 border-4 border-blue-200 border-l-blue-600 rounded-full animate-spin"></div>
        <p className="text-base text-white font-semibold mt-4">
          Please wait ...
        </p>
      </div>
      {/**Preview */}
      <PreviewPrint showPreview={showPreview} setPreview={setPreview} />
      {/**Action Panel */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        option={tab === "debt" ? "Credit(s)" : "Transaction(s)"}
        deleteSelected={tab === "debt" ? delete_credit : delete_payment}
      />
    </div>
  );
};

export default BalanceSheet;
