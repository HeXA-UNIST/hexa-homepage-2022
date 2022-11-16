import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import ActivityTopArea from './components/ActivityTopArea';
import SeminarPage from './seminar/SeminarPage';

export const activityContentMaxWidth = 1000;
export const activityMinPadding = 40;

const Activity = (props) => {
    const [activityIndex, setActivityIndex] = useState(0);
    const handleOnActivityChange = (index) => {
        setActivityIndex(index);
    }

    return (
        <Box>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            <Box sx={{ mt: '64px' }}>
                <ActivityTopArea onActivityChange={handleOnActivityChange} />
            </Box>
            {activityIndex === 1 && <SeminarPage />}
        </Box>
    );
}

export default Activity;