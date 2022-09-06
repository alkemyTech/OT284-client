import { createReducer, on } from '@ngrx/store';
import { Member } from 'src/app/shared/interfaces/member';
import { memberState } from 'src/app/shared/interfaces/members.state';
import { loadMembers } from '../actions/members.actions';


export const initialState: memberState = {
    loading: false,
    members: {} as Member[]
}

export const membersReducer = createReducer(
    initialState,
    on(loadMembers, (state) => {
        return { ...state, loading: true } 
    })
);