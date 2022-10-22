import UserSlice from "./Slices/UserSlice";
import NotificationsSlice from "./Slices/NotificationsSlice";
import SettingsSlice from "./Slices/SettingsSlice";
import SchoolSettingsSlice from "./Slices/SchoolSettingsSlice";
import School_DataSlice from "./Slices/School_DataSlice";

const rootReducer = {
  UserInfo: UserSlice,
  NotificationsData: NotificationsSlice,
  SettingsData: SettingsSlice,
  SchoolSettings: SchoolSettingsSlice,
  SchoolData: School_DataSlice,
};

export default rootReducer;
