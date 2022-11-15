import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadProjectList, selectProjectList } from "../../features/project/project_reducer";
import ResponsiveAppBar from "../Home/ResponsiveAppbar";
import { Divider, ImageList, ListItemButton, ListItemText, Typography } from "@mui/material";

const Project = () => {
    const dispatch = useDispatch();
    const projectList = useSelector(selectProjectList);

    useEffect(() => {
        dispatch(loadProjectList());
    }, [dispatch]);
    return (
        <div>
            <ProjectList projectList={projectList} />
        </div>
    )
}
const ProjectItem = (props) => {
    const project = props.project;
    const dispatch = useDispatch();

    // List of string to string
    const listToString = (li) => {
        let result = "[ ";
        li.forEach((ss) => {
            result += ss + ", ";
        });
        return result.substring(0, result.length - 2) + " ]";
    }

    // member list to string
    const memberListToString = (li) => {
        let result = "[ ";
        li.forEach((member) => {
            result += "( " + member.uid + ", " + (member.pro ? "pro" : "not pro") + " )\n";
        });
        return result.substring(0, result.length - 1) + " ]";
    }
    const startDateText = `시작: ${new Date(parseInt(project.startDate)).toLocaleDateString()}`
    const endDateText = `종료: ${project.endDate ? new Date(parseInt(project.endDate)).toLocaleDateString() : "null"}`
    return (
        <div>
            <ListItemButton key={project.id} sx={{ width: "100%", height: 300 }}>
                <ListItemText primary={
                    <>
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="h5"
                    color="text.primary"
                    >
                    {project.name}
                    </Typography>
                    <Divider />
                    </>
                }
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {startDateText}
                            </Typography>
                            {endDateText}
                            <br />
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {listToString(project.techStack)}
                            </Typography>
                        </>
                    }
                />
            </ListItemButton>
            <Divider />
            {/* <div id="title-bar">
                <h3>name : {project.name}

                </h3>
            </div>
            <p>id : {project.id}</p>
            <p>startDate: {new Date(parseInt(project.startDate)).toLocaleDateString()}</p>
            <p>endDate: {project.endDate ? new Date(parseInt(project.endDate)).toLocaleDateString() : "null"}</p>
            <p>techStack: {listToString(project.techStack)}</p>
            <p>content: {project.content}</p>
            <p>links: {listToString(project.links)}</p>
            <p>thumbnailUrl: {project.thumbnailUrl}</p>
            <p>members: {memberListToString(project.members)}</p> */}
        </div>
    );
};

const ProjectList = (props) => {
    const projectList = props.projectList;
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            <ImageList sx={{ width: '90%', height: "90%", ml: 5, mt: 10 }} cols={3} rowHeight={164}>
                {projectList.map((project) => {
                    return <ProjectItem project={project} key={project.id} />
                })}
            </ImageList>
        </div>
    );
}
export default Project;