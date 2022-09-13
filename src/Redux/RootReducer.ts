import UserSlice from "./Slices/UserSlice";
import NotificationsSlice from "./Slices/NotificationsSlice";
import TicketsSlice from "./Slices/Tickets_n_Contacts_Slice";
import SettingsSlice from "./Slices/SettingsSlice";
import SchoolSettingsSlice from "./Slices/SchoolSettingsSlice";

const rootReducer = {
  UserInfo: UserSlice,
  NotificationsData: NotificationsSlice,
  Tickets: TicketsSlice,
  SettingsData: SettingsSlice,
  SchoolSettings: SchoolSettingsSlice,
};

export default rootReducer;
