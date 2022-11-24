import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalData, loadUserPersonalData, postUserPersonalData, selectPersonalEmail, selectPersonalUid, selectPersonalIntroduction, selectPersonalName, selectPersonalSns, selectPersonalTechStack, selectPersonalStudentId, selectPersonalPhotoUrl } from '../../features/personal/personal_reducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../Home/home.css';

import { Avatar } from '@mui/material';

import Input from '@mui/material/Input';
import { handleUploadimg } from 'features/upload/uploadImage';


const EditInfo = () => {
    const personalUid = useSelector(selectPersonalUid);
    const NameEditor = (props) => {
        let personalName = useSelector(selectPersonalName);
        const [name, setName] = useState(personalName);
        const dispatch = useDispatch();
        useEffect(() => {
            setName(personalName);
            props.onValueChange(personalName)
        }, [personalName])
        const handleNameChange = (e) => {
            setName(e.target.value);
            props.onValueChange(e.target.value)
        }
        return (
            <div>
                <TextField
                    id="standard-basic"
                    variant="outlined"
                    label="이름(필수)"
                    value={name}
                    sx={{ width: 200 }}
                    onChange={handleNameChange}
                />
            </div>
        )
    }


    const StudentIdEditor = (props) => {
        let personalStudentId = useSelector(selectPersonalStudentId);
        const [studentId, setStudentId] = useState(personalStudentId);
        useEffect(() => {
            setStudentId(personalStudentId);
            props.onValueChange(personalStudentId)
        }, [personalStudentId])
        const handleStudentIdChange = (e) => {
            setStudentId(e.target.value);
            props.onValueChange(e.target.value)
        }
        return (
            <div>
                <TextField id="standard-basic" label="학번(필수)" variant="standard"
                    value={studentId}
                    sx={{ width: 200 }}
                    onChange={handleStudentIdChange} />
            </div>)
    }
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
                <TextField id="standard-basic" label="이메일(필수)" variant="standard"
                    value={email}
                    sx={{ width: 300 }}
                    onChange={handleEmailChange} />
                <Box sx={{ mt: 1, mb: 1 }}>
                </Box>
            </div>
        )
    }
    const SnsEditor = (props) => {

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
                snsString += item + "\n";
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

    const ProfileContainer = (props) => {
        const personalName = useSelector(selectPersonalName);
        const personalProfileImage = useSelector(selectPersonalPhotoUrl);
        const [attachment, setAttachment] = useState(personalProfileImage);

        const [imageUrl, setImageUrl] = useState();
        const dispatch = useDispatch();
        const onChange = (e) => {
            const img = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const { currentTarget: { result } } = finishedEvent;
                setAttachment(result);
                handleUploadimg(img.name, result).then((url) => {
                    setImageUrl(url);
                    dispatch(postUserPersonalData({
                        photo: url
                    }))
                })
            }
            reader.readAsDataURL(img);

        }
        return (
            <Stack direction="row" spacing={2} >
                {attachment == "" ?
                    <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "36px", fontWeight: '900', width: 128, height: 128 }} >{personalName}</Avatar> :
                    <Avatar alt={personalName} src={attachment} sx={{ fontSize: "36px", fontWeight: '900', width: 128, height: 128 }} ></Avatar>}

                <Stack spacing={2}>
                    <div>
                        <input type='file'
                            accept='image/jpg,impge/png,image/jpeg,image/gif'

                            onChange={onChange}>
                        </input>
                    </div>
                    <NameEditor onValueChange={handleOnNameChange} />
                    <StudentIdEditor onValueChange={handleOnStudentIdChange} />
                </Stack>
                {/* <Box sx={{ fontSize: "36px", mr: 10 }}>{personalName}</Box> */}
                {/* <TechStacksList /> */}
                {/* <PeronalTechStackList/> */}
            </Stack>)
    }
    const dispatch = useDispatch();
    let profileMessageValue = useRef("");
    let emailValue = useRef("");
    let studentIdValue = useRef("");
    let snsValue = useRef("");
    let nameValue = useRef("");
    let profileImageValue = useRef("");
    const handleOnprofileImageChange = (value) => {
        profileImageValue.current = value;
    }
    const handleOnNameChange = (value) => {
        nameValue.current = value;
    }
    const handleOnEmailChange = (value) => {
        emailValue.current = value;
    }
    const handleOnStudentIdChange = (value) => {
        studentIdValue.current = value;
    }
    const handleOnSnsChange = (value) => {
        snsValue.current = value;
    }
    const handleOnProfileMessageChange = (value) => {
        profileMessageValue.current = value;
    }
    const navigate = useNavigate();
    const handleUpload = (event) => {
        const validateEmail = (email) => {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
        };
        const checkStudentNumber = (number) => {
            return /(?!0{8})(\d{8})$/.test(number)
        }
        dispatch(postUserPersonalData({
            introduction: profileMessageValue.current,
            email: emailValue.current,
            sns: snsValue.current,
            studentId: studentIdValue.current,
            name: nameValue.current
        }));
        if (studentIdValue.current !== "" && nameValue.current !== "" && emailValue.current != "") {
            if (checkStudentNumber(studentIdValue.current) && validateEmail(emailValue.current)) {
                navigate(`/Profile?uid=${personalUid}`);
            } else {
                setAnchorEl(event.currentTarget);
            }
        } else {
            setAnchorEl(event.currentTarget);
        }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);



    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <div>
            <Box sx={{ mt: 10, mb: 3, ml: 3 }}>
                <Stack spacing={2} sx={{ minWidth: '28%' }}>
                    <ProfileContainer onValueChange={handleOnprofileImageChange} />
                    <EmailEditor onValueChange={handleOnEmailChange} />
                    <ProfileMessageEditor onValueChange={handleOnProfileMessageChange} />
                    <SnsEditor onValueChange={handleOnSnsChange} />
                    <Button variant="outlined" onClick={handleUpload}>저장하기 </Button>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>이메일, 이름, 학번을 확인해 주세요!</Typography>
                    </Popover>
                </Stack>
            </Box>
        </div>
    )
}



export default EditInfo;