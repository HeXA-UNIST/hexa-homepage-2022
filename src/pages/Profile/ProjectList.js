import React, { useEffect, useState } from 'react';



import '../Home/home.css';
import { useDispatch, useSelector } from 'react-redux';
import {  selectPersonalTechStack, selectPersonalPower, selectPersonalUid } from '../../features/personal/personal_reducer';
import { ListItem, ListItemText, Divider, Card, Typography} from '@mui/material';
import Box from '@mui/material/Box';

import { FixedSizeList } from 'react-window';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import { loadProjectListByUser, selectProjectList } from '../../features/project/project_reducer';
import { loadPersonalDataFirebase } from 'features/personal/personal';
import { useSearchParams } from 'react-router-dom';
const ProjectList = () => {
    const personalProjectList = useSelector(selectProjectList);
    const dispatch = useDispatch();
    const [isPersonalDataLoaded, setisPersonalDataLoaded] = useState(false);
    const [isMyAccount, setisMyAccount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUidValid, setisUidValid] = useState(false);
    const uid = searchParams.get("uid")
    // console.log(useSelector(loadPersonalDataFirebase(uid)))
    // const dispatch = useDispatch();
    // console.log(dispatch(loadPersonalData(uid)));
    const personalUid = useSelector(selectPersonalUid);
    //setisMyAccount(personalUid == uid);
    const [uidPersonalData, setUidPersonalData] = useState();
    useEffect(() => {
        async function fetchData() {
            const resp = await loadPersonalDataFirebase(uid);
            setUidPersonalData(resp);
            if(resp==null){
                setisUidValid(false);
            }else{
                setisPersonalDataLoaded(true);
                setisUidValid(true);
            }
        }
        fetchData()
        dispatch(loadProjectListByUser);
    }, []);
    // console.log(personalProjectList);
    function renderPersonalProjectList({ item }) {
        return (
            <ListItem
                sx={{ width: 400 }}
            >
                <ListItemText primary={item} />
            </ListItem>
        );
    }
    function renderPersonalProjectLists(props) {
        const { index, style } = props;
        const item = personalProjectList[index].name;
        return (
            <>
            <TransitionGroup>
                <Collapse key={item}>
                    {renderPersonalProjectList({ item })}
                    <Divider/>
                </Collapse>
            </TransitionGroup>
            </>

        );
    }
    return (<div>
        {isPersonalDataLoaded && isUidValid?<Box sx={{ mt: 10 }}>
            <Box className='TechStackTitle'>
                <Typography variant="h5" sx={{color:'black', fontFamily:'Raleway, Arial',fontWeight:900}}component="div" gutterBottom>참여 프로젝트</Typography></Box>
                <Divider/><FixedSizeList
                height={400}
                width={420}
                itemSize={46}
                itemCount={personalProjectList.length}
                overscanCount={5}
            >
                {renderPersonalProjectLists}
            </FixedSizeList>
            <Divider/>
        </Box>:<></>}
    </div>)
}
export default ProjectList;