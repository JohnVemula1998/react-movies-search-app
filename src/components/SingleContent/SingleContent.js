import { Badge } from '@mui/material';
import React from 'react';
import{ img_300, unavailable } from "../../config/config";
import ContentModel from '../ContentModal/ContentModel';
import './SingleContent.css';


const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
  return (
    <ContentModel media_type={media_type} id={id} >
    <>
    <div className='media'>
        <Badge badgeContent={vote_average} color={vote_average >= 7 ? 'primary' : 'secondary'}/>
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
       <b className="title">{title}</b>
       <span className='subTitle'>{media_type === 'tv' ? 'TV Series' : 'Movie'}
       <span className='subTitle'>{date}</span></span>
    </div>
    </>
   </ContentModel> 
  )
}

export default SingleContent