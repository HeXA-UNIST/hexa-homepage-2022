import { createSlice } from '@reduxjs/toolkit'
import { initialPersonalData, loadPersonalDataFirebase, postPersonalDataFirebase } from './personal';
import { firebaseAuth } from '../../app/firebase';


export const personalSlice = createSlice({
    name: 'personal',
    initialState: {
        uid: "", // 불러온 PersonData에 해당하는 User의 uid
        personalData: initialPersonalData,
    },
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload;
        },
        updatePersonData: (state, action) => {
            state.personalData = { ...state.personalData, ...action.payload };
        },
    },
});

export const { setUid, updatePersonData } = personalSlice.actions;

// 현재 로그인되어 있는 User의 PersonData를 불러오는 Action
export const loadUserPersonalData = (dispatch) => {
    if (firebaseAuth.currentUser == null) {
        return 'error: Not logged in';
    }
    loadPersonalData(firebaseAuth.currentUser.uid)(dispatch);
};

// 특정 Uid의 PersonalData를 불러오는 Action
export const loadPersonalData = (uid) => (dispatch) => {
    loadPersonalDataFirebase(uid).then(
        (data) => {
            dispatch(setUid(uid));
            dispatch(updatePersonData(data));
        }
    );
};

// personalReducer의 State를 firebase에 업로드 하고, dispatch해 갱신. 
export const postPersonalData = (uid, data) => (dispatch) => {
    postPersonalDataFirebase(uid, data).then(
        () => {
            dispatch(setUid(uid));
            dispatch(updatePersonData(data));
        }
    );
}

export const postUserPersonalData = (data) => (dispatch) => {
    if (firebaseAuth.currentUser == null) {

        return 'error: Not logged in';
    }
    postPersonalData(firebaseAuth.currentUser.uid, data)(dispatch);
}



export const selectPersonalUid = (state) => state.personal.uid;
export const selectPersonalData = (state) => state.personal.personalData;

export const selectPersonalPublic = (state) => state.personal.personalData.public;
export const selectPersonalName = (state) => state.personal.personalData.name;
export const selectPersonalTechStack = (state) => state.personal.personalData.techStack;
export const selectPersonalEmail = (state) => state.personal.personalData.email;
export const selectPersonalLinks = (state) => state.personal.personalData.links;
export const selectPersonalSns = (state) => state.personal.personalData.sns;
export const selectPersonalPower = (state) => state.personal.personalData.power;
export const selectPersonalStudentId = (state) => state.personal.personalData.studentId;
export const selectPersonalStatus = (state) => state.personal.personalData.status;
export const selectPersonalIntroduction = (state) => state.personal.personalData.introduction;

export default personalSlice.reducer;