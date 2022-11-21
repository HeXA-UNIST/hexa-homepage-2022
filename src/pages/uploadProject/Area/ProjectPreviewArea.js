import { Box, Typography } from "@mui/material";
import ProjectCard from "components/ProjectCard";
import { useEffect, useState } from "react";

const ProjectPreviewArea = (props) => {
    const { controllerRef, projectRef } = props;
    const [_, setState] = useState(null);

    useEffect(() => {
        const listener = () => {
            setState({})
        };
        controllerRef.current.addListener(listener);
        return () => {
            controllerRef.current.removeListener(listener);
        };
    }, [projectRef]);

    return (
        <Box sx={{
            ...props.sx,
        }}>
            <Typography fontSize='22px' fontWeight={700}>
                미리보기
            </Typography>
            <Box sx={{
                mt: '20px',
                width: '100%',
                height: '500px',
                backgroundColor: '#F8F8F8',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProjectCard project={props.projectRef.current} />
            </Box>
        </Box>
    );
}

export default ProjectPreviewArea;