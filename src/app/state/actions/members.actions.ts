import { createAction, props } from '@ngrx/store';
import { Member } from '../../shared/interfaces/member';


export const loadMembers = createAction(
    '[Members] Load members',
    props<{search: string}>()
);

export const loadedMembers = createAction(
    '[Members] Loaded success',
    props<{members: Member[]}>()
);

export const deleteMember = createAction(
    '[Member Delete] Deleting Member',
    props<{ id: number }>()
)

export const deletedMember = createAction(
    '[Member Delete] Delete success'
)

export const editMember = createAction(
    '[Member Edit] Editing Member',
    props<{ id: number, member: Member }>()
)

export const editedMember = createAction(
    '[Member Edit] Edit success'
)

export const createMember = createAction(
    '[Member Create] Creating Member',
    props<{ member: Member }>()
)

export const createdMember = createAction(
    '[Member Create] Create success'
)

export const getMemberById = createAction(
    '[Member Form] Get Member by id',
    props<{ id: number }>()
)

export const getMemberByIdSuccess = createAction(
    '[Member Form] Get Member by id success',
    props<{ member: Member }>()
)