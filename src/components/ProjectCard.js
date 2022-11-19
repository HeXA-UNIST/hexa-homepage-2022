// mui
import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";

import './ProjectCardStyle.css';

// TODO: 마우스 hover, active 제대로 효과 주기
const ProjectCard = (props) => {
    const { name, startDate, endDate, techStack, thumbnailUrl } = props.project;
    return (
        <div
            className="project-card">
            <div className="project-card-image">
                <img
                    alt={name + " thumbnail"}
                    height="200"
                    src={thumbnailUrl}
                />
            </div>
            <div style={{
                padding: '30px 20px',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography
                    sx={{ marginBottom: '2px' }}
                    fontSize='24px'
                    fontWeight={700}
                    letterSpacing="120%">
                    {name}
                </Typography>
                <Typography fontSize='14px' color='rgba(0, 0, 0, 0.7)' sx={{ pl: '2px' }}>
                    {new Date(startDate).toLocaleDateString()}
                    {endDate ? " ~ " + new Date(endDate).toLocaleDateString() : " ~ 진행중"}
                </Typography>
                <div style={{
                    display: 'flex',
                    flex: '1',
                    alignItems: 'end',
                }}>
                    <ProjectTechStackArea techStackList={techStack} />
                </div>
            </div>
        </div>
    );
}

// TODO: Card 크기에 비해 TechStack수가 만아질 때 고려하기
const ProjectTechStackArea = (props) => {
    const techStackList = props.techStackList;

    const TechStackChip = (props) => {
        const techStack = props.techStack;
        return (
            <Chip
                label={techStack}
                sx={{
                    fontWeight: '500',
                    fontSize: '14px',
                    borderRadius: '40px',
                    padding: '0px 4px',
                    border: '0.8px solid rgba(132, 132, 132, 0.5)',
                    backgroundColor: 'white',
                    fontSize: '12px',
                    color: 'rgba(0, 0, 0, 0.7)',
                }}
            />
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
            mt: '16px'
        }}>
            {techStackList.map((techStack) => {
                return (
                    <TechStackChip key={techStack} techStack={techStack} />
                );
            })}
        </Box>
    );
}

export default ProjectCard;
