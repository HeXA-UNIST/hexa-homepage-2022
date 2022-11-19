import { Paper, Box, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const TextSearchField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (<Paper
        elevation={isHovered | isFocused ? 1 : 0}
        sx={{
            height: '56px',
            display: 'flex',
            flexDirection: 'row',
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
        <Box sx={{
            height: '100%',
            width: '56px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isFocused ? '#f0f0f5' : '#f4f4f4',
            borderRadius: '8px 0px 0px 8px',
            borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
            borderStyle: 'solid',
            borderWidth: isFocused ? '0px 1.2px 0px 0px' : '0px 0.8px 0px 0px',
            transition: 'background-color 0.2s',
        }}>
            <SearchIcon sx={{
                stroke: isHovered | isFocused ? '#000000A3' : '#00000075',
                color: isHovered | isFocused ? '#000000A3' : '#00000075',
                strokeWidth: 1,
            }} />

        </Box>
        <InputBase sx={{ flex: "1", ml: '18px', mr: '18px', fontSize: '14px' }}
            placeholder="검색 (예: BUS HeXA, tag:서비스)" onChange={props.onChange}
            onFocus={
                () => setIsFocused(true)
            }
            onBlur={
                () => setIsFocused(false)
            }
        >
        </InputBase>
    </Paper >);
}

export default TextSearchField;