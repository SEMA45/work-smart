import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TbChartArcs3 } from "react-icons/tb";
import { numberWithSpaces } from "../../Reusable Functions/Functions";

type Props = {};

const Summary: FC<Props> = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.SchoolSettings.selectedCurrency
  );
  const selectedTerm = useSelector(
    (state: RootState) => state.SchoolSettings.selectedTerm
  );
  const students = useSelector((state: RootState) => state.SchoolData.students);
  const payment_data = useSelector(
    (state: RootState) => state.SchoolData.payments_record
  );
  const credits_data = useSelector(
    (state: RootState) => state.SchoolData.credits_record
  );

  //Component
  return (
    <div className="col-span-1 rounded bg-white min-h-[22rem] h-[22rem] lg:h-full lg:row-span-1 border border-blue-200 overflow-hidden">
      <div className="h-12 w-full bg-slate-100 flex items-center justify-between px-4 text-lg font-medium text-gray-600">
        <span>Summary</span>
        <TbChartArcs3 className="text-xl" />
      </div>
      <div className="w-full h-[calc(100%-3rem)] grid grid-rows-6 p-4 text-sm text-gray-700 font-medium">
        {[
          { name: "Total Students", value: numberWithSpaces(students?.length) },
          {
            name: "Paid Students",
            value: numberWithSpaces(
              Array.from(
                new Set(
                  payment_data
                    ?.filter((data: any) =>
                      selectedTerm?.some((term: any) =>
                        term
                          ?.replace(/\s|\(|\)/gi, "")
                          ?.toLowerCase()
                          ?.includes(
                            data?.term_ref
                              ?.replace(/\s|\(|\)/gi, "")
                              ?.toLowerCase()
                          )
                      )
                    )
                    ?.map((data: any) => data?.student_name)
                )
              )?.length
            ),
          },
          {
            name: "Unpaid Students",
            value: numberWithSpaces(
              Array.from(
                new Set(
                  credits_data
                    ?.filter((data: any) =>
                      selectedTerm?.some((term: any) =>
                        term
                          ?.replace(/\s|\(|\)/gi, "")
                          ?.toLowerCase()
                          ?.includes(
                            data?.term_ref
                              ?.replace(/\s|\(|\)/gi, "")
                              ?.toLowerCase()
                          )
                      )
                    )
                    ?.map((data: any) => data?.student_name)
                )
              )?.length
            ),
          },
          {
            name: "Paid Amount",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                (
                  selectedCurrency?.rate_multiplier *
                  Number(
                    payment_data
                      ?.filter((data: any) =>
                        selectedTerm?.some((term: any) =>
                          term
                            ?.replace(/\s|\(|\)/gi, "")
                            ?.toLowerCase()
                            ?.includes(
                              data?.term_ref
                                ?.replace(/\s|\(|\)/gi, "")
                                ?.toLowerCase()
                            )
                        )
                      )
                      ?.map((data: any) => data?.equivalent_amount_usd)
                      ?.reduce(
                        (accum: any, value: any) =>
                          Number(accum) + Number(value),
                        0
                      )
                  )
                )?.toFixed(2)
              ),
          },
          {
            name: "Outstanding",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                (
                  selectedCurrency?.rate_multiplier *
                  Number(
                    credits_data
                      ?.filter((data: any) =>
                        selectedTerm?.some((term: any) =>
                          term
                            ?.replace(/\s|\(|\)/gi, "")
                            ?.toLowerCase()
                            ?.includes(
                              data?.term_ref
                                ?.replace(/\s|\(|\)/gi, "")
                                ?.toLowerCase()
                            )
                        )
                      )
                      ?.map((data: any) => data?.credit_amount_usd)
                      ?.reduce(
                        (accum: any, value: any) =>
                          Number(accum) + Number(value),
                        0
                      )
                  )
                )?.toFixed(2)
              ),
          },
          {
            name: "Total Balance",
            value:
              selectedCurrency?.symbol +
              " " +
              numberWithSpaces(
                Number(
                  credits_data
                    ?.filter((data: any) =>
                      selectedTerm?.some((term: any) =>
                        term
                          ?.replace(/\s|\(|\)/gi, "")
                          ?.toLowerCase()
                          ?.includes(
                            data?.term_ref
                              ?.replace(/\s|\(|\)/gi, "")
                              ?.toLowerCase()
                          )
                      )
                    )
                    ?.map((data: any) => data?.credit_amount_usd)
                    ?.reduce(
                      (accum: any, value: any) => Number(accum) + Number(value),
                      0
                    ) +
                    Number(
                      payment_data
                        ?.filter((data: any) =>
                          selectedTerm?.some((term: any) =>
                            term
                              ?.replace(/\s|\(|\)/gi, "")
                              ?.toLowerCase()
                              ?.includes(
                                data?.term_ref
                                  ?.replace(/\s|\(|\)/gi, "")
                                  ?.toLowerCase()
                              )
                          )
                        )
                        ?.map((data: any) => data?.equivalent_amount_usd)
                        ?.reduce(
                          (accum: any, value: any) =>
                            Number(accum) + Number(value),
                          0
                        )
                    )
                )?.toFixed(2)
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
};

export default Summary;
