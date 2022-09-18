import { createReducer, on } from '@ngrx/store';
import { Member } from 'src/app/shared/interfaces/member';
import { memberState } from 'src/app/shared/interfaces/members.state';
import { loadedMembers, loadMembers, deleteMember, getMemberByIdSuccess, getMemberById } from '../actions/members.actions';


export const initialState: memberState = {
    loading: false,
    members: {} as Member[],
    member: {} as Member
}

export const membersReducer = createReducer(
    initialState,
    on(loadMembers, (state) => {
        return { ...state, loading: true } 
    }),
    on(loadedMembers, (state, {members}) => {
        return { ...state, loading: false, members}
    }),
    on(deleteMember, (state, { id }) => {
        const updatedMembers = state.members.filter((member: any) => member.data.id !== id);
        return { ...state, members: updatedMembers }
    }),
    on(getMemberById, (state) => {
        return { ...state, loading: true }
    }),
    on(getMemberByIdSuccess, (state, { member }) => {
        return { ...state, member, loading: false }
    })
);