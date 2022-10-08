import { createAction, props } from '@ngrx/store';
import { Organization } from '../../shared/interfaces/organization';
import { Member } from '../../shared/interfaces/member';

export const loadOrganization = createAction(
  '[Organization View] Load organization'
);

export const loadedOrganization = createAction(
    '[Organization View] Load success',
    props<{organization: Organization}>()
); 

export const loadedOrganizationFailed = createAction(
  '[Organization View] Load failed'
); 

export const loadMembers = createAction(
  '[Organization View] Load members'
);

export const loadedMembers = createAction(
  '[Organization View] Loaded members success',
  props<{members: Member[]}>()
)

export const loadedMembersFailed = createAction(
  '[Organization View] Loaded members failed'
)