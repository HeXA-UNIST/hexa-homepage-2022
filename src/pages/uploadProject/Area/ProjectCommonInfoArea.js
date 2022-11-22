// mui
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import moment from "moment";

import ImageUploadField from "../components/ImageUploadField";
import StyledInputField from "../components/StyledInputField";


const ProjectCommonInfoArea = (props) => {
    const { controllerRef, projectRef } = props;

    const handleNameChange = (value) => {
        projectRef.current.name = value;
        controllerRef.current.notify();
    }

    const handleStartDateChange = (value) => {
        projectRef.current.startDate = moment(value).toDate().getTime();
        controllerRef.current.notify();
    }

    const handleEndDateChange = (value) => {
        projectRef.current.endDate = value ? moment(value).toDate().getTime() : null;
        controllerRef.current.notify();
    }

    const handleImageChange = (value) => {
        projectRef.current.thumnailDataUrl = value;
        controllerRef.current.notify();
    }

    return (
        <Box sx={{
            ...props.sx,
        }}>
            <Typography fontSize='22px' fontWeight={700}>
                프로젝트 기본 정보
            </Typography>
            <Box sx={{ height: '500px', display: 'flex', flexDirection: 'column', mt: '20px' }}>
                <StyledInputField
                    sx={{}}
                    leading="프로젝트 이름"
                    hint='예) New HeXA'
                    onChange={handleNameChange}
                    initialValue={projectRef.current.name}
                />
                <StyledInputField
                    sx={{ mt: '10px' }}
                    leading="프로젝트 시작"
                    type='date'
                    onChange={handleStartDateChange}
                    initialValue={moment(projectRef.current.startDate)}
                />
                <StyledInputField
                    sx={{ mt: '10px' }}
                    leading="프로젝트 끝"
                    useSwitch
                    type='date'
                    initialValue={projectRef.current.endDate ? moment(projectRef.current.endDate) : null}
                    onChange={handleEndDateChange}
                    onActiveChange={(value, date) => {
                        if (!value) {
                            handleEndDateChange(null);
                        } else {
                            handleEndDateChange(date);
                        }
                    }}
                />
                <ImageUploadField
                    sx={{ mt: '10px', flex: '1 0 0', width: '100%' }}
                    onChange={handleImageChange}
                    initialUrl={projectRef.current.thumailUrl == null || projectRef.current.thumailUrl.trim() === '' ? null : projectRef.current.thumailUrl}
                />
            </Box>

        </Box>
    );
}


export default ProjectCommonInfoArea;