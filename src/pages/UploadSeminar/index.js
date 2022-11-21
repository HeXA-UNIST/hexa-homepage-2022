import { Button, TextField, Typography, Link, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { createSeminarData, postSeminarDataFirebase } from 'features/seminar/seminar';
import { handleUploadblob } from 'features/upload/uploadImage';
import ResponsiveAppBar from 'pages/Home/ResponsiveAppbar';
import React, { createRef, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
import { loadSeminarList } from 'features/seminar/seminar_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'features/auth/login_reducer';
import { loadUserPersonalData, selectPersonalUid } from 'features/personal/personal_reducer';
import { useNavigate } from 'react-router';

const UploadSeminar = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState([]);
    const [date, setDate] = useState(new Date());
    const fileInput = createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const personalUid = useSelector(selectPersonalUid);
    useEffect(() => {
        dispatch(loadUserPersonalData);
    }, [isLoggedIn]);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleFileUrlChange = (event) => {
        setFileUrl(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        let seminarData = createSeminarData(title, description, fileName, fileUrl, new Date(Date.parse(date)).getTime(), personalUid);
        postSeminarDataFirebase(seminarData).then(() => {
            dispatch(loadSeminarList);
            navigate(-1);
        });
    };
    const handleButtonClick = e => {
        fileInput.current.click();
    };


    const handleDateChange = (newValue) => {
        setDate(newValue);
    };
    const handleChange = e => {
        const file = e.target.files[0];
        // handleUploadblob(file.name, file).then((url) => {
        //     console.log(url);
        // });
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            const filename = file.name;
            handleUploadblob(file.name, result).then((url) => {
                setFileUrl([...fileUrl, { 'filename': filename, 'fileurl': url }]);
            });
        }
        reader.readAsDataURL(file);
    };
    const handleDelete = (item) => {
        setFileUrl(fileUrl.filter((i) => i !== item));
    }
    return (<>
        <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 10 }}>
            <TextField
                id="standard-basic"
                variant="outlined"
                label="제목"
                value={title}
                sx={{ width: 800 }}
                onChange={handleTitleChange}
            />
            <TextField
                id="standard-basic"
                variant="outlined"
                sx={{width:800,mt:2,mb:2}}
                disabled
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Box sx={{ justifyContent: 'start', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <Button onClick={handleButtonClick}>파일 업로드<UploadIcon/></Button>
                                {fileUrl.map((file) => {
                                    return (<><Link onClick={() => window.open(file.fileurl, '_blank')} underline="always" sx={{ ml: 2 }}>
                                        {file.filename}
                                    </Link>
                                    <DeleteIcon onClick={()=>handleDelete(file)} sx={{width:18,height:18,color:"#232629"}}/>
                                    {/* <Box onClick={handleDelete(file)}><DeleteIcon sx={{width:18,height:18,color:"#232629"}}/></Box> */}
                                    </>)
                                })
                                }
                                <input type="file"
                                    ref={fileInput}
                                    onChange={handleChange}
                                    style={{ display: "none" }} />
                            </Box>
                        </InputAdornment>
                    ),
                }}
            >
            </TextField>

            <TextField
                id="standard-basic"
                variant="outlined"
                label="설명"
                value={description}
                sx={{ width: 800, mb: 2 }}
                multiline
                rows={10}
                onChange={handleDescriptionChange}
            />
            <LocalizationProvider adapterLocale='ko' dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="세미나 날짜"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={handleSubmit} variant='outlined' sx={{ mt: 2, width: '250px' }}>등록</Button>
        </Box>
    </>)
}

export default UploadSeminar;