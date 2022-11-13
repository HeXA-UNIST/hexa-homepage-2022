import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalData, loadUserPersonalData, postUserPersonalData, selectPersonalIntroduction, selectPersonalName, selectPersonalTechStack } from '../../features/personal/personal_reducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import '../Home/home.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { techStackList } from '../../features/tech_stack/tech_stack_list';
import { selectIsLoggedIn } from '../../features/auth/login_reducer';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList } from 'react-window';
import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

const TechStacksSearch = (props) => {
    const dispatch = useDispatch();
    const [TechStacks, setTechStacks] = useState(techStackList);
    const [userInput, setUserInput] = useState("");
    const isLoggedIn = useSelector(selectIsLoggedIn)

    let personalTechStack = useSelector(selectPersonalTechStack);
    console.log(personalTechStack)
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
                <Button variant="outlined" onClick={handleClickOpen}>
                    변경
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{props.item}</DialogTitle>
                    <DialogActions>
                        <Button onClick={AddTechStack}>추가하기</Button>
                        <Button onClick={deleteTechStack}>삭제하기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    function renderRow(props) {
        const { data, index, style } = props;
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={data[index]} />
                    <AlertDialogSlide item={data[index]} />
                </ListItemButton>
            </ListItem>
        );

    }
    function VirtualizedList(data) {
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
                    {renderRow}
                </FixedSizeList>
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

    const filterdTechStacks = TechStacks.filter((TechStack) => {
        if (userInput !== "") return TechStack.toLowerCase().includes(userInput.toLowerCase());
    });
    return (
        <Box>
            <Search sx={{mt:10}}>
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
            <VirtualizedList sx={{mt:10}} data={filterdTechStacks} />
        </Box>
    );
}
const NameAndInfo = () => {
    const personalName = useSelector(selectPersonalName);
    const personalTechStack = useSelector(selectPersonalTechStack);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    let personalIntroduction = useSelector(selectPersonalIntroduction);
    const handlePersonalIntroduction = (event) => {
        dispatch(postUserPersonalData({
            introduction: personalIntroduction
        }))
        
    }
    useEffect(() => {
        dispatch(loadUserPersonalData);
    }, []);
    const handleChange = (event) => {
        personalIntroduction = (event.target.value);
        console.log(personalIntroduction)
    };

    // function BasicEditingGrid() {
    //     return (
    //         <div style={{ height: 300, width: '100%' }}>
    //             <DataGrid
    //                 rows={rows}
    //                 columns={columns}
    //                 experimentalFeatures={{ newEditingApi: true }}
    //             />
    //         </div>
    //     );
    // }

    // const columns = [
    //     { field: 'name', headerName: '기술 스택', width: 250, editable: false },
    //     {
    //         field: 'dateCreated',
    //         headerName: 'Date Created',
    //         type: 'date',
    //         width: 100,
    //         editable: false,
    //     },

    // ];
    // const rows = personalTechStack.map((stack, index)=>{
    //     return ({name:stack, id:index, dateCreated: new Date()})
    // })
    const Column = ({ index, style }) => (
        <div style={style} className= "techStack">{personalTechStack[index]}</div>
      );
       
      const PeronalTechStackList = () => (
        <FixedSizeList
            height={75}
            itemCount={personalTechStack.length}
            itemSize={100}
            layout="horizontal"
            width={900}
        >
        {Column}

        </FixedSizeList>
          
      );
    return (
        <div>
            <Box sx={{ mt: 10, mb: 3, ml: 3 }}>
                <Stack direction="row" spacing={2}>
                    <Avatar alt={personalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "18px", fontWeight: '900', width: 80, height: 80 }} >{personalName}</Avatar>
                    <Box sx={{ fontSize: "36px" }}>{personalName}</Box>
                    <PeronalTechStackList/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField
                        id="outlined-multiline-static"
                        label="프로필 메시지"
                        sx={{width:300}}
                        multiline
                        rows={4}
                        defaultValue=""
                        onChange={handleChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                              ev.target.blur();
                              ev.preventDefault();
                            }
                        }}
                        onFocus={(ev)=>{
                            ev.target.value = personalIntroduction;
                        }}
                        onBlur={(ev)=>{
                            ev.target.value = "";
                            handlePersonalIntroduction();
                        }}
                    />
                </Stack>
            </Box>
        </div>
    )
}
const Profile = () => {
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            <Stack direction="row" spacing={2}>
                <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
                <NameAndInfo />
                <TechStacksSearch />
            </Stack>
        </div>
    )
}
export default Profile;