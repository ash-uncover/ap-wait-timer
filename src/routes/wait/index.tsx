import React from 'react'
import { Wait } from 'components/wait/Wait'
import DataSelectors from 'store/data/data.selectors'
import { useQuery } from 'lib/hooks/useQuery'
import { useSelector } from 'react-redux'

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
  if (isNaN(queryBackground as any) || queryBackground === '0') {
    index = Math.floor(Math.random() * (dataImages.length - 1)) + 1;
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

export const RouteWait = () => {

  // Hooks //

  const title = useQueryTitle()
  const subTitle = useQuerySubTitle()
  const background = useQueryBackground()
  const date = useQueryDate()
  const songs = useQuerySongs()

  // Rendering //

  return (
    <Wait
      title={title}
      subTitle={subTitle}
      background={background}
      date={date}
      songs={songs}
    />
  )
}