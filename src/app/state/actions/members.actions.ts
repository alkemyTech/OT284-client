import { createAction, props } from '@ngrx/store';
import { Organization } from '../../shared/interfaces/organization';
import { Member } from '../../shared/interfaces/member';


export const loadMembers = createAction(
    '[Members] Load members'
);

export const loadedMembers = createAction(
    '[Members] Loaded success',
    props<{members: Member[]}>()
);