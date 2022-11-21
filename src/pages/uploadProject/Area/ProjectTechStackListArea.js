import { Box, Typography } from "@mui/material";
import TechStackListField from "../components/TechStackListField";

const ProjectTechStackListArea = (props) => {
    const { controllerRef, projectRef } = props;

    const handleOnChange = (techStackList) => {
        projectRef.current.techStack = techStackList;
        controllerRef.current.notify();
    }

    return (
        <Box sx={{
            ...props.sx,
        }}>
            <Typography fontSize='22px' fontWeight={700}>
                프로젝트 기술 스택
            </Typography>
            <TechStackListField
                sx={{
                    mt: '20px',
                }}
                initialTechStackList={projectRef.current.techStack}
                onChange={handleOnChange}
            />
        </Box>
    );
}

export default ProjectTechStackListArea;