import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  editUserData: any;
  userIsEditing = false;
}
