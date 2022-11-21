// react
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { loadSeminarList, selectIsSeminarListLoaded, selectSeminarList } from "../../../features/seminar/seminar_reducer";

// mui
import { Box, Divider, InputBase, List, MenuItem, Paper, Select, Typography, Link, CircularProgress } from "@mui/material";

// icon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { activityContentMaxWidth, activityMinPadding } from "..";
import TextSearchField from "../components/TextSearchField";


const SeminarPage = (props) => {
    const dispatch = useDispatch();
    const [filterCondition, setFilterCondition] = useState({ searchText: "", year: 2022 });

    useEffect(() => {
        dispatch(loadSeminarList);
    }, [dispatch]);

    const handleSearchAreaChange = (filterCondition) => {
        setFilterCondition(filterCondition);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '110px' }}>
            <Box sx={{ flex: `0 1 ${activityContentMaxWidth}px`, ml: `${activityMinPadding}px`, mr: `${activityMinPadding}px` }}>
                <SeminarTitleArea />
                <SeminarSearchArea onChange={handleSearchAreaChange} />
                <SeminarListArea filter={filterCondition} />
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
    // Todo : Select 스타일링 한 후 Component로 분리하기

    const searchText = useRef("");
    const [yearValue, setYearValue] = useState(2022);

    const handleSearchTextChange = (event) => {
        searchText.current = event.target.value;
        if (props.onChange) {
            props.onChange({ searchText: event.target.value, year: yearValue });
        }
    }

    const handleYearChange = (event) => {
        setYearValue(event.target.value);
        if (props.onChange) {
            props.onChange({ searchText: searchText.current, year: event.target.value });
        }
    }

    return (
        <Box sx={{ width: "100%", display: 'flex' }} >
            <Box sx={{ flex: '1', mr: '17px' }}>
                <TextSearchField onChange={handleSearchTextChange} />
            </Box>
            <Box>
                <Select
                    elevation={0}
                    value={yearValue}
                    onChange={handleYearChange}
                    sx={{
                        height: '56px',
                        width: '100px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        borderColor: 'rgba(132, 132, 132, 0.47)',
                        borderWidth: '0.8px',
                    }}>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                </Select>
            </Box>
        </Box >
    );
}

const SeminarListArea = (props) => {
    const isSeminarLoaded = useSelector(selectIsSeminarListLoaded);
    const seminarList = useSelector(selectSeminarList);

    if (!isSeminarLoaded) {
        return <Box sx={{ mt: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
            <CircularProgress />
        </Box>;
    }

    const filteredSeminarList = seminarList.filter((seminar) => {
        let matchYear = new Date(seminar.date).getFullYear() === props.filter.year;
        if (!matchYear) return false;

        if (props.filter.searchText.trim() === "") return true;
        let matchTitle = seminar.title.toLowerCase().includes(props.filter.searchText.toLowerCase());
        let matchDescription = seminar.description.toLowerCase().includes(props.filter.searchText.toLowerCase());
        let matchDate = new Date(seminar.date).toLocaleDateString().toLowerCase().includes(props.filter.searchText.toLowerCase());
        let matchFile = seminar.fileName.toLowerCase().includes(props.filter.searchText.toLowerCase()) || seminar.fileUrl.toLowerCase().includes(props.filter.searchText.toLowerCase());

        return matchTitle || matchDescription || matchDate || matchFile;
    });

    const SeminarListItem = (props) => {
        const { title, description, date, fileName, fileUrl } = props.seminar;
        return (
            <Box sx={{ display: 'flex', padding: '44px 0px', mr: '10px', ml: '10px' }}>
                <Box sx={{ height: '30px', display: 'flex', alignItems: 'center' }}>
                    <NavigateNextIcon sx={{color:"#5F5F5F"}}/>
                </Box>

                <Box sx={{ ml: '10px', mr: '10px', flex: '1' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '22px', letterSpacing:'1.3px' }}>
                            {title}
                        </Typography>
                        <Typography sx={{ fontWeight: '400', fontSize: '14px', ml: '5px' }}>
                            {new Date(date).toLocaleDateString()}
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

    const NoSeminarListItem = () => {
        // TODO: NoSeminarListItem 만들기
    }

    const minHeight = `${window.innerHeight}px`;

    if (filteredSeminarList.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: minHeight, paddingTop: "100px" }}>
                <Typography sx={{ fontWeight: '700', fontSize: '18px' }}>
                    검색 결과가 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: '50px' }}>
            {filteredSeminarList.length === 0 ? <NoSeminarListItem /> :
                <Box sx={{ minHeight: minHeight }}>
                    <List>
                        {filteredSeminarList.map((seminar, index) => {
                            return (
                                <Box key={index}>
                                    {index === 0 && <Divider />}
                                    <SeminarListItem seminar={seminar} />
                                    <Divider />
                                </Box>
                            );
                        })}
                    </List>
                </Box>
            }
        </Box>
    );
}

export default SeminarPage;