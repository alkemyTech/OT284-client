import { userData } from "./userInterface";

export interface userState {
  loading: boolean;
  users: userData;
  error: any;
  success: any;
}
