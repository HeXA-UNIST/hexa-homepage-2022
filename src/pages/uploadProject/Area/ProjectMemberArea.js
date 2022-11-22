import { Box, Typography } from "@mui/material";
import MemberListField from "../components/MemberListField";

const ProjectMemberArea = (props) => {
    const { controllerRef, projectRef } = props;

    const handleOnChange = (memberList) => {
        projectRef.current.membes = memberList;
        controllerRef.current.notify();
    }

    return (
        <Box sx={{
            ...props.sx,
        }}>
            <Typography fontSize='22px' fontWeight={700}>
                프로젝트 멤버
            </Typography>
            <MemberListField
                sx={{
                    mt: '20px',
                }}
                initialMemberList={projectRef.current.members} 
                onChange={handleOnChange}/>
        </Box>
    );
}

export default ProjectMemberArea;