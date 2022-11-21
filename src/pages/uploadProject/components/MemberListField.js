// react
import { useEffect, useState } from 'react';

// mui
import { styled } from '@mui/material/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, CircularProgress, InputBase, MenuItem, Select, Typography
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import { loadPersonalDataFirebase, searchPersonalDataByNameFirebase } from 'features/personal/personal';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f4f4f4',
        borderColor: 'rgba(132, 132, 132, 0.5)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: 'white',
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: '#F8F8Fa',
    },
    transition: 'all 0.2s',
}));

const MemberListField = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [memberList, setMemberList] = useState(props.initialMemberList ?? []);

    const handleOnAddMember = (member) => {
        const newMemberList = [...memberList, member];
        setMemberList(newMemberList);
        if (props.onChange) {
            props.onChange(newMemberList);
        }
    }

    const handleOnRemoveMember = (uid) => {
        const newMemberList = memberList.filter((member) => member.uid !== uid);
        setMemberList(newMemberList);
        if (props.onChange) {
            props.onChange(newMemberList);
        }
    }

    const handleOnMemberProChange = (pro, uid) => {
        const newMemberList = memberList.map((member) =>
            (member.uid === uid)
                ? { ...member, pro: pro }
                : member
        );
        setMemberList(newMemberList);
        if (props.onChange) {
            props.onChange(newMemberList);
        }
    }

    return (
        <TableContainer component={Paper}
            elevation={isHovered ? 1 : 0}
            sx={{
                ...props.sx,
                borderRadius: '8px',
                borderWidth: '0.8px',
                borderColor: 'rgba(132, 132, 132, 0.5)',
                borderStyle: 'solid',
            }}
            onMouseEnter={
                () => setIsHovered(true)
            }
            onMouseLeave={
                () => setIsHovered(false)
            }
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>이름</StyledTableCell>
                        <StyledTableCell >이메일</StyledTableCell>
                        <StyledTableCell >권한</StyledTableCell>
                        <StyledTableCell >액션</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {memberList.map((member) => (
                        <MemberTableRow key={member.uid} uid={member.uid} pro={member.pro}
                            onMemberProChange={handleOnMemberProChange}
                            onRemoveMember={handleOnRemoveMember}
                        />
                    ))}
                    <NewMamberTableRow memberList={memberList} onAddMember={handleOnAddMember} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const MemberTableRow = (props) => {
    const { uid, pro } = props;
    const [memberPersonalData, setMemberPersonalData] = useState(null);

    useEffect(() => {
        loadPersonalDataFirebase(uid).then((data) => {
            setMemberPersonalData(data);
        });
    }, [uid]);

    const handleOnMemberProChange = (e) => {
        props.onMemberProChange(e.target.value, uid);
    }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {memberPersonalData ? memberPersonalData.name : <CircularProgress size='16px' />}
            </StyledTableCell>
            <StyledTableCell>
                {memberPersonalData ? memberPersonalData.email : <CircularProgress size='16px' />}
            </StyledTableCell>
            <StyledTableCell>
                {
                    memberPersonalData ?
                        <MemberProSelect value={pro} onChange={handleOnMemberProChange} />
                        : <CircularProgress size='16px' />
                }
            </StyledTableCell>
            <StyledTableCell>
                <Button variant="contained" color="error" size="medium"
                    onClick={() => props.onRemoveMember(uid)}
                >삭제</Button>
            </StyledTableCell>
        </StyledTableRow>
    );
}

const NewMamberTableRow = (props) => {
    const { memberList } = props;
    const [personalDataList, setPersonalDataList] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        searchPersonalDataByNameFirebase(searchName).then((data) => {
            setPersonalDataList(data);
        });
    }, [searchName]);

    const handleOnSearchNameChange = (e) => {
        setSearchName(e.target.value);
    }

    const handleOnAddMember = (uid) => {
        props.onAddMember(uid);
    }

    const buildTableCell = (memberData) => {
        return [
            (
                <StyledTableCell key={1}>
                    {
                        searchName.trim() === "" ?
                            <Typography sx={{ fontSize: '14px' }}>...</Typography>
                            : personalDataList.length === 0 ?
                                <CircularProgress size='16px' /> :
                                <Typography fontSize='14px'>
                                    {memberData.email}
                                </Typography>
                    }
                </StyledTableCell>
            ),
            (
                <StyledTableCell key={2}>
                    {
                        searchName.trim() === "" ?
                            <Typography sx={{ fontSize: '14px' }}>...</Typography>
                            : personalDataList.length === 0 ?
                                <CircularProgress size='16px' />
                                : <Typography fontSize='14px'>...</Typography>
                    }
                </StyledTableCell>
            ),
            (
                <StyledTableCell key={3}>
                    {
                        searchName.trim() === "" ?
                            <Typography sx={{ fontSize: '14px' }}>...</Typography>
                            : personalDataList.length === 0 ?
                                <CircularProgress size='16px' />
                                : <Button variant="contained"
                                    size='medium'
                                    onClick={
                                        () => {
                                            setSearchName("");
                                            handleOnAddMember({ uid: memberData.uid, pro: false });
                                        }
                                    }
                                    disabled={memberList.some((member) => member.uid === memberData.uid)}>
                                    추가
                                </Button>
                    }
                </StyledTableCell>
            )
        ];
    }

    return (
        [
            (
                <StyledTableRow key={0}>
                    <StyledTableCell rowSpan={personalDataList.length > 0 ? personalDataList.length : 1}>
                        <InputBase
                            sx={{ fontSize: '14px', margin: '10px 0px' }}
                            placeholder='이름을 입력해 추가하세요'
                            value={searchName}
                            onChange={handleOnSearchNameChange} />
                    </StyledTableCell>
                    {buildTableCell(personalDataList[0])}
                </StyledTableRow >
            ),
            ...personalDataList.map((data, index) => {
                if (index === 0) return;
                return (
                    <StyledTableRow key={index}>
                        {buildTableCell(data)}
                    </StyledTableRow>
                );
            })
        ]
    );
}

const MemberProSelect = (props) => {
    return (
        <Select
            sx={{
                fontSize: '14px',
            }}
            value={props.value}
            onChange={props.onChange}>
            <MenuItem value={true}>프로젝트장</MenuItem>
            <MenuItem value={false}>참가자</MenuItem>
        </Select>
    );
}


export default MemberListField;