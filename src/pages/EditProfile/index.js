import React, { useEffect, useState } from 'react';

import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import Stack from '@mui/material/Stack';

import '../Home/home.css';

import TechStacksSearch from './TechStacksSearch';
import EditInfo from './EditInfo';
import { selectIsLoggedIn } from '../../features/auth/login_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserPersonalData, selectIsPersonalDataLoaded, selectPersonalData } from '../../features/personal/personal_reducer';

const EditProfile = () => {
    const dispatch =useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    useEffect(()=>{
        if(isLoggedIn) dispatch(loadUserPersonalData);
    },[isLoggedIn])
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            {isPersonalDataLoaded?
            <Stack direction="row" spacing={2}>
                <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
                <EditInfo />
                <TechStacksSearch />
            </Stack>:<></>}
        </div>
    )
}
export default EditProfile;