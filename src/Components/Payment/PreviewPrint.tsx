import { FC, useMemo } from "react";
import { TbX, TbPrinter} from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { numberWithSpaces } from "../../Reusable Functions/Functions";

type Props = {
  showPreview: any;
  setPreview: any;
};

const PreviewPrint: FC<Props> = ({ showPreview, setPreview }) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );
  const school_obj = useSelector(
    (state: RootState) => state.SchoolSettings.schoolObj
  )?.other_settings?.split(/{|}|:|,/gim);
  const payment_object = useMemo(() => {
    let obj = window.localStorage.getItem("paymentInvoiceData");
    return showPreview && obj ? JSON.parse(obj) : {};
  }, [showPreview]);
  
  //Component
  return (
    <div
      className={`bg-blue-900/70 print:bg-white fixed z-[9999] -top-6 left-0 bottom-0 right-0 ${
        showPreview ? "flex" : "hidden"
      } justify-center p-12 overflow-hidden overflow-y-scroll no-scrollbar`}
    >
      {/**Close Button */}
      <button
        onClick={() => {
          setPreview(false);
        }}
        className="absolute right-4 top-4 h-6 w-6 print:hidden rounded-sm bg-red-600 text-white text-sm flex justify-center items-center"
      >
        <TbX />
      </button>
      {/**Close Button */}
      <div className="w-full min-h-[40rem] h-fit max-w-[38rem] rounded bg-white p-6 relative">
        <div className="flex justify-between items-center h-10 text-3xl font-semibold text-slate-700 uppercase">
          <h1 className="mt-2">Statement</h1>
          <button
            onClick={() => {
              window.print();
            }}
            className="h-8 w-28 px-2 text-sm text-white bg-blue-600 rounded-sm print:hidden flex items-center justify-center space-x-2"
          >
            <TbPrinter /> <span>Print</span>
          </button>{" "}
        </div>
        <div className="mt-4 flex justify-between text-sm font-medium text-slate-700 py-2 border-y border-slate-200">
          <ul className="max-w-[48%] overflow-hidden">
            {payment_object?.equivalent_amount_usd&&<li>
              Payment ID :{" "}
              <span className="text-slate-500">
                {payment_object?.payment_id}
              </span>
            </li>}
           {payment_object?.equivalent_amount_usd&& <li>
              Payment Date :{" "}
              <span className="text-slate-500">
                {new Date(payment_object?.payment_date).toDateString()}
              </span>
            </li>}
            <li>
              Student Grade:{" "}
              <span className="text-slate-500">
                {payment_object?.grade}
              </span>
            </li>
            <li>
              Student Name :{" "}
              <span className="text-slate-500">
                {payment_object?.student_name}
              </span>
            </li>
            {payment_object?.equivalent_amount_usd&&<li>
              Clerk's email :{" "}
              <span className="text-slate-500">
                {payment_object?.admin_email}
              </span>
            </li>}
          </ul>
          <ul className="max-w-[48%] overflow-hidden text-right h-full">
            <li className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              {school_obj[2]}
            </li>
            <li>
              <span className="text-slate-500">{school_obj[4]}</span>
            </li>
            <li>
              <span className="text-slate-500">{school_obj[7]}</span>
            </li>
          </ul>
        </div>

        {/**Tample*/}
        <table className="mt-10 w-full text-sm font-medium text-slate-700 py-2">
          <thead className="w-full h-10 bg-slate-200 flex justify-between items-center">
            <tr className="h-full w-full px-2 flex items-center justify-between">
              <th className="pt-3 w-[25%] h-full text-left">Payment For</th>
              <th className="pt-3 w-[25%] h-full text-left">Type</th>
              <th className="pt-3 w-[25%] h-full text-left">Payment Method</th>
              <th className="pt-3 w-[25%] h-full text-right">Amount ($)</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="h-10 w-full px-2 flex items-center justify-between">
              <td className="pt-3 w-[25%] overflow-hidden whitespace-nowrap h-full text-left capitalize">
                {payment_object?.term_ref}
              </td>
              <td className="pt-3 w-[25%] overflow-hidden whitespace-nowrap h-full text-left capitalize">
                {payment_object?.type}
              </td>
              <td className="pt-3 w-[25%] overflow-hidden whitespace-nowrap h-full text-left capitalize">
                {payment_object?.payment_method}
              </td>
              <td className="pt-3 w-[25%] overflow-hidden whitespace-nowrap h-full text-right">
                {selectedCurrency?.symbol}&nbsp;
                {numberWithSpaces(
                  (
                    selectedCurrency?.rate_multiplier *
                    Number(
                      payment_object?.equivalent_amount_usd ??
                        payment_object?.credit_amount_usd
                    )
                  ).toFixed(2)
                )}
              </td>
            </tr>
            <tr className="h-10 w-full px-2 flex items-center justify-between border-y border-slate-200">
              <td className="pt-3 w-[25%] h-full text-left capitalize">
                Total
              </td>
              <td className="pt-3 w-[25%] h-full text-left capitalize"></td>
              <td className="pt-3 w-[25%] h-full text-left capitalize"></td>
              <td className="pt-3 w-[25%] h-full text-right">
                {selectedCurrency?.symbol}&nbsp;
                {numberWithSpaces(
                  (
                    selectedCurrency?.rate_multiplier *
                    Number(
                      payment_object?.equivalent_amount_usd ??
                        payment_object?.credit_amount_usd
                    )
                  ).toFixed(2)
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/**Description */}
        <div className="mt-10 w-full flex items-end justify-between">
          <div className="border-b border-slate-300 py-2 text-slate-700 w-full">
            <b>Description</b> : {payment_object?.payment_description}
          </div>
        </div>

        {/**Signature and Stamp */}
        <div className="mt-10 w-full flex items-end justify-between">
          <div className="border-b border-slate-300 py-2 text-slate-700 w-[35%]">
            Signature :{" "}
          </div>
          <div className="rounded border border-dashed border-slate-300 p-2 text-slate-700 w-[35%] h-24 flex justify-center items-center">
            Stamp
          </div>
        </div>

        {/**Notes */}
        <p className="mt-10 text-xs text-slate-500">
          <strong>NB</strong> THIS IS A PROVISIONAL STATEMENT, FOR A FULL
          STATEMENT, PARENTS ARE ENCOURAGED TO COME FORWARD.
        </p>

        {/**Watermark */}
        <span className="absolute bottom-2 right-4 text-slate-400 text-xs italic">
          Powered by: Zonke Tech
        </span>
      </div>
    </div>
  );
};

export default PreviewPrint;
