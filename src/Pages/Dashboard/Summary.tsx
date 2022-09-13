import {FC} from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TbChartArcs3 } from "react-icons/tb";
import { numberWithSpaces } from "../../Reusable Functions/Functions";

type Props = {}

const Summary:FC<Props> = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );

  //Component
  return (
    <div className="col-span-1 rounded bg-white min-h-[22rem] h-[22rem] lg:h-full lg:row-span-1 border border-blue-200 overflow-hidden">
      <div className="h-12 w-full bg-blue-200 flex items-center justify-between px-4 text-lg font-medium text-gray-600">
        <span>Summary</span>
        <TbChartArcs3 className="text-xl" />
      </div>
      <div className="w-full h-[calc(100%-3rem)] grid grid-rows-6 p-4 text-sm text-gray-700 font-medium">
        {[
          { name: "Total Students", value: numberWithSpaces(4657) },
          { name: "Paid Students", value: numberWithSpaces(1490) },
          { name: "Owing Students", value: numberWithSpaces(3167) },
          {
            name: "Paid Amount",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                selectedCurrency?.rate_multiplier * Number(20467)
              ),
          },
          {
            name: "Outstanding",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                selectedCurrency?.rate_multiplier * Number(46780)
              ),
          },
          {
            name: "Total Balance",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                selectedCurrency?.rate_multiplier * Number(67247)
              ),
          },
        ].map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full row-span-1 flex justify-between items-center last:border-0 border-b border-gray-200 capitalize"
            >
              <span>{item.name}</span>
              <span className="text-blue-600">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Summary