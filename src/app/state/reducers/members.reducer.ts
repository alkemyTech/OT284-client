import { createReducer, on } from '@ngrx/store';
import { Member } from 'src/app/shared/interfaces/member';
import { memberState } from 'src/app/shared/interfaces/members.state';
import { loadedMembers, loadMembers, deleteMember, getMemberByIdSuccess, getMemberById, createMember, createdMember, createMemberError, editMember, editedMember, editMemberError } from '../actions/members.actions';


export const initialState: memberState = {
    loading: false,
    members: {} as Member[],
    member: {} as Member,
    error: null
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
        const updatedMembers = state.members.filter((member: any) => member.id !== id);
        return { ...state, members: updatedMembers }
    }),
    on(getMemberById, (state, { id }) => {
        const member = state.members.filter((member) => member.id == id);
        return { ...state, loading: true, members: member }
    }),
    on(createMember, (state) => {
        return { ...state, error: null }
    }),
    on(createdMember, (state) => {
        return { ...state, error: null }
    }),
    on(createMemberError, (state, { error }) => {
        return { ...state, error }
    }),
    on(editMember, (state) => {
        return { ...state, error: null }
    }),
    on(editedMember, (state) => {
        return { ...state, error: null }
    }),
    on(editMemberError, (state, { error }) => {
        return { ...state, error }
    }),
    // on(getMemberByIdSuccess, (state, { member }) => {
    //     return { ...state, member, loading: false }
    // })
);