import React, { useEffect, useState } from 'react';

import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import Stack from '@mui/material/Stack';

import '../Home/home.css';
import { useSelector } from 'react-redux';
import { selectIsPersonalDataLoaded, selectPersonalEmail, selectPersonalStatus, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack, selectPersonalPower } from '../../features/personal/personal_reducer';
import { Avatar, Typography, Grid, ListItem, ListItemText, Divider, Card} from '@mui/material';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BlockIcon from '@mui/icons-material/Block';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CardContent from '@mui/material/CardContent';
import { FixedSizeList } from 'react-window';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
const TechStackList = () => {
    const personalTechStack = useSelector(selectPersonalTechStack);
    function renderPersonalTechStack({ item }) {
        return (
            <ListItem
                sx={{ width: 400 }}
            >
                <ListItemText primary={item} />
            </ListItem>
        );
    }
    function renderPersonalTechStacks(props) {
        const { index, style } = props;
        const item = personalTechStack[index]
        return (
            <>
            <TransitionGroup>
                <Collapse key={item}>
                    {renderPersonalTechStack({ item })}
                    <Divider/>
                </Collapse>
            </TransitionGroup>
            </>

        );
    }
    return (<div>
        <Box sx={{ mt: 10 }}>
            <Box className='TechStackTitle'>기술 스택</Box>
            <FixedSizeList
                height={400}
                width={420}
                itemSize={46}
                itemCount={personalTechStack.length}
                overscanCount={5}
            >
                {renderPersonalTechStacks}
            </FixedSizeList>
            <Divider/>
        </Box>
    </div>)
}
export default TechStackList;