import { FC, useState } from "react";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import { updateUser } from "../../../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";

type Props = {};

const Profile: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.UserInfo.user);
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [userValue, setValue] = useState<any>(user);
  const [passObj,setPass] = useState<any>({
    oldPass:"",
    newPass:""
  })

  //component
  return (
    <div className="w-full h-full">
      <div className="mt-10 w-full min-h-[7rem] bg-white relative rounded pt-[2rem]">
        <div className="h-14 w-14 rounded-full border-2 border-blue-600 absolute -top-7 left-4 bg-blue-50 flex justify-center items-center text-2xl font-bold text-slate-600 pt-1">
          {user?.username?.charAt(0)}
        </div>
        <div className="flex justify-between items-end px-6">
          <ul className="space-y-0 pt-2">
            <li className="text-sm text-slate-600 font-semibold">
              <span>Name :</span>{" "}
              <span className="font-medium text-slate-500 capitalize">
                {user?.username}
              </span>
            </li>
            <li className="text-sm text-slate-600 font-semibold">
              <span>Access :</span>{" "}
              <span className="font-medium text-slate-500 capitalize">
                {user?.role}
              </span>
            </li>
            <li className="text-sm text-slate-600 font-semibold">
              <span>Email :</span>{" "}
              <span className="font-medium text-blue-600 lowercase">
                {user?.email}
              </span>
            </li>
          </ul>
          <button
            disabled={signingOut}
            onClick={() => {
              setSigningOut(true);
              fetch(
                `https://script.google.com/macros/s/AKfycbzXHls5in39Y_GmlGSUhxMI_VmHvklhFVXyB72A6TkhQOzoRxjboNtZMQYGmuDQGcSTaA/exec?action=signout&email=${user?.email}&uid=${user?.uid}`
              )
                .then((res) => res.json())
                .then((data) => {
                  dispatch(
                    updateAlert([
                      ...alerts,
                      {
                        message: data[0]?.auth.message,
                        color: "bg-green-200",
                        id: new Date().getTime(),
                      },
                    ])
                  );
                  setSigningOut(false);
                  dispatch(updateUser(null));
                  navigate("/login");
                  window.localStorage.clear();
                })
                .catch(() => {
                  dispatch(
                    updateAlert([
                      ...alerts,
                      {
                        message: "Failed to sign out",
                        color: "bg-red-200",
                        id: new Date().getTime(),
                      },
                    ])
                  );
                  setSigningOut(false);
                });
            }}
            className="bg-red-600 text-white text-xs h-8 px-4 rounded-sm flex items-center justify-center space-x-1"
          >
            {signingOut && (
              <div className="h-4 w-4 rounded-full border-2 border-t-white border-r-white border-blue-500 animate-spin"></div>
            )}
            <span>Sign-out</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between my-4 space-x-4">
        <div className="w-2/5 h-[2px] bg-white dark:bg-slate-700"></div>
        <div className="w-1/5 uppercase text-sm font-bold font-sans text-slate-500 dark:text-slate-400 text-center">
          Update Profile
        </div>
        <div className="w-2/5 h-[2px] bg-white dark:bg-slate-700"></div>
      </div>

      {/**Update Account */}
      <div className="w-full h-fit  max-h-[calc(100%-13rem)] bg-white border border-slate-200 rounded-md p-6 grid grid-cols-2 gap-20">
        <form className="w-full h-full col-span-1">
          <div className="text-xs font-bold text-slate-600 uppercase">
            Edit Information
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <label htmlFor="name">
              <span className="text-sm text-slate-500 font-semibold px-1">
                Name
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full h-10 rounded bg-blue-50 text-slate-600 placeholder:text-slate-400 text-xs px-2 p-1 border border-slate-200 focus:ring-0 focuus:outline-none"
                placeholder="Enter fullname"
                value={userValue?.username}
                autoComplete="off"
                onChange={(e) => {
                  setValue((prev: any) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </label>
            <label htmlFor="email">
              <span className="text-sm text-slate-500 font-semibold px-1">
                Email
              </span>
              <input
                type="email"
                name="name"
                id="name"
                className="w-full h-10 rounded bg-blue-50 text-slate-600 placeholder:text-slate-400 text-xs px-2 p-1 border border-slate-200 focus:ring-0 focuus:outline-none"
                placeholder="Enter email"
                value={userValue?.email}
                autoComplete="off"
                onChange={(e) => {
                  setValue((prev: any) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 h-8 w-36 rounded-sm bg-blue-600 text-white text-sm"
          >
            Update Info
          </button>
        </form>

        {/**Update Password */}
        <form className="w-full h-full col-span-1">
          <div className="text-xs font-bold text-slate-600 uppercase">
            Change Password
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <label htmlFor="password">
              <span className="text-sm text-slate-500 font-semibold px-1">
                Old Password
              </span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full h-10 rounded bg-blue-50 text-slate-600 placeholder:text-slate-400 text-xs px-2 p-1 border border-slate-200 focus:ring-0 focuus:outline-none"
                placeholder="Enter your old password"
                autoComplete="off"
                value={passObj?.oldPass}
                onChange={(e) => {
                  setPass((prev: any) => ({
                    ...prev,
                    oldPass: e.target.value,
                  }));
                }}
              />
            </label>
            <label htmlFor="newpass">
              <span className="text-sm text-slate-500 font-semibold px-1">
                New Password
              </span>
              <input
                type="password"
                name="newpass"
                id="newpass"
                className="w-full h-10 rounded bg-blue-50 text-slate-600 placeholder:text-slate-400 text-xs px-2 p-1 border border-slate-200 focus:ring-0 focuus:outline-none"
                placeholder="Enter your new password"
                autoComplete="off"
                value={passObj?.newnpmPass}
                onChange={(e) => {
                  setPass((prev: any) => ({
                    ...prev,
                    newPass: e.target.value,
                  }));
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 h-8 w-36 rounded-sm bg-blue-600 text-white text-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
