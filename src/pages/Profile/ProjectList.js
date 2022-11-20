import React, { useEffect, useState } from 'react';



import '../Home/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPersonalTechStack, selectPersonalPower, selectPersonalUid } from '../../features/personal/personal_reducer';
import { ListItem, ListItemText, Divider, Card, Typography, Box, Collapse } from '@mui/material';

import { FixedSizeList } from 'react-window';
import { TransitionGroup } from 'react-transition-group';
import { loadProjectListByMember, loadProjectListByUser, selectProjectList } from '../../features/project/project_reducer';

import { useSearchParams } from 'react-router-dom';
import ProjectCard from 'components/ProjectCard';
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
        const isProjectListEmpty = personalProjectList.length === 0;
        if (isProjectListEmpty) {
            return (
                <>
                    <TransitionGroup>
                        <Collapse key={item}>
                            {renderPersonalProjectList({ item })}
                        </Collapse>
                    </TransitionGroup>
                </>
            )
        }
        else {
            return (
                <>
                    <TransitionGroup>
                        <Collapse key={item}>
                            {renderPersonalProjectList({ item })}
                        </Collapse>
                    </TransitionGroup>
                </>)
        }

    }
    const isProjectListEmpty = personalProjectList.length === 0;
    return (<div>
        {isProjectListLoaded ? <Box>

            <Typography sx={{ fontSize: "21px", fontWeight: 500, fontFamily: 'Noto Sans KR', color: "#232629" }}>
                참여 프로젝트
            </Typography>
            {!isProjectListEmpty?<Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '50px 30px',
                justifyContent: 'center',
            }}>
                {personalProjectList.map((project) => {
                    return (
                        <ProjectCard key={project.id} project={project} />
                    );
                })
                }

            </Box>:<Box><Typography sx={{ fontSize: "21px", fontWeight: 500, fontFamily: 'Noto Sans KR', color: "#232629" }}>
                새 프로젝트에 참여해보세요!
            </Typography></Box>}
        </Box> : <></>}
    </div>)
}
export default ProjectList;