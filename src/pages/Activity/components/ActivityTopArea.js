// React
import { useState } from "react";

// Mui
import { Box, Typography, ToggleButtonGroup, ToggleButton, styled } from "@mui/material";
import './style.css';

// Icons 
import DataObjectIcon from '@mui/icons-material/DataObject';
import LightModeIcon from '@mui/icons-material/LightMode';

import { activityContentMaxWidth, activityMinPadding } from "..";


const ActivityTopArea = (props) => {
    const handleActivitySelectChange = (index) => {
        if (props.onActivityChange) {
            props.onActivityChange(index);
        }
    }

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom, #FFFFFFFF, #F6F6F6FF)',
            height: '320px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Box sx={{
                    height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    flex: `0 1 ${activityContentMaxWidth}px`, ml: `${activityMinPadding}px`, mr: `${activityMinPadding}px`
                }}>
                    <Box sx={{ mb: '30px' }}>
                        <Typography component="span" sx={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: "800",
                            fontSize: "60px",
                            marginRight: "10px",
                        }}>HeXA</Typography>
                        <Typography component="span" sx={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: "700",
                            fontSize: "36px",
                            letterSpacing: "0.1em",
                        }}>에서 진행한 활동 탐색하기</Typography>
                    </Box>
                    <ActivityToggleButtons onChange={handleActivitySelectChange} />

                </Box>
            </Box>

        </Box>
    );
}


const ActivityToggleButtons = (props) => {
    // Style of ToggleButtons
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            width: '209px',
            height: '65px',
            fontSize: '16px',
            fontFamily: 'Roboto',
            transitionProperty: 'box-shadow background',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'ease-in-out',
            "&:first-of-type": {
                marginRight: '20px',
            },
            "&.selected": {
                background: "linear-gradient(180deg, #CCDDFF 0%, #BBCCFF 100%)",
                border: "0.8px solid rgba(132, 132, 132, 0.47)",
                boxShadow: "0px 0px 18px 2px rgba(29, 0, 209, 0.25)",
                borderRadius: "0.444rem",
                color: "#0B0B60",
                fontWeight: '600',
            },
            "&.not-selected": {
                background: "#FFFFFF",
                border: "0.8px solid rgba(132, 132, 132, 0.47)",
                borderRadius: "0.444rem",
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '600',
            },
            "&.not-selected:hover": {
                boxShadow: "0px 0px 20px -2px rgba(0, 0, 0, 0.2)",
                background: "#F5F5F8",
            },
            "&.selected:hover": {
                boxShadow: "0px 0px 10px 2px rgba(29, 0, 209, 0.25)",
            },
        },
    }));

    // State of ToggleButtons
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Return JSX
    return (
        <StyledToggleButtonGroup
            value={selectedIndex}
            exclusive
            onChange={(_, index) => {
                if (index !== null) {
                    if (props.onChange) {
                        props.onChange(index);
                    }
                    setSelectedIndex(index);
                }
            }}
        >
            <ToggleButton value={0} className={
                `${selectedIndex === 0 ? 'selected' : 'not-selected'}`}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <DataObjectIcon sx={{ mr: "8px" }} />
                    프로젝트
                </Box>
            </ToggleButton>
            <ToggleButton value={1} className={
                `${selectedIndex === 1 ? 'selected' : 'not-selected'}`}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <LightModeIcon sx={{ mr: "8px" }} />
                    세미나
                </Box>
            </ToggleButton>
        </StyledToggleButtonGroup>
    );
}

export default ActivityTopArea;