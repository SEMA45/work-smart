import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { TbSearch, TbTrash, TbSquareCheck, TbSquare } from "react-icons/tb";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { updateUsers_Data } from "../../Redux/Slices/School_DataSlice";
import PreviewPrint from "../../Components/Payment/PreviewPrint";
import ActionPanel from "../../Components/Misc/ActionPanel";
import CreateNEditUser from "../../Components/Team & Users/CreateNEditUser";

type Props = {};

const Team: FC<Props> = () => {
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [selectedArray, setSelected] = useState<any>([]);
  const [actionLoading, setAction] = useState<boolean>(false);
  const [showPreview, setPreview] = useState<boolean>(false);
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const team_users = useSelector(
    (state: RootState) => state.SchoolData.users_team
  )?.filter(
    (data: any) =>
      data?.username
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.email
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.role
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, "")) ||
      data?.signIn_status
        ?.toString()
        ?.toLowerCase()
        ?.replace(/\s/gim, "")
        ?.includes(search?.toLowerCase()?.replace(/\s/gim, ""))
  );
  const [teamModal, setteamModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [teamObj, setteamObj] = useState({
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

  //Delete Function
  const deleteTeam = () => {
    if (selectedArray?.length >= 1) {
      setAction(true);
      fetch(
        `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=delete_user&schoolID=${
          user?.school_id
        }&data=${selectedArray?.toString()}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSelected([]);
          dispatch(updateUsers_Data(data[0]?.users_data));
          window.localStorage.setItem(
            "users_team",
            JSON.stringify(data[0]?.users_data)
          );
          setAction(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "User(s) deleted successfully",
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

  const teamList =
    team_users?.length >= 1 &&
    [...team_users]
      ?.sort((a: any, b: any) => (a.grade < b.grade ? -1 : 1))
      ?.map((user: any, index: any) => {
        return (
          <tr
            key={user?.uid}
            className={`min-h-[3.25rem] w-full bg-white hover:opacity-80 hover:bg-slate-100 border-t text-xs capitalize text-slate-600 overflow-hidden tracking-wider border-b snap_childTwo relative flex justify-between px-4`}
          >
            <td className="pt-4 pl-5 w-[5%] h-full text-left flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedArray?.some((data: any) => data === user?.uid)
                    ? true
                    : false
                }
                onChange={(e: any) => {
                  if (e.target.checked === true) {
                    if (
                      selectedArray?.some((data: any) => data === user?.uid)
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
                      setSelected((prev: any) => [...prev, user?.uid]);
                    }
                  } else {
                    setSelected((prev: any) => [
                      ...prev?.filter((data: any) => data !== user?.uid),
                    ]);
                  }
                }}
              />
            </td>
            <td className="pt-4 pl-5 w-[10%] h-full text-left flex items-center">
              {index + 1}
            </td>
            <td className="pt-2 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-12 w-[30%] flex items-center space-x-2">
              <div className="h-8 w-8 pt-1 rounded-lg object-cover object-center border-2 border-blue-300 z-[99] bg-slate-400 text-white text-sm font-medium uppercase flex justify-center items-center">
                <span>{user?.username?.charAt(0)}</span>
              </div>
              <strong>{user?.username}</strong>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[30%] flex flex-col lowercase">
              <span>{user?.email}</span>
            </td>
            <td className="pt-4 text-left p-1 whitespace-nowrap overflow-hidden overflow-ellipsis h-10 w-[20%] flex flex-col">
              <span>{user?.role}</span>
            </td>
            {/**Print Or View Statement */}
            <td
              onClick={() => {
                setteamModal(true);
                setteamObj(user);
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
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (selectedArray?.length <= 0) {
                  setSelected(team_users?.map((data: any) => data?.uid));
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
              <th className="pt-3 w-[10%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Index
              </th>
              <th className="pt-3 w-[30%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Username
              </th>
              <th className="pt-3 w-[30%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Email
              </th>
              <th className="pt-3 w-[20%] h-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="h-[calc(100%-3rem)] w-full px-4 text-sm text-slate-700 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            {teamList}
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
      {/**New Users */}
      <CreateNEditUser
        teamModal={teamModal}
        setteamModal={setteamModal}
        teamObj={teamObj}
        setteamObj={setteamObj}
        edit={edit}
        setEdit={setEdit}
      />
      {/**Delete Prompt */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        option={"User"}
        deleteSelected={deleteTeam}
      />
    </div>
  );
};
export default Team;
