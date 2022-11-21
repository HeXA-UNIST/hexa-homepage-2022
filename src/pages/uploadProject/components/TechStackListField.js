// react
import { useRef, useState } from "react";

// mui
import { Box, Button, Divider, InputBase, Paper, Typography } from "@mui/material";

//icon
import SearchIcon from '@mui/icons-material/Search';

import { techStackList } from "features/tech_stack/tech_stack_list";


const TechStackListField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [techStackList, setTechStackList] = useState(props.initialTechStackList ?? []);

    const handleOnAdd = (techStack) => {
        const newTechStackList = [...techStackList, techStack];
        setTechStackList(newTechStackList);
        if (props.onChange) {
            props.onChange(newTechStackList);
        }
    }

    const handleOnRemove = (techStack) => {
        const newTechStackList = techStackList.filter((item) => item !== techStack);
        setTechStackList(newTechStackList);
        if (props.onChange) {
            props.onChange(newTechStackList);
        }
    }

    return (
        <Paper
            elevation={isHovered | isFocused ? 1 : 0}
            sx={{
                height: '300px',
                ...props.sx,
                display: 'flex',
                flexDirection: 'row',
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
                flex: '2',
                borderWidth: isFocused ? '0px 1.2px 0px 0px' : '0px 0.8px 0px 0px',
                borderRadius: '8px 0px 0px 8px',
                borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                borderStyle: 'solid',
            }}>
                <RemoveTechStackArea isFocused={isFocused} setIsFocused={setIsFocused} isHovered={isHovered}
                    techStackList={techStackList} onRemove={handleOnRemove} />
            </Box>
            <Box sx={{
                flex: '1',
            }}>
                <AddTechStackArea isFocused={isFocused} setIsFocused={setIsFocused} isHovered={isHovered}
                    selectedTechStackList={techStackList} onAdd={handleOnAdd} />
            </Box>
        </Paper >
    );
}

const AddTechStackArea = (props) => {
    const { isFocused, setIsFocused, isHovered, selectedTechStackList } = props;
    const [searchText, setSearchText] = useState('');

    const filterdTechStacks = techStackList.filter((TechStack) => {
        return TechStack.toLowerCase().includes(searchText.toLowerCase());
    });

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value.trim());
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                borderRadius: '0px 8px 0px 0px',
                borderWidth: isFocused ? '0px 0px 1.2px 0px' : '0px 0px 0.8px 0px',
                borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                borderStyle: 'solid',
            }}>
                {/*
                     <Box component='div'
                    sx={{
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        backgroundColor: isFocused ? '#f0f0f5' : '#f4f4f4',
                        borderRadius: '8px 0px 0px 0px',
                        borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                        borderStyle: 'solid',
                        borderWidth: isFocused ? '0px 1.2px 0px 0px' : '0px 0.8px 0px 0px',
                        transition: 'background-color 0.2s',
                    }}>
                    <SearchIcon
                        sx={{
                            color: isHovered | isFocused ? '#000000A3' : '#00000075',
                        }} />
                </Box>*/
                }

                <InputBase sx={{ flex: "1", height: '56px', ml: '18px', mr: '18px', fontSize: '14px' }}
                    placeholder={"검색어를 입력하세요"} onChange={handleSearchInputChange}
                    onFocus={
                        () => setIsFocused(true)
                    }
                    onBlur={
                        () => setIsFocused(false)
                    }
                >
                </InputBase>
            </Box>
            <Box sx={{
                flex: '1',
                overflowY: 'scroll',
                borderRadius: '0px 0px 8px 0px'
            }}>
                {filterdTechStacks.map((techStack) => {
                    return (
                        <Box key={techStack}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: '12px 18px',
                                borderBottom: '1px solid rgba(132, 132, 132, 0.3)',
                                '&:hover': {
                                    backgroundColor: '#F8F8Fa',
                                },
                                transition: 'all 0.2s',
                            }}>
                            <Typography sx={{ fontSize: '14px' }}>{techStack}</Typography>
                            <Button variant="outlined" sx={{ fontSize: '14px', textTransform: 'none', ml: '10px' }}
                                onClick={() => {
                                    props.onAdd(techStack);
                                }}
                                disabled={selectedTechStackList.includes(techStack)}
                            >Add</Button>
                        </Box>
                    );
                })}

            </Box>
        </Box >
    );
}

const RemoveTechStackArea = (props) => {
    const { isHovered, techStackList, isFocused } = props;

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                height: '56px',
                backgroundColor: '#f4f4f4',
                borderStyle: 'solid',
                borderRadius: '8px 0px 0px 0px',
                borderColor: isFocused ? '#0B0B6065' : 'rgba(132, 132, 132, 0.5)',
                borderWidth: isFocused ? '0px 0px 1.2px 0px' : '0px 0px 0.8px 0px',
            }}>
                <Typography fontSize='14px' sx={{
                    margin: '20px 15px',
                    color: isHovered ? '#000000FF' : '#000000A5',
                    transition: 'color 0.2s',
                }}>
                    추가된 항목
                </Typography>
            </Box>
            <Box sx={{
                height: '100%',
                overflowY: 'scroll',
                borderRadius: '8px 0px 0px 8px',
            }}>

                {techStackList.map((techStack) => {
                    return (
                        <Box key={techStack}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: '12px 18px',
                                borderBottom: '1px solid rgba(132, 132, 132, 0.3)',
                                '&:hover': {
                                    backgroundColor: '#F8F8Fa',
                                },
                                transition: 'all 0.2s',
                            }}>
                            <Typography sx={{ fontSize: '14px' }}>{techStack}</Typography>
                            <Button variant="outlined" sx={{ fontSize: '14px', textTransform: 'none', ml: '10px' }}
                                onClick={() => {
                                    props.onRemove(techStack);
                                }}
                            >Remove</Button>
                        </Box>
                    );
                })}

            </Box>
        </Box>
    );
}


export default TechStackListField;