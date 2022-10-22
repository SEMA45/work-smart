import { FC, useState } from "react";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { selectTerm } from "../../Redux/Slices/SchoolSettingsSlice";
import {
  TbCalendarMinus,
} from "react-icons/tb";

interface Props {
}

const TermFilter: FC<Props> = () => {
  const dispatch = useDispatch();
  const periods = useSelector(
    (state: RootState) => state.SchoolSettings.periods_terms
  );
  const selectedTerm = useSelector(
    (state: RootState) => state.SchoolSettings.selectedTerm
  );
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string | any>("");
  const modalRef = useClickOutside(() => {
    setModal(false);
  });

  //Component ==================
  return (
    <div ref={modalRef} className="relative">
      <div
        className={`w-full h-fit bg-inherit flex items-center overflow-hidden relative`}
      >
        <label htmlFor="term" className="">
          <input
            type="search"
            name="term"
            id="term"
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            onFocus={() => {
              setModal(true);
            }}
            className="w-full h-full outline-none focus:outline-none focus:ring-0 border-0 focus:border-0 text-sm bg-inherit placeholder-slate-700 placeholder:!text-xs rounded-sm"
            placeholder="TERM"
          /><TbCalendarMinus className="absolute right-0 top-0.5"/>
        </label>
      </div>

      {/**List ===================== */}
      <div
        className={`${
          modal ? "flex" : "hidden"
        } flex-col items-center p-2 absolute top-8 -left-4 w-full min-w-[10rem] h-[15.5rem] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xl drop-shadow-xl z-[999] text-xs font-semibold dark:text-slate-400 text-slate-800 overflow-hidden rounded`}
      >
        <div className="mt-2 w-full h-full p-2 space-y-2 overflow-hidden overflow-y-scroll">
          <label
            htmlFor="select_all"
            className="w-full flex items-center space-x-2 capitalize"
          >
            {" "}
            <input
              type="checkbox"
              checked={selectedTerm.length === periods?.length ? true : false}
              onChange={() => {
                if (selectedTerm.length <= 0) {
                  dispatch(selectTerm(periods?.map((data: any) => data?.name)));
                  window.localStorage.setItem(
                    "selectedTerm",
                    JSON.stringify(periods?.map((data: any) => data?.name))
                  );
                } else {
                  dispatch(selectTerm([]));
                  window.localStorage.setItem(
                    "selectedTerm",
                    JSON.stringify([])
                  );
                }
              }}
              name="select_all"
              id="select_all"
            />
            <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
              Select All
            </span>
          </label>

          {periods?.filter(
            (term: any) =>
              term?.name
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                ?.includes(search?.toLowerCase()?.replace(/\s/g, ""))
          ).length >= 1 &&
            periods
              ?.filter(
                (term: any) =>
                 term?.name
                    ?.toLowerCase()
                    ?.replace(/\s/g, "")
                    ?.includes(search?.toLowerCase()?.replace(/\s/g, ""))
              )
              ?.map((term: any, index: any) => {
                return (
                  <label
                    key={index}
                    htmlFor="index"
                    className={`w-full flex items-center space-x-2 capitalize`}
                  >
                    {" "}
                    <input
                      type="checkbox"
                      checked={
                        selectedTerm?.find(
                          (data: any) =>
                            data?.toLowerCase()?.replace(/\/s/g, "") ===
                            term?.name?.toLowerCase()?.replace(/\/s/g, "")
                        )? true
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch(selectTerm([
                            ...selectedTerm?.filter(
                              (data: any) =>
                                data?.toLowerCase()?.replace(/\/s/g, "") !==
                                term?.name?.toLowerCase()?.replace(/\/s/g, "")
                            ),
                            term?.name,
                          ]));
                          window.localStorage.setItem(
                            "tickets_filters",
                            JSON.stringify([
                              ...selectedTerm?.filter(
                                (data: any) =>
                                  data?.toLowerCase()?.replace(/\/s/g, "") !==
                                  term?.name?.toLowerCase()?.replace(/\/s/g, "")
                              ),
                              term?.name,
                            ])
                          );
                        } else if (!e.target.checked) {
                          dispatch(selectTerm(
                            selectedTerm?.filter(
                              (data: any) =>
                                data?.toLowerCase()?.replace(/\/s/g, "") !==
                                term?.name?.toLowerCase()?.replace(/\/s/g, "")
                            )
                          ));
                        }

                        window.localStorage.setItem(
                          "tickets_filters",
                          JSON.stringify(
                            selectedTerm?.filter(
                              (data: any) =>
                                data?.toLowerCase()?.replace(/\/s/g, "") !==
                                term?.name?.toLowerCase()?.replace(/\/s/g, "")
                            )
                          )
                        );
                      }}
                      name="index"
                      id="index"
                    />
                    <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                      {term?.name}
                    </span>
                  </label>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default TermFilter;
