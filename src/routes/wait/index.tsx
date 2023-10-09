import React from 'react'
import WaitSession from 'components/wait/WaitSession'
import { useQuery, useSelector } from 'lib/hooks'
import DataSelectors from 'store/data/data.selectors'

const useQueryTitle = () => {
  const query = useQuery()
  const queryTitle = query.get('title')
  return queryTitle || ''
}

const useQuerySubTitle = () => {
  const query = useQuery()
  const queryTitle = query.get('subTitle')
  return queryTitle || ''
}

const useQueryBackground = () => {
  const query = useQuery()
  const queryBackground = query.get('background')
  const dataImages = useSelector(DataSelectors.images)
  let index = 0
  if (isNaN(queryBackground as any)) {
    index = Math.floor(Math.random() * dataImages.length);
  } else {
    index = Number(queryBackground)
  }
  return dataImages[index % dataImages.length].url
}

const useQueryDate = () => {
  const query = useQuery()
  const queryDate = query.get('date')
  if (isNaN(queryDate as any)) {
    return new Date().getTime()
  }
  return Number(queryDate)
}

const useQuerySongs = () => {
  const dataSongs = useSelector(DataSelectors.songs)
  const query = useQuery()
  const querySongs = query.get('songs')
  const list = (querySongs || '').split(',')
  return list.map(Number).map(i => dataSongs[i])
}

const RouteWait = () => {

  // Hooks //

  const title = useQueryTitle()
  const subTitle = useQuerySubTitle()
  const background = useQueryBackground()
  const date = useQueryDate()
  const songs = useQuerySongs()

  // Rendering //

  return (
    <WaitSession
      title={title}
      subTitle={subTitle}
      background={background}
      date={date}
      songs={songs}
    />
  )
}

export default RouteWait
