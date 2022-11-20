import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { loadProjectList } from 'features/project/project_reducer';

const ProjectTechStacksSearch = (props) => {
    const dispatch = useDispatch();
    const [TechStacks, setTechStacks] = useState(techStackList);
    const [userInput, setUserInput] = useState("");
    const isLoggedIn = useSelector(selectIsLoggedIn)

    let [projectTechStack,setProjectTechStack] = useState([])
    //console.log(projectTechStack)
    useEffect(() => {
        dispatch(loadProjectList());
    }, [dispatch]);
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    
        return [ htmlElRef, setFocus ] 
    }
    const [inputRef, setInputFocus] = useFocus()
    const handleChange = (e) => {
        setUserInput(e.target.value);
        e.target.focus();
    };
    function AlertDialogSlide(props) {
        const [open, setOpen] = React.useState(false);

        const AddTechStack = () => {
            if (projectTechStack.indexOf(props.item) == -1) {
                setProjectTechStack([...projectTechStack, props.item])
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
                <Divider />
            </ListItem>

        );

    }
    function renderprojectTechStacks(props) {
        const { index, style } = props;
        const handleRemove = (item) => {
            if (projectTechStack.indexOf(item) > -1) {
                setProjectTechStack(projectTechStack.filter((e) => e !== item))
            }
            // dispatch(postUserPersonalData({
            //     techStack: projectTechStack
            // }))
        };
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={projectTechStack[index]} />
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        title="Delete"
                        onClick={() => handleRemove(projectTechStack[index])}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemButton>
                <Divider />
            </ListItem>

        );

    }
    function ProjectTechStacks() {
        return (
            <Box
                sx={{ mt: 2, width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >
                <Box sx = {
                    {"fontFamily":"'Asap'","fontStyle":"normal","fontWeight":"600","fontSize":"24px","lineHeight":"120%","marginBottom":"10px","color":"#0A0A50"}
                }>기술 스택</Box>
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={projectTechStack.length}
                    overscanCount={5}
                    itemData={projectTechStack.data}
                >
                    {renderprojectTechStacks}
                </FixedSizeList>
                <Divider />
            </Box>
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
                <Divider />
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
    const TechStackSearch = () => {
        return (
            <div>
                <Search sx={{ mt: 2 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="검색(기술스택 추가)"
                        inputProps={{ 'aria-label': 'search' }}
                        value={userInput}
                        ref={inputRef}
                        onChange={handleChange}
                    />
                </Search>
                <FilteredTechStacks sx={{ mt: 2 }} data={filterdTechStacks} />
            </div>
        )
    }
    return (
        <Box>
            <Stack direction="row" spacing={0}>
                <ProjectTechStacks />
                <TechStackSearch />
            </Stack>
        </Box>
    );
}
export default ProjectTechStacksSearch;