import { Member } from "./member";

export interface memberState {
    loading: boolean;
    members: Member[];
    member: Member;
  }