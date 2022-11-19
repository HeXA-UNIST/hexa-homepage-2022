// mui
import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";

// TODO: 레이아웃 제대로 짜기, 이미지에 inner shadow 주기, 마우스 hover, active 효과 주기
const ProjectCard = (props) => {
    const { name, startDate, endDate, techStack, thumbnailUrl } = props.project;
    return (
        <Card sx={{
            width: '320px',
            height: '400px',
            borderRadius: '10px',
            boxShadow: '0px 4px 18px 1px rgba(0, 0, 0, 0.15)',
            border: '0.8px solid #C5C5C5',
        }}>
            <CardMedia
                component="img"
                alt={name + " thumbnail"}
                height="200"
                image={thumbnailUrl}
            />
            <CardContent sx={{
                p: '36px 24px'
            }}>
                <Typography sx={{ mb: '4px' }}
                    fontSize='24px'
                    fontWeight={700}
                    letterSpacing="120%">
                    {name}
                </Typography>
                <Typography fontSize='14px'>
                    {new Date(startDate).toLocaleDateString()}
                    {endDate ? " ~ " + new Date(endDate).toLocaleDateString() : " ~ 진행중"}
                </Typography>
                <ProjectTechStackArea techStackList={techStack} />
            </CardContent>
        </Card>
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
                    <TechStackChip techStack={techStack} />
                );
            })}
        </Box>
    );
}

export default ProjectCard;
