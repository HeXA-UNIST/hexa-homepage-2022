import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router';
const { Box, Avatar, Typography, Stack, Button } = require("@mui/material");


const Memberlist = (prop) => {
    console.log(prop.members)
    return (
        <Box sx={{flex: '1 0 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        flexWrap: 'wrap',}}>
            {prop.members.map((member) => (
                <MemberCard member={member} />
            ))}
        </Box>
    );
}
const MemberCard = (props) => {
    let member = props.member;
    const navigate = useNavigate();
    return (
        <div>
            <Button sx= {{textTransform: 'none'}}onClick={() => { navigate(`/Profile?uid=${member.uid}`) }}>
            <Box sx={{ borderRadius: '4px', border: '0.8px solid rgba(0,0,0,0.3)', width: "400px", height: '150px' }}>
                <Stack direction="row" spacing={0} sx={{ margin: "15px" }}>
                    <Avatar src={member.photo} sx={{ width: '120px', height: '120px' }} variant="rounded" />
                    <Box sx={{display:'flex', alignItems:'center'}}>
                    <Stack sx={{ ml: 2, }}>
                        <Stack direction="row">
                        <Typography sx={{fontFamily: 'Noto Sans KR',fontWeight: '500', fontSize:'20px', color:'#3B4045'}}>
                            {member.name}
                        </Typography>
                        </Stack>
                        <Stack direction="row">
                            <EmailIcon sx={{color:"#6A737C"}}/>
                            <Typography sx={{ color: "#6A737C", fontWeight:'400',  color:'#3B4045'}}>
                                {member.email}
                            </Typography>
                        </Stack>

                        {member.pro ? (<Stack direction="row"><TaskAltIcon sx={{ color: "#FFD700" }} /><Typography sx={{fontFamily: 'Noto Sans KR',fontWeight: '500',}}>프로젝트장</Typography></Stack>) : (<div></div>)}
                    </Stack>
                    </Box>
                    

                </Stack>
            </Box>
            </Button>
        </div>
    )
}
export default Memberlist;