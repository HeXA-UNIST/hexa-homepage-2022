import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadProjectList, loadProjectListById, selectIsProjectListLoaded, selectProjectList } from "../../features/project/project_reducer";
import ResponsiveAppBar from "../../components/ResponsiveAppbar";
import { Avatar, Box, Divider, ImageList, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Tab from '@mui/material/Tab';
import {TabContext,TabPanel,TabList} from "@mui/lab";
import ReactMarkdown from "react-markdown";
import TechStackList from "components/TechStacklist";
import { loadPersonalDataFirebase } from "features/personal/personal";
import Memberlist from "components/MemberCard";



const Project = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate(location.pathname, {}); 
    //     // reload and pass empty object to clear state
    //     // we can also use replace option: ..., {replace: true}
    //   }, []);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    // Project?id=${id}
    const id = searchParams.get('id')
    const projectList = useSelector(selectProjectList)[0];
    const isProjectListLoaded = useSelector(selectIsProjectListLoaded);
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [isProjectMembersInfoloaded,setisProjectMembersInfoloaded]= useState(false);
    const [ProjectMembersInfo,setProjectMembersInfo] = useState([]);
    useEffect(() => {
        dispatch(loadProjectListById(id));
        
    }, [dispatch]);
    useEffect(()=>{
        if(isProjectListLoaded&&ProjectMembersInfo.length==0){
            setProjectMembersInfo([]);
            projectList.members.forEach((member,index) => {
                
                loadPersonalDataFirebase(member.uid).then((data)=>{
                    data.pro = member.pro;
                    setProjectMembersInfo((prev)=>{ return [...prev,data]});
                    if(index==projectList.members.length-1){
                        setisProjectMembersInfoloaded(true);
                    }
                })
            });
        }
    },[isProjectListLoaded])
    return (
        <div>
            <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
            {isProjectListLoaded ? (<Box sx={{ mt: 10, ml: 5 }}>
                <Stack direction="row" spacing={0}>
                    <Avatar src={projectList.thumbnailUrl} sx={{ width: '150px', height: '150px' }} variant="rounded" />
                    <Box>
                        <Typography sx={{ mt: 4, fontSize: '42px' }}>
                            {projectList.name}
                        </Typography>
                        <Typography sx={{ fontSize: '17px', color: "#6A737C", fontWeight: "600" }}>
                            {projectList.subtitle}
                        </Typography>
                    </Box>
                </Stack>
                <Divider/>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="프로젝트 소개" value="1" />
                            <Tab label="요구 기술스택 " value="2" />
                            <Tab label="프로젝트 멤버" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ReactMarkdown>{projectList.content}</ReactMarkdown>
                    </TabPanel>
                    <TabPanel value="2">
                    <TechStackList techList= {projectList.techStack}/>
                    </TabPanel>
                    <TabPanel value="3">
                        {isProjectMembersInfoloaded ? (
                            <div> 
                                <Memberlist members={ProjectMembersInfo}/>
                            </div>
                        ):(<Box sx={{ mt: 10 }}>로딩중</Box>)}
                    </TabPanel>
                </TabContext>


            </Box>

            ) : <Box sx={{ mt: 10 }}>로딩중</Box>


            }

        </div>
    )
}

export default Project;