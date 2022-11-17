// react
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSeminarList, selectSeminarList } from "../../../features/seminar/seminar_reducer";

// mui
import { Box, Divider, InputBase, List, MenuItem, Paper, Select, Typography, Link } from "@mui/material";

// icon
import SearchIcon from '@mui/icons-material/Search';
import { activityContentMaxWidth, activityMinPadding } from "..";


const SeminarPage = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSeminarList);
    }, [dispatch]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '110px' }}>
            <Box sx={{ flex: `0 1 ${activityContentMaxWidth}px`, ml: `${activityMinPadding}px`, mr: `${activityMinPadding}px` }}>
                <SeminarTitleArea />
                <SeminarSearchArea />
                <SeminarListArea />
            </Box>
        </Box>

    );
}

const SeminarTitleArea = () => {
    return (
        <Box sx={{ mb: '26px' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '36px', lineHeight: '1.8' }}>
                HeXA가 진행한 세미나
            </Typography>
            <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>
                HeXA는, 지식과 머ㅜ시기를 나누기 위해 정기적으로 스터디를 진행합니다.
            </Typography>
        </Box>
    );
}

const SeminarSearchArea = (props) => {
    // Todo : style Select, and send input data
    return (
        <Box sx={{ width: "100%", display: 'flex' }} >
            <Box sx={{ flex: '1', mr: '17px' }}>
                <Paper
                    elevation={0}
                    sx={{
                        height: '56px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: '8px',
                        borderColor: 'rgba(132, 132, 132, 0.47)',
                        borderStyle: 'solid',
                        borderWidth: '0.8px',
                    }}>
                    <Box sx={{
                        height: '100%',
                        width: '56px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '8px 0px 0px 8px',
                        borderColor: 'rgba(132, 132, 132, 0.47)',
                        borderStyle: 'solid',
                        borderWidth: '0px 0.8px 0px 0px',
                    }}>
                        <SearchIcon sx={{
                            stroke: '#555555',
                            strokeWidth: 1,
                        }} />

                    </Box>
                    <InputBase sx={{ flex: "1", ml: '18px', mr: '18px', fontSize: '14px' }}
                        placeholder="검색 (예: BUS HeXA, tag:서비스)">
                    </InputBase>
                </Paper>
            </Box>
            <Box>
                <Select
                    elevation={0}
                    value={2022}
                    sx={{
                        height: '56px',
                        width: '100px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        borderColor: 'rgba(132, 132, 132, 0.47)',
                        borderWidth: '0.8px',
                    }}>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </Box>
        </Box >
    );
}

const SeminarListArea = (props) => {
    const seminarList = useSelector(selectSeminarList);

    const SeminarListItem = (props) => {
        const { title, description, date, fileName, fileUrl } = props.seminar;
        return (
            <Box sx={{ display: 'flex', padding: '44px 0px', mr: '10px', ml: '10px' }}>
                ▶
                <Box sx={{ ml: '10px', mr: '10px', flex: '1' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
                        <Typography sx={{ fontWeight: '700', fontSize: '18px' }}>
                            {title}
                        </Typography>
                        <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                            {new Date(date).toDateString()}
                        </Typography>
                    </Box>

                    <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                        {description}
                    </Typography>

                    {fileName &&
                        <Box sx={{ display: 'flex', mt: '20px' }}>
                            <Box sx={{ p: "6px 140px 6px 26px", backgroundColor: '#F4F4F4', borderRadius: '99999px' }}>
                                <Link sx={{ fontWeight: '500', fontSize: '14px' }}
                                    underline="hover" href={fileUrl} color="#243677" target="_blank">
                                    {fileName}
                                </Link>
                            </Box>
                        </Box>}
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: '50px' }}>
            <List>
                {seminarList.map((seminar, index) => {
                    return (
                        <Box key={index}>
                            {index == 0 && <Divider />}
                            <SeminarListItem seminar={seminar} />
                            <Divider />
                        </Box>
                    );
                })}
            </List>
        </Box>
    );
}

export default SeminarPage;