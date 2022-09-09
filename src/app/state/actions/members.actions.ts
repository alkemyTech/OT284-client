import { createAction, props } from '@ngrx/store';
import { Member } from '../../shared/interfaces/member';


export const loadMembers = createAction(
    '[Members] Load members'
);

export const loadedMembers = createAction(
    '[Members] Loaded success',
    props<{members: Member[]}>()
);