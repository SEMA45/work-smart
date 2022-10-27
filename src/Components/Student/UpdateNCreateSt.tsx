import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { updateStudents_Data } from "../../Redux/Slices/School_DataSlice";

type Props = {
  studentModal: any;
  setStudentModal: any;
  studentObj: any;
  setstudentObj: any;
  edit: any;
  setEdit: any;
};

const UpdateNCreateSt: FC<Props> = ({
  studentModal,
  setStudentModal,
  setstudentObj,
  studentObj,
  edit,
  setEdit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    //clear fields on complete
    const clear = () => {
      setStudentModal(false);
      setEdit(false);
      setstudentObj({
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
        address: "",
        area: "",
        province: "",
        financial_status: "",
        active: true,
      });
      formRef && formRef.current?.reset();
    };

    if (edit) {
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=edit_student&schoolID=${
          user?.school_id
        }&${JSON.stringify(studentObj)
          ?.toString()
          ?.replace(/,/gim, "&")
          ?.replace(/"|\{|\}/gim, "")
          ?.replace(/:/gim, "=")}`
      )
        .then((res) => res.json())
        .then((data: any) => {
          clear();
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Student Edited successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateStudents_Data(data[0]?.students));
          window.localStorage.setItem(
            "students",
            JSON.stringify(data[0]?.students)
          );
        })
        .catch(() => {
          clear();
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Failed to edit student",
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
    } else {
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=add_student&schoolID=${
          user?.school_id
        }&${JSON.stringify(studentObj)
          ?.toString()
          ?.replace(/,/gim, "&")
          ?.replace(/"|\{|\}/gim, "")
          ?.replace(/:/gim, "=")}`
      )
        .then((res) => res.json())
        .then((data: any) => {
          clear();
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Student Added successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateStudents_Data(data[0]?.students));
          window.localStorage.setItem(
            "students",
            JSON.stringify(data[0]?.students)
          );
        })
        .catch(() => {
          clear();
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Failed to add student",
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
    }
  };

  //companent
  return (
    <div
      className={`bg-slate-900/70 fixed left-0 right-0 -top-6 bottom-0 z-[99999]
       p-6 pt-14 flex justify-center overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar ${
         studentModal ? "" : "hidden"
       }`}
    >
      {/**Close Modal ========== */}
      <button
        disabled={loading}
        onClick={() => {
          setStudentModal(false);
          setEdit(false);
          setstudentObj({
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
            address: "",
            area: "",
            province: "",
            financial_status: "",
            active: true,
          });
        }}
        type="button"
        className="h-6 w-6 absolute top-8 right-3 rounded-sm bg-red-600 text-white text-sm"
      >
        &times;
      </button>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white w-[40rem] min-h-[25rem] h-fit rounded p-6 relative grid grid-cols-2 gap-4"
      >
        <div className="col-span-1 h-full space-y-4">
          {/**Student Name ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Student Name</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  student_name: e.target.value,
                }));
              }}
              value={studentObj?.student_name}
              type="text"
              required
              placeholder="Student Name"
              name="student_name"
              id="student_name"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Gender ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0 relative">
            <legend className="p-1 text-slate-500">Gender</legend>
            <select
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  gender: e.target.value,
                }));
              }}
              required
              name="gender"
              id="gender"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            >
              <option value={studentObj?.gender ? studentObj?.gender : ""}>
                {studentObj?.gender ? studentObj?.gender : "Gender"}
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>
          </fieldset>

          {/**DOB ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Date of birth</legend>
            {studentObj?.dob ? (
              <input
                onChange={(e) => {
                  setstudentObj((prev: any) => ({
                    ...prev,
                    dob: new Date(
                      e.target.value ? e.target.value : ""
                    ).getTime(),
                  }));
                }}
                value={
                  new Date(studentObj?.dob).toLocaleString()?.split(",")[0]
                }
                required
                type="text"
                name="dob"
                id="dob"
                className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none uppercase text-sm text-slate-700"
              />
            ) : (
              <input
                onChange={(e) => {
                  setstudentObj((prev: any) => ({
                    ...prev,
                    dob: new Date(
                      e.target.value ? e.target.value : ""
                    ).getTime(),
                  }));
                }}
                required
                type="date"
                name="dob"
                id="dob"
                className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none uppercase text-sm text-slate-700"
              />
            )}
          </fieldset>

          {/**Grade ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Grade</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  grade: e.target.value,
                }));
              }}
              value={studentObj?.grade}
              type="text"
              required
              placeholder="Student Grade"
              name="grade"
              id="grade"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Class Name ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Class Name</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  class_name: e.target.value,
                }));
              }}
              value={studentObj?.class_name}
              type="text"
              required
              placeholder="Class e.g 2c"
              name="class_name"
              id="class_name"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none text-slate-700"
            />
          </fieldset>

          {/**Fninanccial Status ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0 relative">
            <legend className="p-1 text-slate-500">Financial Status</legend>
            <select
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  financial_status: e.target.value,
                }));
              }}
              required
              name="financial_status"
              id="financial_status"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            >
              <option
                value={
                  studentObj?.financial_status
                    ? studentObj?.financial_status
                    : ""
                }
              >
                {studentObj?.financial_status
                  ? studentObj?.financial_status
                  : "Financial Status"}
              </option>
              <option value="low">low</option>
              <option value="mid">mid</option>
              <option value="high">high</option>
            </select>
          </fieldset>
        </div>

        {/**Other Half ========== */}
        <div className="col-span-1 h-full space-y-4">
          {/**Phone Number ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Phone Number</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              value={studentObj?.phone}
              type="tel"
              required
              placeholder="Phone Number"
              name="phone"
              id="phone"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Email ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Email</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              value={studentObj?.email}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none lowercase text-slate-700"
            />
          </fieldset>

          {/**Address ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Address</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
              value={studentObj?.address}
              type="text"
              required
              placeholder="address"
              name="address"
              id="address"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Area ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Area</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  area: e.target.value,
                }));
              }}
              value={studentObj?.area}
              type="text"
              required
              placeholder="area"
              name="area"
              id="area"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Parent Name ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Parent Name</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  parent_name: e.target.value,
                }));
              }}
              value={studentObj?.parent_name}
              type="text"
              required
              placeholder="Student Name"
              name="parent_name"
              id="parent_name"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>

          {/**Parent Type ========== */}
          <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
            <legend className="p-1 text-slate-500">Parent type</legend>
            <input
              onChange={(e) => {
                setstudentObj((prev: any) => ({
                  ...prev,
                  parent_type: e.target.value,
                }));
              }}
              value={studentObj?.parent_type}
              type="text"
              required
              placeholder="Student Name"
              name="parent_type"
              id="parent_type"
              className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
            />
          </fieldset>
        </div>

        {/**Controls ========== */}
        <div className="w-full flex items-center space-x-4">
          <button
            onClick={() => {
              setStudentModal(false);
              setEdit(false);
              setstudentObj({
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
                address: "",
                area: "",
                province: "",
                financial_status: "",
                active: true,
              });
            }}
            type="button"
            disabled={loading}
            className="h-10 w-32 rounded-sm bg-slate-300 text-slate-700 text-base hover:opacity-80 transition-all pt-1"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="h-10 min-w-[8rem] rounded-sm bg-blue-600 text-slate-50 text-base hover:opacity-80 transition-all px-4 flex items-center justify-center space-x-2 disabled:cursor-not-allowed  disabled:opacity-80"
          >
            {loading && (
              <div className="h-4 w-4 rounded-full border-2 border-t-white border-r-white border-blue-500 animate-spin"></div>
            )}
            <span>{edit ? "Edit" : "Create"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNCreateSt;
