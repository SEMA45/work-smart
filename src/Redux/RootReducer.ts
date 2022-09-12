import UserSlice from "./Slices/UserSlice";
import NotificationsSlice from "./Slices/NotificationsSlice";
import TicketsSlice from "./Slices/Tickets_n_Contacts_Slice";
import SettingsSlice from "./Slices/SettingsSlice";

const rootReducer = {
  UserInfo: UserSlice,
  NotificationsData: NotificationsSlice,
  Tickets: TicketsSlice,
  SettingsData:SettingsSlice
};

export default rootReducer;
