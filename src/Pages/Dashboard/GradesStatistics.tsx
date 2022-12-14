import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const GradesStatistics: FC<Props> = () => {
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const selectedTerm = useSelector(
    (state: RootState) => state.SchoolSettings.selectedTerm
  );
  const payment_data = useSelector(
    (state: RootState) => state.SchoolData.payments_record
  );
  const credits_data = useSelector(
    (state: RootState) => state.SchoolData.credits_record
  );

  const chartData = useMemo(() => {
    let gradeArray =
      user?.school_type?.toLowerCase() === "primary school"
        ? ["ECD", 1, 2, 3, 4, 6, 7]?.sort((a: any, b: any) => (a > b ? 1 : -1))
        : user?.school_type?.toLowerCase() === "secondary school"
        ? ["Form 1", "Form 2", "Form 3", "Form 4"]?.sort((a: any, b: any) =>
            a > b ? 1 : -1
          )
        : user?.school_type?.toLowerCase() === "high school"
        ? ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"]?.sort(
            (a: any, b: any) => (a > b ? 1 : -1)
          )
        : [];
    return gradeArray?.map((name: any) => ({
      name: name,
      Paid: Number(
        Array.from(
          new Set(
            payment_data
              ?.filter(
                (data: any) =>
                  selectedTerm?.some((term: any) =>
                    term
                      ?.replace(/\s|\(|\)/gi, "")
                      ?.toLowerCase()
                      ?.includes(
                        data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase()
                      )
                  ) && name === data?.grade
              )
              ?.map((data: any) => data?.student_name)
          )
        )?.length
      ),
      Unpaid: Number(
        Array.from(
          new Set(
            credits_data
              ?.filter(
                (data: any) =>
                  selectedTerm?.some((term: any) =>
                    term
                      ?.replace(/\s|\(|\)/gi, "")
                      ?.toLowerCase()
                      ?.includes(
                        data?.term_ref?.replace(/\s|\(|\)/gi, "")?.toLowerCase()
                      )
                  ) && name === data?.grade
              )
              ?.map((data: any) => data?.student_name)
          )
        )?.length
      ),
    }));
  }, [credits_data, payment_data, selectedTerm, user]);

  //Component ===========
  return (
    <div className="h-[22rem] min-h-[22rem] lg:h-full lg:row-span-1 col-span-1 lg:col-span-2 bg-white border border-blue-200 rounded overflow-hidden">
      <div className="h-12 w-full bg-slate-100 flex items-center justify-between px-4 text-lg font-medium text-gray-600">
        <span>Grade Statitics</span>
      </div>
      <div className="w-full h-[calc(100%-3rem)] p-4 flex flex-col justify-end">
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            height={200}
            data={chartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            barGap="6"
            barSize={12}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={true}
              tickMargin={5}
              style={{
                fontSize: "0.7rem",
                fontFamily: "sans-serif",
                fontWeight: "500",
                fill: "#334155",
              }}
            />
            <YAxis />
            <Tooltip cursor={false} />
            <Bar
              dataKey="Paid"
              fill="#2563eb"
              background={{ fill: "#e2e8f0", radius: 20 }}
              radius={20}
            />
            <Bar
              dataKey="Unpaid"
              fill="#60a5fa"
              radius={20}
              background={{ fill: "#e2e8f0", radius: 20 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradesStatistics;
