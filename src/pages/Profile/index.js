import React, { useEffect, useState } from 'react';

import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import Stack from '@mui/material/Stack';

import '../Home/home.css';
import { useSelector } from 'react-redux';
import { selectIsPersonalDataLoaded, selectPersonalEmail, selectPersonalStatus, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack, selectPersonalPower, selectPersonalSns } from '../../features/personal/personal_reducer';
import { Avatar, Typography, Grid, ListItem, ListItemText, Divider, Card, Button} from '@mui/material';
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
import CardActions from '@mui/material/CardActions';
import TechStackList from './TechStacklist';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    const Name = () => {
        const NameAndIcon = () => {
            return (<Box >
                <Stack direction="row" spacing={2}>
                    <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "18px", fontWeight: '900', width: 80, height: 80 }} >{personalName}</Avatar>
                    {/* <Box sx={{ fontSize: "36px", mr: 10 }}>{personalName}</Box> */}
                    <Box sx={{ height: 98 }}>
                        <Typography gutterBottom variant="h3" component="div" sx={{ mt: 5, lineHeight: '10px' }}>
                            {personalName}
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
            </Box>)
        }
        const personalName = useSelector(selectPersonalName);
        const personalPower = useSelector(selectPersonalPower);  // common | pro | master
        const personalStatus = useSelector(selectPersonalStatus); // active(활동) | rest(휴면) | glory(명예) | quit(탈퇴) | expel(제명)
        const StatusAndPower = () => {
            const PowerIcon = () => {
                switch (personalPower) {
                    case "common":
                        return (<AccountBoxIcon sx={{ width: 30, height: 30 }} />);
                    case "pro":
                        return (<SupervisorAccountIcon sx={{ width: 30, height: 30 }} />);
                    case "master":
                        return (<AdminPanelSettingsIcon sx={{ width: 30, height: 30 }} />);
                    default:
                        break;
                }
            }
            const StatusIcon = () => {
                switch (personalStatus) {
                    case "active":
                        return (<CheckBoxIcon sx={{ width: 30, height: 30 }} />);
                    case "quit":
                        return (<HotelIcon sx={{ width: 30, height: 30 }} />);
                    case "rest":
                        return (<RemoveCircleIcon sx={{ width: 30, height: 30 }} />);
                    case "glory":
                        return (<MilitaryTechIcon sx={{ width: 30, height: 30 }} />);
                    case "expel":
                        return (<BlockIcon sx={{ width: 30, height: 30 }} />);
                    default:
                        break;
                }
            }
            return (
                <Box>
                    <ListItem
                        secondaryAction={
                            <PowerIcon />
                        }
                    >
                        <ListItemText primary={personalPower} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <StatusIcon />
                        }
                    >
                        <ListItemText primary={personalStatus} />
                    </ListItem>
                    <Divider />
                    {/* <Stack direction="row" spacing={1}>
                    <Typography gutterBottom variant="h6" component="div" xs={4}>
                        {personalPower}
                    </Typography>
                    <PowerIcon />
                </Stack>
                <Stack direction="row" spacing={1}>
                <Typography gutterBottom variant="h6" Box sx={{ color: 'error.main' }} component="div" xs={4}>
                    {personalStatus}
                </Typography>
                <StatusIcon /> </Stack>*/}
                </Box >)
        }
        return (
            <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={2}>
                    <NameAndIcon />
                    <Divider orientation="vertical" flexItem />
                    <StatusAndPower />
                </Stack>
            </Box>
        )

    }
    const ProfileMessage = () => {
        const personalIntroduction = useSelector(selectPersonalIntroduction);
        return (
            <Card sx={{ maxWidth: 380, height:150 }}>
                <CardContent>
                    <Typography variant="body2">
                        {personalIntroduction}
                    </Typography>
                </CardContent>
            </Card>

        )
    }
    const Email = () => {
        const personalEmail = useSelector(selectPersonalEmail);
        return (
            <Card sx={{ maxWidth: 380, height:60 }}>
                <CardContent>
                    <Typography variant="body2">
                        {personalEmail}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    const SNS = () => {
        const personalSns= useSelector(selectPersonalSns);
        return (
            <Card sx={{ maxWidth: 380, height:80 }}>
                <CardContent>
                    <Typography variant="body2">
                        {personalSns}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            {isPersonalDataLoaded ?
                <Stack direction="row" spacing={2}>
                    <Stack sx={{ mt: 10, ml: 2 }} spacing={2}>
                        <Name />
                        <ProfileMessage />
                        <Email />
                        <SNS />
                        <Button size="small" onClick={()=>navigate('/editProfile', { replace: true})} sx={{width:30}}>편집하기</Button>
                    </Stack> 
                    <TechStackList />
                    
                </Stack>
                : 
                <></>}
        </div>
    )
}
export default Profile;