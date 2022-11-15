import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalData, loadUserPersonalData, postUserPersonalData, selectPersonalEmail, selectPersonalIntroduction, selectPersonalName, selectPersonalSns, selectPersonalTechStack } from '../../features/personal/personal_reducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import '../Home/home.css';

import { Avatar } from '@mui/material';

import Input from '@mui/material/Input';

const EditInfo = () => {
    
    const ProfileMessageEditor = (props) => {
        const dispatch = useDispatch();

        let personalIntroduction = useSelector(selectPersonalIntroduction);
        let [introduction, setIntroduction] = useState(personalIntroduction);
        useEffect(() => {
            setIntroduction(personalIntroduction);
            props.onValueChange(personalIntroduction);
        }, [personalIntroduction])


        const handleIntroductionChange = (event) => {
            setIntroduction(event.target.value);
            props.onValueChange(event.target.value);
        };
        return (
            <div>
                <Box>
                    <TextField
                        id="outlined-multiline-static"
                        label="프로필 메시지"
                        sx={{ width: 300 }}
                        multiline
                        rows={4}
                        value={introduction}
                        onChange={handleIntroductionChange}

                    />
                </Box>
            </div>

        )
    }
    const EmailEditor = (props) => {
        const ariaLabel = { 'aria-label': 'description' };
        const dispatch = useDispatch();
        let personalEmail = useSelector(selectPersonalEmail);
        let [email, setEmail] = useState(personalEmail);
        useEffect(() => {
            setEmail(personalEmail);
            props.onValueChange(personalEmail);
        }, [personalEmail])

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
            props.onValueChange(event.target.value);
        };

        return (
            <div>
                <Input value={email} sx={{width:300}}inputProps={ariaLabel} onChange={handleEmailChange}/>
                <Box sx={{ mt: 1, mb: 1 }}>
                </Box>
            </div>
        )
    }
    const SnsEditor = (props) => {
        const ariaLabel = { 'aria-label': 'description' };
        const dispatch = useDispatch();
        let personalSns = useSelector(selectPersonalSns);
        let [sns, setSns] = useState(personalSns.toString().replaceAll(',', '\n'));
        useEffect(() => {
            setSns(personalSns.toString().replaceAll(',', '\n'));
            //console.log(personalSns, sns);
            props.onValueChange(personalSns);
        }, [personalSns])

        const handleSnsChange = (event) => {
            let snsList = event.target.value.split(/\r?\n/);
            console.log(snsList)
            props.onValueChange(snsList);
            console.log(event.target.value);
            setSns(event.target.value);

        };
        const snsListtoString = (snsList) => {
            let snsString = "";
            snsList.forEach((item, index) => {
                snsString += item+"\n";
            })
            return snsString;
        }
        return (
            <div>
                <TextField
                        id="outlined-multiline-static"
                        label="Sns 주소"
                        sx={{ width: 300 }}
                        multiline
                        rows={4}
                        value={sns}
                        onChange={handleSnsChange}

                    />
                {/* <Input value={sns} sx={{width:300}}inputProps={ariaLabel} onChange={handleSnsChange}/> */}
                <Box sx={{ mt: 1, mb: 1 }}>

                </Box>
            </div>
        )
    }

    const ProfileContainer = () => {
        const personalName = useSelector(selectPersonalName);
        return (
            <Stack direction="row" spacing={2}>
                <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "18px", fontWeight: '900', width: 80, height: 80 }} >{personalName}</Avatar>
                <Box sx={{ fontSize: "36px", mr: 10 }}>{personalName}</Box>
                {/* <TechStacksList /> */}
                {/* <PeronalTechStackList/> */}
            </Stack>)
    }
    const dispatch = useDispatch();
    let profileMessageValue= useRef("");
    let emailValue = useRef("");
    
    let snsValue = useRef("");
    const handleOnEmailChange = (value) => {
        emailValue.current = value;
    }
    const handleOnSnsChange = (value) => {
        snsValue.current = value;
    }
    const handleOnProfileMessageChange = (value) => {
        profileMessageValue.current = value;
    }
    const navigate = useNavigate();
    const handleUpload = (event) => {
        dispatch(postUserPersonalData({
            introduction: profileMessageValue.current,
            email: emailValue.current,
            sns: snsValue.current

        }));
        navigate('/Profile'); 
    }

    return (
        <div>
            <Box sx={{ mt: 10, mb: 3, ml: 3 }}>
                <Stack spacing={2}>
                    <ProfileContainer />
                    <ProfileMessageEditor onValueChange={handleOnProfileMessageChange}/>
                    <EmailEditor onValueChange={handleOnEmailChange}/>
                    <SnsEditor onValueChange={handleOnSnsChange}/>
                    <Button variant="outlined" onClick={handleUpload}>저장하기 </Button>
                </Stack>
            </Box>
        </div>
    )
}



export default EditInfo;