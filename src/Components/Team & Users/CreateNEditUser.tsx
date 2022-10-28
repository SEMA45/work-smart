import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { updateUsers_Data } from "../../Redux/Slices/School_DataSlice";

type Props = {
  teamModal: any;
  setteamModal: any;
  teamObj: any;
  setteamObj: any;
  edit: any;
  setEdit: any;
};

const CreateNEditUser: FC<Props> = ({
  teamModal,
  setteamModal,
  setteamObj,
  teamObj,
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
      setteamModal(false);
      setEdit(false);
      setteamObj({
        uid: "",
        username: "",
        email: "",
        password: "",
        school_name: user?.school_name,
        school_type: user?.school_type,
        role: "",
        profile_url: "",
        signIn_status: false,
      });
      formRef && formRef.current?.reset();
    };

    if (edit) {
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=edit_user&schoolID=${
          user?.school_id
        }&${JSON.stringify(teamObj)
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
                message: "User Edited successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateUsers_Data(data[0]?.users_data));
          window.localStorage.setItem(
            "users_team",
            JSON.stringify(data[0]?.users_data)
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
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=add_user&schoolID=${
          user?.school_id
        }&${JSON.stringify(teamObj)
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
                message: "User Added successfully",
                color: "bg-green-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(updateUsers_Data(data[0]?.users_data));
          window.localStorage.setItem(
            "users_team",
            JSON.stringify(data[0]?.users_data)
          );
        })
        .catch(() => {
          clear();
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Failed to add user",
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
       p-6 pt-20 flex justify-center overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar ${
         teamModal ? "" : "hidden"
       }`}
    >
      {/**Close Modal ========== */}
      <button
        disabled={loading}
        onClick={() => {
          setteamModal(false);
          setEdit(false);
          setteamObj({
            uid: "",
            username: "",
            email: "",
            password: "",
            school_name: user?.school_name,
            school_type: user?.school_type,
            role: "",
            profile_url: "",
            signIn_status: false,
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
        className="bg-white w-[40rem] min-h-[25rem] h-fit rounded p-6 relative"
      >
        {/**User Name ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">User Name</legend>
          <input
            onChange={(e) => {
              setteamObj((prev: any) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
            value={teamObj?.username}
            type="text"
            required
            autoComplete="off"
            placeholder="User Name"
            name="username"
            id="username"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          />
        </fieldset>

        {/**User Email ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">User Email</legend>
          <input
            onChange={(e) => {
              setteamObj((prev: any) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            value={teamObj?.email}
            type="email"
            required
            autoComplete="off"
            placeholder="User Email"
            name="email"
            id="email"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none lowercase text-slate-700"
          />
        </fieldset>

        {/**User Password ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0">
          <legend className="p-1 text-slate-500">User Password</legend>
          <input
            onChange={(e) => {
              setteamObj((prev: any) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            value={teamObj?.password}
            type="password"
            required
            autoComplete="off"
            placeholder="User Password"
            name="password"
            id="password"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          />
        </fieldset>

        {/**Access Role ========== */}
        <fieldset className="w-full h-20 rounded border border-slate-300 p-2 pt-0 relative">
          <legend className="p-1 text-slate-500">Access Role</legend>
          <select
            onChange={(e) => {
              setteamObj((prev: any) => ({
                ...prev,
                role: e.target.value,
              }));
            }}
            required
            name="role"
            id="role"
            className="w-full h-10 rounded focus:border-0 focus:ring-0 focus:outline-none capitalize text-slate-700"
          >
            <option value={teamObj?.role ? teamObj?.role : ""}>
              {teamObj?.role ? teamObj?.role : "Role"}
            </option>
            <option value="admdin">admi</option>
            <option value="regular">regular</option>
          </select>
        </fieldset>

        {/**Controls ========== */}
        <div className="w-full flex items-center space-x-4 mt-4">
          <button
            onClick={() => {
              setteamModal(false);
              setEdit(false);
              setteamObj({
                uid: "",
                username: "",
                email: "",
                password: "",
                school_name: user?.school_name,
                school_type: user?.school_type,
                role: "",
                profile_url: "",
                signIn_status: false,
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

export default CreateNEditUser;
