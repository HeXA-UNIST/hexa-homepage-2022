import { Button, TextField, Typography, Link, InputAdornment, CircularProgress } from '@mui/material';
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
import { async } from '@firebase/util';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
const UploadSeminar = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");
    let fileUrl = []

    const [date, setDate] = useState(new Date());
    const [fileResult, setFileResult] = useState([]);
    const [isfileUploading, setIsfileUploading] = useState(false);
    const fileInput = createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const personalUid = useSelector(selectPersonalUid);
    useEffect(() => {
        dispatch(loadUserPersonalData);
    }, [isLoggedIn]);
    // useEffect(() => {
    //     console.log(fileUrl.length,fileResult.length)
    //     if (fileUrl.length == fileResult.length) {
    //         let seminarData = createSeminarData(title, description, fileUrl, new Date(Date.parse(date)).getTime(), personalUid);
    //         postSeminarDataFirebase(seminarData).then(() => {
    //             dispatch(loadSeminarList);
    //             //navigate(-1);
    //         });
    //     }
    // }, [fileUrl]);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const uploadAndSetUrl = async (file, index) => {
        const url = await handleUploadblob(file.filename, file.content);
        fileUrl.push({ 'filename': file.filename, 'fileurl': url })
        if (index == fileResult.length - 1) {
            let seminarData = createSeminarData(title, description, fileUrl, new Date(Date.parse(date)).getTime(), personalUid);
            postSeminarDataFirebase(seminarData).then(() => {
                dispatch(loadSeminarList);
                navigate(-1);
            });
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsfileUploading(true);
        Promise.all(fileResult.map((file, index) => {
            return uploadAndSetUrl(file, index);
        })).then(() => {
            console.log(setIsfileUploading(false));
        })
    };
    const handleButtonClick = e => {
        fileInput.current.click();
    };


    const handleDateChange = (newValue) => {
        setDate(newValue);
    };
    const handleChange = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            const filename = file.name;
            setFileResult([...fileResult, { 'filename': filename, 'content': result }]);
            //setFileUrl([...fileUrl, { 'filename': filename }]);
        }
        reader.readAsDataURL(file);
    };
    const handleDelete = (item) => {
        setFileResult(fileResult.filter((i) => i.filename !== item.filename));
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
            <Box sx={{
                width: 800, borderRadius: '4px', border: '0.8px solid rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', mt:1, mb:1
            }}>
                <Button onClick={handleButtonClick}>파일 업로드<UploadIcon /></Button>
                <Box sx={{ flex: '1', display: 'flex', justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap' }}>
                    {fileResult.map((file) => {
                        return (<><Link underline="always" sx={{ ml: 2 }}>
                            {file.filename}
                        </Link>
                            <DeleteIcon onClick={() => handleDelete(file)} sx={{ width: 18, height: 18, color: "#232629" }} />
                            {/* <Box onClick={handleDelete(file)}><DeleteIcon sx={{width:18,height:18,color:"#232629"}}/></Box> */}
                        </>)
                    })
                    }
                    <input type="file"
                        ref={fileInput}
                        onChange={handleChange}
                        style={{ display: "none" }} />
                </Box>
            </Box>
            <Box sx={{width:'800px', display: 'flex', alignItems: 'start',mb:1}}>
            <LocalizationProvider adapterLocale='ko' dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="세미나 날짜"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            </Box>

            {/* <TextField
                id="standard-basic"
                variant="outlined"
                sx={{ width: 800, mt: 2, mb: 2 }}
                disabled
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                    ),
                }}
            >
            </TextField> */}
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
            <Box sx={{width:'800px', display: 'flex', alignItems: 'start'}}>
            {isfileUploading ? <CircularProgress /> : <Button onClick={handleSubmit} variant='outlined' sx={{ width: '250px' }}>등록</Button>}
            </Box>
        </Box>
    </>)
}

export default UploadSeminar;