import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const { Typography, Box } = require("@mui/material")

const ProjectContentArea = (props) => {
    const { controllerRef, projectRef } = props;
    const [value, setValue] = useState(projectRef.current.content);

    const handleOnChange = (value) => {
        setValue(value);
        projectRef.current.content = value;
        controllerRef.current.notify();
    }

    return (
        <Box sx={{
            ...props.sx,
        }}>
            <Typography fontSize='22px' fontWeight={700}>
                프로젝트 내용
            </Typography>
            <Box sx={{
                mt: '20px',
            }}>
                <MDEditor data-color-mode="light"
                    value={value} onChange={setValue} height={400} visibleDragbar={false} />
            </Box>
        </Box>
    );
}

export default ProjectContentArea;