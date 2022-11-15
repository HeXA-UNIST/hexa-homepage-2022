import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalData, loadUserPersonalData, postUserPersonalData, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack } from '../../features/personal/personal_reducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './Profile.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { techStackList } from '../../features/tech_stack/tech_stack_list';
import { selectIsLoggedIn } from '../../features/auth/login_reducer';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList } from 'react-window';
import ImageList from '@mui/material/ImageList';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

const TechStacksSearch = (props) => {
    const dispatch = useDispatch();
    const [TechStacks, setTechStacks] = useState(techStackList);
    const [userInput, setUserInput] = useState("");
    const isLoggedIn = useSelector(selectIsLoggedIn)

    let personalTechStack = useSelector(selectPersonalTechStack);
    useEffect(() => {
        dispatch(loadUserPersonalData);
    }, [isLoggedIn]);
    const handleChange = (e) => {
        setUserInput(e.target.value);
    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    function AlertDialogSlide(props) {
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        const deleteTechStack = () => {
            console.log(personalTechStack.indexOf(props.item))
            if (personalTechStack.indexOf(props.item) > -1) {
                personalTechStack = Object.assign([], personalTechStack);
                personalTechStack.splice(personalTechStack.indexOf(props.item), 1)
                dispatch(postUserPersonalData({
                    techStack: personalTechStack
                }))
            }
            setOpen(false);
        }
        const AddTechStack = () => {
            if (personalTechStack.indexOf(props.item) == -1) {
                personalTechStack = Object.assign([], personalTechStack);
                personalTechStack.push(props.item)
                dispatch(postUserPersonalData({
                    techStack: personalTechStack

                }))
            }
            setOpen(false);
        }
        return (
            <div>
                <Button variant="outlined" onClick={AddTechStack}>
                    추가하기
                </Button>
            </div>
        );
    }
    function renderFilteredTechStacks(props) {
        const { data, index, style } = props;
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={data[index]} />
                    <AlertDialogSlide item={data[index]} />
                </ListItemButton>
                <Divider/>
            </ListItem>
            
        );

    }
    function FilteredTechStacks(data) {
        return (
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >   
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={data.data.length}
                    overscanCount={5}
                    itemData={data.data}
                >
                    {renderFilteredTechStacks}
                </FixedSizeList>
                <Divider/>
            </Box>
        );
    }
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),

        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '335px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '335px',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    // const TechStacksList = () => {
    //     return (
    //         <ImageList sx={{ width: 500, height: 450, ml: 5, mt: 10 }} cols={3} rowHeight={164}>
    //             {personalTechStack.map((item) => (
    //                 <ListItemButton key={item} sx={{ width: 150, height: 164 }}>
    //                     <ListItemText primary={item} />
    //                 </ListItemButton>
    //             ))}
    //         </ImageList>
    //     );
    // }


    function renderPersonalTechStack({ item, handleRemove }) {
        return (
            <ListItem
                sx={{ width: 400 }}
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        title="Delete"
                        onClick={() => handleRemove(item)}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemText primary={item} />
            </ListItem>
        );
    }
    function TechStacksTranslist() {

        const handleRemove = (item) => {
            if (personalTechStack.indexOf(item) > -1) {
                personalTechStack = Object.assign([], personalTechStack);
                personalTechStack.splice(personalTechStack.indexOf(item), 1)
                dispatch(postUserPersonalData({
                    techStack: personalTechStack
                }))
            }
            dispatch(postUserPersonalData({
                techStack: personalTechStack
            }))
        };

        function renderPersonalTechStacks(props) {
            const { index, style } = props;
            const item = personalTechStack[index]
            return (
                <>
                <TransitionGroup>
                    <Collapse key={item}>
                        {renderPersonalTechStack({ item, handleRemove })}
                        <Divider/>
                    </Collapse>
                </TransitionGroup>
                </>

            );
        }
        return (
            <div>
                <Box sx={{ mt: 10 }}>
                    <Box className='TechStackTitle'>기술 스택</Box>
                    <FixedSizeList
                        height={400}
                        width={420}
                        itemSize={46}
                        itemCount={personalTechStack.length}
                        overscanCount={5}
                    >
                        {renderPersonalTechStacks}
                    </FixedSizeList>
                    <Divider/>

                    {/* <List>
                        <TransitionGroup>
                            {personalTechStack.map((item) => (
                                <Collapse key={item}>
                                    {renderItem({ item, handleRemove })}
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List> */}
                </Box>
            </div>
        );
    }
    const filterdTechStacks = TechStacks.filter((TechStack) => {
        if (userInput !== "") return TechStack.toLowerCase().includes(userInput.toLowerCase());
    });
    const TechStackSearch = () => {
        return (
            <div>
                <Search sx={{ mt: 10 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="검색(기술스택 추가)"
                        inputProps={{ 'aria-label': 'search' }}
                        autoFocus
                        value={userInput}
                        onChange={handleChange}
                    />
                </Search>
                <FilteredTechStacks sx={{ mt: 10 }} data={filterdTechStacks} />
            </div>
        )
    }
    return (
        <Box>
            <Stack direction="row" spacing={0}>
                <TechStacksTranslist />
                <TechStackSearch />
            </Stack>

        </Box>
    );
}
export default TechStacksSearch;