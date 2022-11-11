import { FC, useState } from "react";
import Account from "./Tabs/Account";
import Notifications from "./Tabs/Notifications";
import Profile from "./Tabs/Profile";

type Props = {};

const Settings: FC<Props> = () => {
  const savedSelection = () => {
    const data = window.localStorage.getItem("settings_menu");
    return data
      ? JSON.parse(data)
      : [
          { id: 0, name: "Profile", active: true },
          { id: 1, name: "Account", active: false },
          { id: 2, name: "Billing", active: false },
          { id: 3, name: "Security", active: false },
          { id: 4, name: "Notifications", active: false },
        ];
  };
  const [tabs, setTabs] = useState<any>(savedSelection());

  //component =======
  return (
    <div
      className={`w-full h-full min-h-[100%] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-blue-100 p-4 pt-6 relative space-y-4`}
    >
      <div className="h-[5rem] w-full overflow-hidden flex flex-col justify-between">
        <h1 className="text-2xl text-slate-700 font-bold">Settings</h1>
        <div className="h-10 w-full pt-1 bg-inherit border-b border-slate-400 text-sm text-slate-600">
          {tabs?.length >= 1 &&
            tabs.map((tab: any) => {
              return (
                <button
                  onClick={() => {
                    setTabs((prev: any) =>
                      [
                        ...prev
                          .filter((data: any) => data?.name !== tab?.name)
                          ?.map((data: any) => ({ ...data, active: false })),
                        { ...tab, active: true },
                      ]?.sort((a: any, b: any) => a.id - b.id)
                    );

                    //Sycn Local
                    window.localStorage.setItem(
                      "settings_menu",
                      JSON.stringify(
                        [
                          ...tabs
                            .filter((data: any) => data?.name !== tab?.name)
                            ?.map((data: any) => ({ ...data, active: false })),
                          { ...tab, active: true },
                        ]?.sort((a: any, b: any) => a.id - b.id)
                      )
                    );
                  }}
                  key={tab?.id}
                  className={`h-full w-28 bg-inherit focus:outline-none outline-none ${
                    tab?.active ? "border-b-4 border-blue-600" : ""
                  }`}
                >
                  {tab?.name}
                </button>
              );
            })}
        </div>
      </div>

      {/**Tabs Content */}
      <div className="w-full h-[calc(100%-6rem)] bg-inherit overflow-hidden">
        {tabs.filter((tab: any) => tab.active)[0]?.name === "Profile" && (
          <Profile />
        )}
        {tabs.filter((tab: any) => tab.active)[0]?.name === "Notifications" && (
          <Notifications />
        )}
        {tabs.filter((tab: any) => tab.active)[0]?.name === "Account" && (
          <Account />
        )}
      </div>
    </div>
  );
};

export default Settings;
