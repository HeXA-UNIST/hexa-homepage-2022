import React, { useEffect, useState } from 'react';



import '../Home/home.css';
import { useDispatch, useSelector } from 'react-redux';
import {  selectPersonalTechStack, selectPersonalPower, selectPersonalUid } from '../../features/personal/personal_reducer';
import { ListItem, ListItemText, Divider, Card, Typography,Box,Collapse} from '@mui/material';

import { FixedSizeList } from 'react-window';
import { TransitionGroup } from 'react-transition-group';
import { loadProjectListByMember, loadProjectListByUser, selectProjectList } from '../../features/project/project_reducer';

import { useSearchParams } from 'react-router-dom';
const ProjectList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUidValid, setisUidValid] = useState(false);
    const uid = searchParams.get("uid")
    const [isProjectListLoaded, setisProjectListLoaded] = useState(false);
    useEffect(() => {
        dispatch(loadProjectListByMember(uid));
        setisProjectListLoaded(true);
    }, []);
    const personalProjectList = useSelector(selectProjectList);
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
        {isProjectListLoaded?<Box sx={{ mt: 10 }}>
        <Card sx={{ Width: '100%', height: "100%", display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center'}} >
                <Typography variant="h5" sx={{color:'black', fontFamily:'Raleway, Arial',fontWeight:900}}component="div" gutterBottom>참여 프로젝트</Typography></Card>
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