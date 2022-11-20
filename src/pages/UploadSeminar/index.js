import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { createRef, useEffect, useState } from 'react';

const UploadSeminar = (props) => {
    const fileInput = React.useRef(null);

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    const handleChange = e => {
        console.log(e.target.files[0]);
    };
    return <Box>
        <Button onClick={handleButtonClick}>파일 업로드</Button>
      <input type="file"
             ref={fileInput}
             onChange={handleChange}
             style={{ display: "none" }} />

    </Box>
}
export default UploadSeminar;