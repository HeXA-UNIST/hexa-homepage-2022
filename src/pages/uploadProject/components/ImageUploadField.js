import { useEffect, useRef, useState } from "react";

const { Paper, Box, Typography, Button } = require("@mui/material");


const ImageUploadField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const inputFileRef = useRef(null)
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                    if (props.onChange) {
                        props.onChange(result);
                    }
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    return (
        <Paper
            elevation={isHovered | isFocused ? 1 : 0}
            sx={{
                ...props.sx,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '8px',
                borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                borderStyle: 'solid',
                borderWidth: isFocused ? '1.2px' : '0.8px',
            }}
            onMouseEnter={
                () => setIsHovered(true)
            }
            onMouseLeave={
                () => setIsHovered(false)
            }
        >
            <Box component='div'
                sx={{
                    width: '100%',
                    height: '56px',
                    boxSizing: 'border-box',
                    padding: '10px 10px',

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    backgroundColor: isFocused ? '#f0f0f5' : '#f4f4f4',
                    borderRadius: '8px 8px 0px 0px',
                    borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                    borderStyle: 'solid',
                    borderWidth: isFocused ? '0px 0px 1.2px 0px' : '0px 0px 0.8px 0px',
                    transition: 'background-color 0.2s',
                }}>
                <Typography fontSize='14px'
                    sx={{ color: isHovered | isFocused ? '#000000FF' : '#000000A5' }}
                >
                    프로젝트 이미지
                </Typography>
                <Button variant='contained' onClick={() => {
                    inputFileRef.current.click();
                }}>
                    파일 선택
                </Button>
                <input type='file' accept="image/*" style={{ display: 'none' }}
                    onChange={handleFileChange} ref={inputFileRef} />
            </Box>
            <Box sx={{ width: '100%', flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {fileDataURL ?
                    <img
                        style={{
                            width: '80%',
                            height: '180px',
                            objectFit: 'scale-down',
                        }}
                        src={fileDataURL ? fileDataURL : props.initialUrl ?? null} 
                        alt="preview" />
                    : props.initialImageSrc ?
                        <img
                            style={{
                                width: '80%',
                                height: '180px',
                                objectFit: 'scale-down'
                            }}
                            src={props.initialImageSrc} />
                        : <Typography fontSize='14px'>파일을 선택하세요</Typography>}
            </Box>

        </Paper >
    );
}

export default ImageUploadField;