import React, { useEffect, useState } from 'react';



import '../Home/home.css';
import { useSelector } from 'react-redux';
import {  selectPersonalTechStack, selectPersonalPower } from '../../features/personal/personal_reducer';
import { ListItem, ListItemText, Divider, Card, Typography} from '@mui/material';
import Box from '@mui/material/Box';

import { FixedSizeList } from 'react-window';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
const TechStackList = () => {
    const personalTechStack = useSelector(selectPersonalTechStack);
    function renderPersonalTechStack({ item }) {
        return (
            <ListItem
                sx={{ width: 400 }}
                secondaryAction={
                    <HowToRegIcon/>
                }
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
            <Box className='TechStackTitle'>
            <Typography variant="h5" sx={{color:'black', fontFamily:'Raleway, Arial',fontWeight:900}}component="div" gutterBottom>기술 스택</Typography></Box>
            <Divider/><FixedSizeList
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