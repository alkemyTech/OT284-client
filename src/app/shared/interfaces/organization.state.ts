import { Organization } from "./organization";
import { Member } from './member';

export interface OrganizationState {
    loading: boolean;
    organization: Organization;
    members: Member[];
}