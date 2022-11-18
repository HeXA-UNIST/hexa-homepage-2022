import React, { useEffect, useState } from 'react';



import '../Home/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPersonalTechStack, selectPersonalPower, selectPersonalUid, loadPersonalData, selectIsPersonalDataLoaded } from '../../features/personal/personal_reducer';
import ResponsiveAppBar from "../Home/ResponsiveAppbar";
import { ListItem, ListItemText, Divider, Card, Typography, ImageList, ListItemButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';

import { FixedSizeList } from 'react-window';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSearchParams } from 'react-router-dom';
import { loadPersonalDataFirebase } from 'features/personal/personal';
import { selectIsLoggedIn } from 'features/auth/login_reducer';
const TechStackList = () => {

    const techStackImgList = ['.net', 'asp.net', 'api', 'angularjs', 'c#', 'c', 'c++', 'css', 'django', 'flutter', 'html', 'java', 'javascript', 'jquery', 'linux',
        'node.js', 'php', 'python', 'reactjs', 'ruby','objective-c', 'swift', 'tensorflow', 'xml', 'typescript', 'amazon-web-services'];


    const [searchParams, setSearchParams] = useSearchParams();
    const uid = searchParams.get("uid")

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded)
    useEffect(() => {
        dispatch(loadPersonalData(uid))
    }, []);
    //useSelector(selectPersonalTechStack);
    // function renderPersonalTechStack({ item }) {
    //     if(techStackImgList.includes(item)){
    //     return (
    //         <ListItem
    //             sx={{ width: 400 }}
    //             secondaryAction={
    //                 <img src = {require(`assets/img/techstackicon/${item}.png`)}  width = '30px' height = '30px'></img>
    //             }
    //         >
    //             <ListItemText primary={item} />
    //         </ListItem>
    //     );
    // }
    //     else{
    //         return (
    //             <ListItem
    //                 sx={{ width: 400 }}
    //                 secondaryAction={
    //                     <HowToRegIcon/>
    //                 }
    //             >
    //                 <ListItemText primary={item} />
    //             </ListItem>
    //         );
    //     }
    // }
    // function renderPersonalTechStacks(props) {
    //     const { index, style } = props;
    //     const item = personalTechStack[index]
    //     return (
    //         <>
    //         <TransitionGroup>
    //             <Collapse key={item}>
    //                 {renderPersonalTechStack({ item })}
    //                 <Divider/>
    //             </Collapse>
    //         </TransitionGroup>
    //         </>

    //     );
    // }
    const TechItem = (props) => {
        const techStack = props.techStack; // each item

        return (
            <Box display="flex" >
                <Tooltip title={techStack} placement="top">
                    <ListItemButton key={techStack}  sx={{ width: "150px", height: "150px", border: "solid", borderRadius: "1rem" }}>
                        <ListItemText primary={
                            techStackImgList.includes(techStack) ? <Box display="flex" justifyContent="center" alignItems="center">
                                <img src={require(`assets/img/techstackicon/${techStack}.png`)} width='100%' height='100%'></img>
                            </Box> : <Typography variant="h6" sx={{ color: 'black', fontFamily: 'Raleway, Arial', fontWeight: 700, textAlign: 'center' }} component="div" gutterBottom>{techStack}</Typography>
                        }
                        // secondary={
                        //     <Typography variant="h6" sx={{color:'black', fontFamily:'Raleway, Arial',fontWeight:900, textAlign:'center'}}component="div" gutterBottom>{techStack}</Typography>
                        // }
                        />

                    </ListItemButton>
                </Tooltip>
            </Box>
        );
    }
    const TechList = (props) => {
        const techList = useSelector(selectPersonalTechStack)
        console.log(useSelector(selectPersonalTechStack))
        return (
            <Card sx={{
                Width: '100%', height: "100%", display: 'flex',
                

                
            }} >
                <ImageList sx={{
                    width: '500px', hegiht:"306px",maxheight: "460px",
                }} cols={3} rowHeight={164}>
                    {techList.map((tech) => {
                        return <TechItem techStack={tech} key={tech} />
                    })}
                </ImageList>
                
            </Card>
        );
    }
    return (<div>
        {isPersonalDataLoaded ? <Box sx={{ mt: 10 }}>
            <Card sx={{
                Width: '100%', height: "100%", display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }} >
                <Typography variant="h5" sx={{ color: 'black', fontFamily: 'Raleway, Arial', fontWeight: 900 }} component="div" gutterBottom>기술 스택</Typography></Card>
            <Divider />
            <TechList />
            {/* <FixedSizeList
                height={400}
                width={420}
                itemSize={46}
                itemCount={personalTechStack.length}
                overscanCount={5}
            >
                {renderPersonalTechStacks}
            </FixedSizeList> */}
            <Divider />
        </Box> : <></>}
    </div>)
}
export default TechStackList;