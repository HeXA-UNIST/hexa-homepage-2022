import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { loadProjectList, selectProjectList } from 'features/project/project_reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTechStacksSearch from './TechStackSearch';

const UploadProject = (props) => {
    const dispatch = useDispatch();
    const projectList = useSelector(selectProjectList);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [techStack, setTechStack] = useState("");
    const [content, setContent] = useState("");
    const [links, setLinks] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [memberList, setMemberList] = useState("");   
    useEffect(() => {
        dispatch(loadProjectList());
    }, [dispatch]);
    const handleNameChange = (text) => {
        setName(text.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date.target.value);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date.target.value);
    };

    const handleTechStackChange = (text) => {
        setTechStack(text.target.value);
    };

    const handleContentChange = (text) => {
        setContent(text.target.value);
    };

    const handleLinksChange = (text) => {
        setLinks(text.target.value);
    };

    const handleThumbnailUrlChange = (text) => {
        setThumbnailUrl(text.target.value);
    };

    const handleSubmit = function (e) {
        e.preventDefault();

        const projectData = {
            name: name,
            startDate: new Date(Date.parse(startDate)).getTime(),
            endDate: endDate === null || endDate === "" ? null : new Date(Date.parse(endDate)).getTime(),
            techStack: techStack.split(",").map((tech) => tech.trim()),
            members: [],
            content: content,
            links: links.split(",").map((link) => link.trim()),
            thumbnailUrl: thumbnailUrl,
        };
        props.onSubmit(projectData);
    };
    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <TextField id="standard-basic" label="프로젝트 이름" variant="standard"
                value={name}
                sx={{ width: '800px', minWidth: '200px', mt: 3, }}
                onChange={handleNameChange} />
                <TextField
                    id="outlined-multiline-static"
                    label="프로젝트 설명"
                    sx={{ width: '800px', mt:3 }}
                    multiline
                    rows={4}
                    onChange={handleContentChange}

                />
                <ProjectTechStacksSearch/>
        </Box>
    );
}

export default UploadProject;