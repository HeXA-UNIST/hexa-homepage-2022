import React, { useEffect, useState } from 'react';

import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import Stack from '@mui/material/Stack';

import '../Home/home.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonalUid, selectIsPersonalDataLoaded, selectPersonalEmail, selectPersonalStatus, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack, selectPersonalPower, selectPersonalSns, loadPersonalData, selectPersonalCreatedAt, selectPersonallastLoginAt, selectPersonalPhotoUrl } from '../../features/personal/personal_reducer';
import { Avatar, Typography, Grid, ListItem, ListItemText, Divider, Card, Button, Tooltip } from '@mui/material';
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
import TechStackList from '../../components/TechStacklist';
import { useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';
import LaunchIcon from '@mui/icons-material/Launch';
import CakeIcon from '@mui/icons-material/Cake';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSearchParams } from "react-router-dom";
// import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import InstaIcon from 'assets/img/Instagram_icon.webp';
import TwitterIcon from 'assets/img/twitter_icon.png';
import FacebookIcon from 'assets/img/Facebook_icon.webp';
import { loadPersonalDataFirebase } from 'features/personal/personal';
import { selectIsLoggedIn, selectUser } from 'features/auth/login_reducer';
import { getStorage, ref } from "firebase/storage";
import handleUpload from 'features/upload/uploadImage';
const Profile = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isUidValid, setisUidValid] = useState(false);
    const uid = searchParams.get("uid")
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const personalUid = useSelector(selectPersonalUid);
    const personalName = useSelector(selectPersonalName);
    const personalPower = useSelector(selectPersonalPower);  // common | pro | master
    const personalStatus = useSelector(selectPersonalStatus); // active(활동) | rest(휴면) | glory(명예) | quit(탈퇴) | expel(제명)
    const personalCreatedAt = useSelector(selectPersonalCreatedAt);
    const personallastLoginAt = useSelector(selectPersonallastLoginAt);
    const techList = useSelector(selectPersonalTechStack)
    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    const dispatch = useDispatch();
    const userselectUser = useSelector(selectUser);
    const userUid = userselectUser == null ? null : userselectUser.uid;
    const isMyAccount = userUid == uid;

    const memberFor = (new Date().getTime() - personalCreatedAt)
    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + "/" + mm,
        (dd > 9 ? '' : '0') + "/" + dd
        ].join('');
    };
    useEffect(() => {
        dispatch(loadPersonalData(uid))
    }, []);
    const Name = () => {
        const NameAndIcon = () => {
            const personalProfileImage = useSelector(selectPersonalPhotoUrl);
            const [attachment, setAttachment] = useState(personalProfileImage)
            return (<Box sx={{ width: "100%", minWidth: "50%" }}>
                <Stack direction="row" spacing={2} sx={{

                }}>
                    {attachment == "" ?
                        <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "36px", fontWeight: '900', width: 128, height: 128 }} >{personalName}</Avatar> :
                        <Avatar alt={personalName} src={attachment} sx={{ fontSize: "36px", fontWeight: '900', width: 128, height: 128 }} ></Avatar>
                    }

                    {/* <Box sx={{ fontSize: "36px", mr: 10 }}>{personalName}</Box> */}

                    <Stack sx={{ height: 98 }}>

                        <Typography gutterBottom component="div" sx={{ mt: 4, mb: 2, fontFamily: 'Noto Sans KR', lineHeight: '10px', fontWeight: '500', fontSize: "34px" }}>
                            {personalName}
                        </Typography>

                        <Stack direction="row" sx={{
                        }}>
                            <CakeIcon sx={{ width: "18", height: "18px", color: "#6A737C" }} />
                            <Typography sx={{ fontSize: "14px", color: "#6A737C" }}>
                                {`가입 날짜, ${new Date(parseInt(personalCreatedAt)).yyyymmdd()}`}
                            </Typography>


                            <AccessTimeIcon sx={{ width: "18", height: "18px", color: "#6A737C" }} />
                            <Typography sx={{ fontSize: "14px", color: "#6A737C" }}>
                                {`최근 방문, ${new Date(parseInt(personallastLoginAt)).yyyymmdd()}`}
                            </Typography>
                            {isMyAccount ?
                                <Box sx={{ flexGrow: 0 }}>
                                    <Button size="big" variant="outlined" onClick={() => navigate('/editProfile', { replace: true })}
                                        sx={{ ml: 3, fontWeight: 900, p: 0, width: '10em' }}>
                                        편집하기</Button>
                                </Box> : <></>}
                        </Stack>
                        <StatusAndPower />
                    </Stack>
                </Stack>


            </Box>)
        }
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
                        return (<AccountBoxIcon sx={{ width: 24, height: 24, color: Powercolor }} />);
                    case "pro":
                        return (<SupervisorAccountIcon sx={{ width: 24, height: 24, color: Powercolor }} />);
                    case "master":
                        return (<AdminPanelSettingsIcon sx={{ width: 24, height: 24, color: Powercolor }} />);
                    default:
                        break;
                }
            }
            const StatusIcon = () => {
                switch (personalStatus) {
                    case "active":
                        return (<CheckBoxIcon sx={{ width: 24, height: 24, color: Statuscolor }} />);
                    case "quit":
                        return (<HotelIcon sx={{ width: 24, height: 24, color: Statuscolor }} />);
                    case "rest":
                        return (<RemoveCircleIcon sx={{ width: 24, height: 24, color: Statuscolor }} />);
                    case "glory":
                        return (<MilitaryTechIcon sx={{ width: 24, height: 24, color: Statuscolor }} />);
                    case "expel":
                        return (<BlockIcon sx={{ width: 24, height: 24, color: Statuscolor }} />);
                    default:
                        break;
                }
            }
            return (
                <Box>
                    <Stack direction="row" >
                        <PowerIcon />
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, color: Powercolor, fontFamily: 'Noto Sans KR', }}>
                            {personalPower}
                        </Typography>
                        <StatusIcon />
                        <Typography sx={{ fontSize: "16px", fontWeight: 500, color: Statuscolor, fontFamily: 'Noto Sans KR', }}>
                            {personalStatus}
                        </Typography>
                    </Stack>
                </Box >)
        }
        return (
            <Box sx={{ Width: '100%' }}>
                <Stack direction='row' spacing={2}>
                    <NameAndIcon />
                </Stack>
            </Box>
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
            <Box sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: "21px", fontWeight: 500, fontFamily: 'Noto Sans KR', color: "#232629" }}>
                    프로필 메세지
                </Typography>
                <CardContent>
                    <Typography variant="body2">
                        {personalIntroduction}
                    </Typography>
                </CardContent>
            </Box>

        )
    }
    const Email = () => {
        const personalEmail = useSelector(selectPersonalEmail);
        return (
            <Box sx={{ width: '100%' }}>
                <Stack direction="row">
                    <EmailIcon sx={{ width: '21px', height: '21px' }} />
                    <Typography variant="body2" sx={{ fontSize: '16px' }}>
                        {personalEmail}
                    </Typography>
                </Stack>

            </Box>
        )
    }
    const SNS = () => {
        const personalSns = useSelector(selectPersonalSns);
        const SnsIcon = (props) => {
            //console.log(props.snsLink)
            const snsLink = props.snsLink;
            if (snsLink.includes('https://www.facebook.com/')) {
                return (
                    <Button onClick={() => window.open(snsLink, '_blank')}>
                        <Tooltip title={snsLink} placement="top">
                            <Avatar sx={{ width: 60, height: 60 }} src={FacebookIcon} variant="rounded" onClick={() => window.open(snsLink, '_blank')} />
                        </Tooltip>
                    </Button>

                );
            } else if (snsLink.includes('https://www.instagram.com/')) {
                return (
                    <Button onClick={() => window.open(snsLink, '_blank')}>
                        <Tooltip title={snsLink} placement="top">
                            <Avatar sx={{ width: 60, height: 60 }} src={InstaIcon} variant="rounded" onClick={() => window.open(snsLink, '_blank')} />
                        </Tooltip>
                    </Button>
                )

            }
            else if (snsLink.includes('https://github.com')) {
                return (<Button onClick={() => window.open(snsLink, '_blank')}>
                    <Tooltip title={snsLink} placement="top">
                        <GitHubIcon sx={{ width: 60, height: 60, color: '#232629' }} onClick={() => window.open(snsLink, '_blank')} />
                    </Tooltip>
                </Button>);

            }
            else if (snsLink.includes('https://twitter.com/')) {
                return (<Button onClick={() => window.open(snsLink, '_blank')}>
                    <Tooltip title={snsLink} placement="top">
                        <Avatar sx={{ width: 60, height: 60 }} src={TwitterIcon} variant="rounded" />
                    </Tooltip>
                </Button>)
            }
            else {
                return (
                    <Button onClick={() => window.open(snsLink, '_blank')}>
                        <Tooltip title={snsLink} placement="top">
                            <LaunchIcon sx={{ width: 60, height: 60 }} onClick={() => window.open(snsLink, '_blank')} />
                        </Tooltip>
                    </Button>

                );
            }
        }
        return (
            <Box sx={{ Width: '100%' }}>
                <Typography sx={{ fontSize: "21px", fontWeight: 500, fontFamily: 'Noto Sans KR', color: "#232629" }}>
                    SNS 계정
                </Typography>
                <Stack direction="row" spacing={2}>
                    {personalSns.map((sns) => (
                        <Box key={sns}>
                            <SnsIcon snsLink={sns} />
                        </Box>
                    ))}
                </Stack>
            </Box>
        )
    }
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            {isPersonalDataLoaded ?
                <Stack direction="row" spacing={2} sx={{ ml: "50px", mr: "80px" }}>
                    <Stack sx={{ mt: 10, ml: 2, minWidth: '28%' }} spacing={2}>
                        <Name />
                        <Email />
                        <ProfileMessage />

                        <SNS />
                        <Typography sx={{ fontSize: "21px", fontWeight: 500, fontFamily: 'Noto Sans KR', color: "#232629" }}>
                            기술 스택
                        </Typography>
                        <TechStackList techList={techList} />
                        <ProjectList />
                    </Stack>
                    {/* <TechStackList />
                    <ProjectList /> */}
                </Stack>
                :
                <Box sx={{ mt: 10, fontSize: "28px" }}>Loading</Box>}
        </div>
    )
}
export default Profile;