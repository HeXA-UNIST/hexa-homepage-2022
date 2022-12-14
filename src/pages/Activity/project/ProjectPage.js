// react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import { Box, CircularProgress, Typography } from "@mui/material";

import { TechStackSelectArea } from "./components/TechStackSelectComponent";
import ProjectCard from "components/ProjectCard";
import { activityContentMaxWidth, activityMinPadding } from "..";

import { loadTechStackList, selectIsTechStackListLoaded, selectTechStackList } from "features/tech_stack/tech_stack_reducer";
import { loadProjectList, selectIsProjectListLoaded, selectProjectList } from "features/project/project_reducer";


const ProjectPage = (props) => {
    const dispatch = useDispatch();
    const [techStackFilter, setTechStackFilter] = useState([]);

    useEffect(() => {
        dispatch(loadProjectList());
        dispatch(loadTechStackList);
    }, [dispatch]);

    const handleOnFilterChanged = (selectedTechStackList) => {
        setTechStackFilter(selectedTechStackList);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '110px' }}>
                <Box sx={{ flex: `0 1 ${activityContentMaxWidth}px`, ml: `${activityMinPadding}px`, mr: `${activityMinPadding}px` }}>
                    <ProjectTitleArea />
                    <ProjectFilterArea onChange={handleOnFilterChanged} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Box sx={{
                    mt: '50px',
                    mb: '100px',
                    flex: `0 1 ${activityContentMaxWidth * 8 / 5}px`,
                    p: `50px ${activityMinPadding}px`,
                    backgroundColor: '#F8F8Fa',
                    borderRadius: '20px',
                    ml: `${activityMinPadding}px`,
                    mr: `${activityMinPadding}px`
                }}>
                    <ProjectListArea filter={techStackFilter.length > 0 ? techStackFilter : null} />
                </Box>
            </Box>
        </Box>


    );
}

const ProjectTitleArea = () => {
    return (
        <Box sx={{ mb: '26px' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '36px', lineHeight: '1.8' }}>
                HeXA??? ????????? ????????????
            </Typography>
            <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>
                HeXA???, ????????? ??????????????? ???????????? ???????????? ?????? ???????????????  ???????????? ?????????????????????.
            </Typography>
        </Box>
    );
}

const ProjectFilterArea = (props) => {
    const isTechStackListLoaded = useSelector(selectIsTechStackListLoaded);
    const techStackList = useSelector(selectTechStackList);

    return (
        <Box>
            {isTechStackListLoaded &&
                <TechStackSelectArea items={techStackList} onSelectedChange={(selectedTechStackList) => {
                    if (props.onChange) {
                        props.onChange(selectedTechStackList);
                    }
                }} />
            }
        </Box>
    );
}

const ProjectListArea = (props) => {
    const isProjectListLoaded = useSelector(selectIsProjectListLoaded);
    let projectList = useSelector(selectProjectList);

    if (props.filter) {
        projectList = projectList.filter((project) => {
            for (let i = 0; i < props.filter.length; i++) {
                if (project.techStack.includes(props.filter[i].name)) {
                    return true;
                }
            }
            return false;
        });
    }

    if (!isProjectListLoaded) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
            <CircularProgress />
        </Box>;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '50px 30px',
            justifyContent: 'center',
        }}>
            {projectList.map((project) => {
                return (
                    <ProjectCard key={project.id} project={project} />
                );
            })
            }

        </Box>
    );
}

export default ProjectPage;