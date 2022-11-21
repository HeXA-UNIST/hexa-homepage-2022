// react
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

// mui
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

import ResponsiveAppBar from 'pages/Home/ResponsiveAppbar';
import ProjectCommonInfoArea from './Area/ProjectCommonInfoArea';
import ProjectPreviewArea from './Area/ProjectPreviewArea';
import ProjectTechStackListArea from './Area/ProjectTechStackListArea';
import ProjectMemberArea from './Area/ProjectMemberArea';
import ProjectContentArea from './Area/ProjectContentArea';

import { loadProjectDataFirebase } from 'features/project/project';
import { firebaseAuth } from 'app/firebase';
import handleUploadimg from 'features/upload/uploadImage';


export const activityContentMaxWidth = 1020;
export const activityMinPadding = 45;

class ProjectDataFlowController {
    constructor() {
        this.listener = [];
    }
    addListener(listener) {
        this.listener.push(listener);
    }
    removeListener(listener) {
        this.listener = this.listener.filter((l) => l !== listener);
    }
    notify() {
        this.listener.forEach((listener) => listener());
    }
}

const createNewProjectData = () => {
    return {
        name: "HeXA Project",
        id: "",
        startDate: new Date().getTime(), // new Date(startDate) 으로 Date 객체로 변환 가능, new Date().getTime() 으로 startDate로 변환 가능
        endDate: null, // 위와 같은 방식
        techStack: ['python'],
        members: firebaseAuth.currentUser != null ? [
            {
                uid: firebaseAuth.currentUser.uid,
                pro: true,
            }
        ] : [],
        content: "**HeXA New Project!!!**",
        links: [],
        thumbnailUrl: "",
    };
}

const UploadProject = (props) => {
    const dispatch = useDispatch();
    const [_, setState] = useState();

    const projectRef = useRef(null);
    const controllerRef = useRef(new ProjectDataFlowController());

    useEffect(() => {
        if (props.projectId) {
            loadProjectDataFirebase(props.projectId).then((projectData) => {
                // TODO : handle error case (projectData is null)
                projectRef.current = projectData;
                setState({});
            });
        } else {
            projectRef.current = createNewProjectData();
            setState({});
        }
    }, [dispatch, props.projectId]);


    return (
        <Box>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />\
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '110px' }}>
                <Box sx={{ flex: `0 1 ${activityContentMaxWidth}px`, ml: `${activityMinPadding}px`, mr: `${activityMinPadding}px` }}>
                    <Typography fontSize='36px' fontWeight={800}>
                        새 프로젝트 만들기
                    </Typography>
                    {projectRef.current &&
                        <Box>
                            <Box
                                sx={{
                                    mt: '60px',
                                    width: '100%',
                                    display: 'flex', flexDirection: 'row', justifyContent: 'start',
                                    flexWrap: 'wrap', gap: '60px 50px'
                                }}
                            >
                                <ProjectCommonInfoArea sx={{ flex: '1 1 480px' }} projectRef={projectRef} controllerRef={controllerRef} />
                                <ProjectPreviewArea sx={{ flex: '1 1 480px' }} projectRef={projectRef} controllerRef={controllerRef} />
                            </Box>
                            <ProjectTechStackListArea sx={{ mt: '80px' }} projectRef={projectRef} controllerRef={controllerRef} />
                            <ProjectMemberArea sx={{ mt: '80px' }} projectRef={projectRef} controllerRef={controllerRef} />
                            <ProjectContentArea sx={{ mt: '80px' }} projectRef={projectRef} controllerRef={controllerRef} />
                            <UploadProjectArea sx={{ mt: '40px' }} />
                            <Box sx={{ height: '200px' }} />
                        </Box>
                    }
                </Box>
            </Box>
        </Box >
    );
}

const UploadProjectArea = (props) => {
    const { projectRef } = props;
    const handleOnClick = async () => {
        console.log("upload");
        if (projectRef.current.thumbnailUrl) {

        }
        handleUploadimg()
    }

    return (
        <Box sx={{
            ...props.sx,
            display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center',
        }}>
            <Button variant="contained"
                size='large'
                onClick={handleOnClick}>
                새 프로젝트 만들기
            </Button>
        </Box>
    );
}


export default UploadProject;