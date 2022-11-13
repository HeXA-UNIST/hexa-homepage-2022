import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersonalData, loadUserPersonalData, postUserPersonalData, selectPersonalName, selectPersonalTechStack } from '../../features/personal/personal_reducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ResponsiveAppBar from '../Home/ResponsiveAppbar';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import '../Home/home.css';

const TechStacksSearch = (props) => {
    const dispatch = useDispatch();
    const [TechStacks,setTechStacks] = useState([]);
    const [userInput, setUserInput] = useState("");
    useEffect(() => {
        dispatch(loadUserPersonalData);
        fetch('https://api.stackexchange.com/2.3/tags?order=desc&pagesize=100&page=1&sort=popular&site=stackoverflow').then(res=>res.json()).then(
            (result)=> {
                setTechStacks(result.items);
            }
        )
      }, []);
      let PersonalTechStack = useSelector(selectPersonalTechStack);
      console.log(PersonalTechStack)
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
        const deleteTechStack =() =>{
            PersonalTechStack.remove(props.item)
            setOpen(false);
        }
        const AddTechStack =() =>{
            PersonalTechStack = [...PersonalTechStack, props.item];
            console.log("update한 object:");
            console.log(PersonalTechStack)
            dispatch(postUserPersonalData({
                techStack: PersonalTechStack
            }))
            setOpen(false);
        }
        return (
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              추가하기
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
    function CardList({ data }) {
        return (
          <div>
            {data.map((card) => (
                <div key = {card.name}>
                    <Stack direction="row" spacing={2}>
                    <Box sx={{ ml: 3, mb: 1 }}>{card.name}</Box>
                    <AlertDialogSlide item = {card.name}/>
                    </Stack>
                    
                </div>
            ))}
          </div>
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
        width: '300px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '300px',
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
        if(userInput !== "") return TechStack.name.toLowerCase().includes(userInput.toLowerCase());
    });
    return (
    <div>
        <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="검색"
                inputProps={{ 'aria-label': 'search' }}
                autoFocus
                value= {userInput}
                onChange= {handleChange}
            />
          </Search>
        <CardList data={filterdTechStacks} />
    </div>
    );
}
const NameAndInfo = () =>{
    const PersonName = useSelector(selectPersonalName)
    return (
        <div>
            <Box sx= {{mt:10, mb:3, ml:3}}>
                <Box>이름</Box>
                <Box>{PersonName}</Box>
            </Box>
        </div>
    )
}
const Profile = () => {
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)"/>
            <NameAndInfo/>
            <TechStacksSearch/>
        </div>
    )
}
export default Profile;