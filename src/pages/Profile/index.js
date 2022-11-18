import React, { useEffect, useState } from 'react';

import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import Stack from '@mui/material/Stack';

import '../Home/home.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonalUid, selectIsPersonalDataLoaded, selectPersonalEmail, selectPersonalStatus, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack, selectPersonalPower, selectPersonalSns, loadPersonalData } from '../../features/personal/personal_reducer';
import { Avatar, Typography, Grid, ListItem, ListItemText, Divider, Card, Button } from '@mui/material';
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
import ProjectList from './ProjectList';
import LaunchIcon from '@mui/icons-material/Launch';
import { useSearchParams } from "react-router-dom";
// import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import InstaIcon from 'assets/img/Instagram_icon.webp';
import TwitterIcon from 'assets/img/twitter_icon.png';
import FacebookIcon from 'assets/img/Facebook_icon.webp';
import { loadPersonalDataFirebase } from 'features/personal/personal';
import { selectIsLoggedIn, selectUser } from 'features/auth/login_reducer';
const Profile = () => {
    const navigate = useNavigate();
    //const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    //const [isMyAccount, setisMyAccount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUidValid, setisUidValid] = useState(false);
    const uid = searchParams.get("uid")
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const personalUid = useSelector(selectPersonalUid);
    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    const dispatch = useDispatch();
    const userselectUser = useSelector(selectUser);
    const userUid = userselectUser ==null? null : userselectUser.uid;
    const isMyAccount = userUid == uid;
    //console.log(userUid)
    // useEffect(() => {
    //     dispatch(loadUserPersonalData);
    // }, [isLoggedIn]);
    // const [uidPersonalData, setUidPersonalData] = useState();
    useEffect(() => {
        dispatch(loadPersonalData(uid))
    }, []);
    const Name = () => {
        const NameAndIcon = () => {
            return (<Box sx={{ width: "70%", minWidth: "50%" }}>
                <Stack direction="row" spacing={2} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "18px", fontWeight: '900', width: 80, height: 80 }} >{personalName}</Avatar>
                    {/* <Box sx={{ fontSize: "36px", mr: 10 }}>{personalName}</Box> */}
                    <Box sx={{ height: 98 }}>
                        <Typography gutterBottom variant="h3" component="div" sx={{ mt: 5, lineHeight: '10px', fontFamily: 'Roboto', fontWeight: '700' }}>
                            {personalName}
                        </Typography>
                    </Box>
                </Stack>


            </Box>)
        }
        const personalName = useSelector(selectPersonalName);
        const personalPower = useSelector(selectPersonalPower);  // common | pro | master
        const personalStatus = useSelector(selectPersonalStatus); // active(활동) | rest(휴면) | glory(명예) | quit(탈퇴) | expel(제명)
        const StatusAndPower = () => {
            const Powercolor = () => {
                if (personalPower === 'common') {
                    return 'black';
                } else if (personalPower === 'pro') {
                    return 'blue';
                } else if (personalPower === 'master') {
                    return 'red';
                }
            }
            const Statuscolor = () => {
                if (personalStatus === 'active') {
                    return 'green';
                } else if (personalStatus === 'rest') {
                    return 'gray';
                } else if (personalStatus === 'glory') {
                    return 'gold';
                } else if (personalStatus === 'quit') {
                    return 'black';
                } else if (personalStatus === 'expel') {
                    return 'red';
                }
            }


            const PowerIcon = () => {
                switch (personalPower) {
                    case "common":
                        return (<AccountBoxIcon sx={{ width: 30, height: 30, color: Powercolor }} />);
                    case "pro":
                        return (<SupervisorAccountIcon sx={{ width: 30, height: 30, color: Powercolor }} />);
                    case "master":
                        return (<AdminPanelSettingsIcon sx={{ width: 30, height: 30, color: Powercolor }} />);
                    default:
                        break;
                }
            }
            const StatusIcon = () => {
                switch (personalStatus) {
                    case "active":
                        return (<CheckBoxIcon sx={{ width: 30, height: 30, color: Statuscolor }} />);
                    case "quit":
                        return (<HotelIcon sx={{ width: 30, height: 30, color: Statuscolor }} />);
                    case "rest":
                        return (<RemoveCircleIcon sx={{ width: 30, height: 30, color: Statuscolor }} />);
                    case "glory":
                        return (<MilitaryTechIcon sx={{ width: 30, height: 30, color: Statuscolor }} />);
                    case "expel":
                        return (<BlockIcon sx={{ width: 30, height: 30, color: Statuscolor }} />);
                    default:
                        break;
                }
            }
            return (
                <Box sx={{ width: "40%" }}>
                    <ListItem sx={{ justifyContent: 'center', }}
                        secondaryAction={
                            <PowerIcon />
                        }
                    >
                        <ListItemText primary={<Typography align="left" variant="h7" sx={{ color: Powercolor, width: "40%", fontWeight: 700 }}>
                            {personalPower}
                        </Typography>
                        }

                        />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ justifyContent: 'center' }}
                        secondaryAction={
                            <StatusIcon />
                        }
                    >
                        <ListItemText primary={
                            <Typography variant="h7" align="left" sx={{ color: Statuscolor, width: "40%", fontWeight: 700 }}>{personalStatus}</Typography>
                        } />
                    </ListItem>
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
            <Card sx={{ Width: '100%' }}>
                <Stack direction="row" spacing={2}>
                    <NameAndIcon />
                    <Divider orientation="vertical" flexItem />
                    <StatusAndPower />
                </Stack>
            </Card>
            // <Box sx={{ width: '100%', bgcolor: 'background.paper', border:'0.8px solid rgba(132, 132, 132, 0.47)', borderRadius:'1em' }}>
            //     <Stack direction="row" spacing={2}>
            //         <NameAndIcon />
            //         <Divider orientation="vertical" flexItem />
            //         <StatusAndPower />
            //     </Stack>
            // </Box>
        )

    }
    const ProfileMessage = () => {
        const personalIntroduction = useSelector(selectPersonalIntroduction);
        return (
            <Card sx={{ Width: '100%', height: 150 }}>
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
            <Card sx={{ Width: '100%', height: 60 }}>
                <CardContent>

                    <Stack direction="row" spacing={2}>
                        <EmailIcon />
                        <Typography variant="body2">
                            {personalEmail}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    const SNS = () => {
        const personalSns = useSelector(selectPersonalSns);
        const SnsIcon = (props) => {
            //console.log(props.snsLink)
            const snsLink = props.snsLink;
            if (snsLink.includes('https://www.facebook.com/')) {
                return (<Avatar sx={{ width: 60, height: 60 }} src={FacebookIcon} variant="rounded" onClick={() => window.open(snsLink, '_blank')} />);
            } else if (snsLink.includes('https://www.instagram.com/')) {
                return (<Avatar sx={{ width: 60, height: 60 }} src={InstaIcon} variant="rounded" onClick={() => window.open(snsLink, '_blank')} />)
                // return (<InstagramIcon sx={{ width: 60, height: 60, color: 'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)' }} onClick={() => window.open(snsLink, '_blank')} />);
            }
            else if (snsLink.includes('https://github.com')) {
                return (<GitHubIcon sx={{ width: 60, height: 60 }} onClick={() => window.open(snsLink, '_blank')} />);
            }
            else if (snsLink.includes('https://twitter.com/')) {
                return (<Avatar sx={{ width: 60, height: 60 }} src={TwitterIcon} variant="rounded" onClick={() => window.open(snsLink, '_blank')} />)
            }
            else {
                return (<LaunchIcon sx={{ width: 60, height: 60 }} onClick={() => window.open(snsLink, '_blank')} />);
            }
        }
        return (
            <Card sx={{ Width: '100%', height: 90 }}>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        {personalSns.map((sns) => (
                            <Box key={sns}>
                                <SnsIcon snsLink={sns} />
                            </Box>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            {isPersonalDataLoaded?
                <Stack direction="row" spacing={2}>
                    <Stack sx={{ mt: 10, ml: 2, minWidth: '28%' }} spacing={2}>
                        <Name />
                        <ProfileMessage />
                        <Email />
                        <SNS />
                        {isMyAccount ? <Button size="big" variant="outlined" onClick={() => navigate('/editProfile', { replace: true })} sx={{ width: '10em', fontWeight: 900 }}>편집하기</Button> : <></>}
                    </Stack>
                    <TechStackList />
                    <ProjectList />
                </Stack>
                :
                <Box sx = {{mt:10, fontSize:"28px"}}>Bad request</Box>}
        </div>
    )
}
export default Profile;