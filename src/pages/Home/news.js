import * as React from 'react';
import { useEffect, useRef, useState } from "react";



import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';







import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewsList, selectNewsList } from '../../features/news/news_reducer';
const News = () => {
    const dispatch = useDispatch();
    const news = useSelector(selectNewsList);
    useEffect(() => {
      dispatch(loadNewsList(3));
    }, []);
  
    // const news = ["[공지] HeXA 13기 모집 (2023.00.00 - 2023.00.00)", "[소식] HeXA 15대 회장에 20학번 김선욱(주전공: 산업공학, 복수전공: 디자인) 선출","[수상] 제1회 UNIST-POSTECH-KAIST 데이터 사이언스 경진대회 죠르디 팀 은상"]
  
    return (
      <div className="newsContainer">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
          <Typography variant="h6" className='newsTitle' noWrap component="a" href="/" sx={{
            fontStyle: "normal",
            mt: 2,
            mb: 3,
            mr: 20,
            ml: 20,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Noto Sans KR',
            fontWeight: 900,
            color: 'inherit',
            textDecoration: 'none',
            color: 'white'
          }}
          >
            최신 소식
          </Typography>
        </Box>
        {news.map((item, index) => {
          if(index!=0)  return <Box className='newsletter' key={item.id}>{item.text}</Box>;
          else return <Box className='newsletter1'key={item.id}>{item.text}</Box>
        })}
      </div >
  
    )
  }
export default News;