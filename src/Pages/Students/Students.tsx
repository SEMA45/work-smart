import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { TbSearch, TbTrash, TbSquareCheck, TbSquare } from "react-icons/tb";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { updateStudents_Data } from "../../Redux/Slices/School_DataSlice";
import PreviewPrint from "../../Components/Payment/PreviewPrint";
import UpdateNCreateSt from "../../Components/Student/UpdateNCreateSt";
import ActionPanel from "../../Components/Misc/ActionPanel";

type Props = {};

const Students: FC<Props> = () => {
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [selectedArray, setSelected] = useState<any>([]);
  const [actionLoading, setAction] = useState<boolean>(false);
  const [showPreview, setPreview] = useState<boolean>(false);
  const [gradeValue, setGradeValue] = useState<string>("");
  const [classValue, setClassValue] = useState<string>("");
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const students_data = useSelector(
    (state: RootState) => state.SchoolData.students
  )?.filter(
    (data: any) =>
      data?.student_name
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.gender
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.parent_name
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.parent_type
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.financial_status
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.address
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.grade
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.class_name
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
  );
  const [studentModal, setStudentModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [studentObj, setstudentObj] = useState({
    student_id: "",
    student_name: "",
    school_id: user?.school_id,
    gender: "",
    dob: "",
    grade: "",
    parent_name: "",
    parent_type: "",
    phone: "",
    email: "",
    class_name: "",
    address: "",
    area: "",
    province: "",
    financial_status: "",
    active: true,
  });

  //Delete Function
  const deleteStudent = () => {
    if (selectedArray?.length >= 1) {
      setAction(true);
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=delete_student&schoolID=${
          user?.school_id
        }&data=${selectedArray?.toString()}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSelected([]);
          dispatch(updateStudents_Data(data[0]?.students));
          window.localStorage.setItem(
            "students",
            JSON.stringify(data[0]?.students)
          );
          setAction(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Student(s) deleted successfully",
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
    }
  };

  //Upgrade Grade
  const upgradeGrade = () => {
    setAction(true);
    fetch(
      `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=upgrade_students&schoolID=${
        user?.school_id
      }&grade=${gradeValue}&class_name=${classValue}&data=${selectedArray?.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSelected([]);
        dispatch(updateStudents_Data(data[0]?.students));
        window.localStorage.setItem(
          "students",
          JSON.stringify(data[0]?.students)
        );
        setAction(false);
        setGradeValue("");
        setClassValue("");
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Student(s) grade updated successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
      })
      .catch(() => {
        setAction(false);
        setGradeValue("");
        setClassValue("");
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Failed to update please retry",
              color: "bg-red-200",
              id: new Date().getTime(),
            },
          ])
        );
      });
  };

  const students_list =
    students_data?.length >= 1 &&
    [...students_data]
      ?.sort((a: any, b: any) => (a.grade < b.grade ? -1 : 1))
      ?.map((student: any, index: any) => {
        return (
          <tr
            key={student?.student_id}
            className={`min-h-[3rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative flex justify-between px-4`}
          >
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedArray?.some(
                    (data: any) => data === student?.student_id
                  )
                    ? true
                    : false
                }
                onChange={(e: any) => {
                  if (e.target.checked === true) {
                    if (
                      selectedArray?.some(
                        (data: any) => data === student?.student_id
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
                        student?.student_id,
                      ]);
                    }
                  } else {
                    setSelected((prev: any) => [
                      ...prev?.filter(
                        (data: any) => data !== student?.student_id
                      ),
                    ]);
                  }
                }}
              />
            </td>
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <strong>{student?.student_name}</strong>
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[10%] flex flex-col">
              <span>Grade - {student?.grade}</span>
              <span>Class - {student?.class_name}</span>
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <span>{student?.parent_name}</span>
              <span className="text-slate-500">{student?.parent_type}</span>
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[20%] flex flex-col">
              <span>{student?.phone}</span>
              <span className="text-slate-500 lowercase">{student?.email}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[15%] flex flex-col">
              <span>{student?.financial_status}</span>
            </td>
            {/**Print Or View Statement */}
            <td
              onClick={() => {
                setStudentModal(true);
                setstudentObj(student);
                setEdit(true);
              }}
              className="absolute right-4 top-2.5 h-6 px-3 pt-0.5 bg-blue-200 text-slate-800 rounded-full cursor-pointer"
            >
              <div className="h-full w-fufll flex justify-center items-center lowercase">
                edit
              </div>
            </td>
          </tr>
        );
      });

  //component =======
  return (
    <div
      className={`w-full h-full min-h-[100%] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-blue-100 p-4 relative space-y-4`}
    >
      <nav className="h-12 w-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedArray?.length >= 1) {
                upgradeGrade();
              }
            }}
            className="flex items-center"
          >
            <button
              type="submit"
              className={`bg-blue-600 hover:opacity-75 transition-all text-white text-xs flex items-center justify-center space-x-2 h-10 w-32 rounded-l-md`}
            >
              <span className="pt-1">Update grade</span>
            </button>
            <input
              onChange={(e) => {
                setGradeValue(e.target.value);
              }}
              value={gradeValue}
              type="text"
              name="grade"
              id="grade"
              required
              autoComplete="off"
              placeholder="Grade"
              className="h-10 w-20 px-2 pt-0.5 border-y border-blue-300 outline-none focus:ring-0 focus:outline-none"
            />
            <input
              onChange={(e) => {
                setClassValue(e.target.value);
              }}
              value={classValue}
              type="text"
              name="class_name"
              id="class_name"
              required
              autoComplete="off"
              placeholder="Class "
              className="h-10 w-20 px-2 pt-0.5 rounded-r-md border border-blue-300 outline-none focus:ring-0 focus:outline-none"
            />
          </form>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (selectedArray?.length <= 0) {
                  setSelected(
                    students_data?.map((data: any) => data?.student_id)
                  );
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
              disabled={selectedArray?.length >= 1 ? false : true}
              onClick={() => {
                setActionPanel(true);
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

      {/**Table ========================= */}
      <div className="w-full min-h-[30rem] h-[calc(100%-3.8rem)] bg-white border border-blue-300 rounded-lg overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        <table className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
          <thead className="w-full h-12 bg-slate-100 sticky top-0 z-[99]">
            <tr className="h-full w-full px-4 py-1 flex items-center justify-between text-sm text-slate-700">
              <th className="pt-3 w-[5%] h-full text-left cursor-pointer text-blue-600">
                Select
              </th>
              <th className="pt-3 w-[5%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Index
              </th>
              <th className="pt-3 w-[15%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Student
              </th>
              <th className="pt-3 w-[10%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Grade & Class
              </th>
              <th className="pt-3 w-[15%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Parent
              </th>
              <th className="pt-3 w-[20%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Contacts
              </th>
              <th className="pt-3 w-[15%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Financial Status
              </th>
            </tr>
          </thead>
          <tbody className="h-[calc(100%-3rem)] w-full px-4 text-sm text-slate-700 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            {students_list}
          </tbody>
        </table>
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
      {/**Student */}
      <UpdateNCreateSt
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        studentObj={studentObj}
        setstudentObj={setstudentObj}
        edit={edit}
        setEdit={setEdit}
      />
      {/**Delete Prompt */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        option={"Student"}
        deleteSelected={deleteStudent}
      />
    </div>
  );
};

export default Students;
