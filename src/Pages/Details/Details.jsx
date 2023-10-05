import React from 'react'
import '../Details/Style.scss'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from '../Details/cast/Cast'
import VideoSection from '../../Pages/Details/videosSection/VideosSection'
import Simler from '../Details/carousels/Similar'
import Recommendation from '../Details/carousels/Recommendation'
const Details = () => {

  const {mediaType, id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits,loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)


 

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSection data={data} loading={loading} />
      <Simler mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
      
    </div>
  )
}

export default Details