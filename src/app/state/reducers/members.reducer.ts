import { createReducer, on } from '@ngrx/store';
import { Member } from 'src/app/shared/interfaces/member';
import { memberState } from 'src/app/shared/interfaces/members.state';
import { loadedMembers, loadMembers } from '../actions/members.actions';


export const initialState: memberState = {
    loading: false,
    members: {} as Member[]
}

export const membersReducer = createReducer(
    initialState,
    on(loadMembers, (state) => {
        return { ...state, loading: true } 
    }),
    on(loadedMembers, (state, {members}) => {
        return { ...state, loading: false, members}
    })
);