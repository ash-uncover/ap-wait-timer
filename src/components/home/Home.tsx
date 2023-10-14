import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, ButtonSemantics, Input, Label, Panel, PanelFooter, Shell, ShellArea, ShellBackground, ShellNavbar, Title, TitleLevels } from '@uncover/react-commons'

import './Home.css'
import DataSelectors from 'store/data/data.selectors'
import { Thumbnail } from 'components/commons/thumbnail/Thumbnail'
import { ThumbnailContainer } from 'components/commons/thumbnail/ThumbnailContainer'
import { Song } from 'components/commons/song/Song'
import { SongList } from 'components/commons/song/SongList'
import { FormGroup, FormGroupDirections } from 'components/commons/form/FormGroup'
import { toInputDate } from 'lib/utils/TimeUtils'
import { HomeArea } from './HomeArea'
import { ArrayUtils } from '@uncover/js-utils'
import { useNavigate } from 'react-router-dom'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

export const Home = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const images = useSelector(DataSelectors.images)
  const songs = useSelector(DataSelectors.songs)

  const now = new Date()
  now.setHours(now.getHours() + 1)
  const {
    date: nowDate,
    time: nowTime
  } = toInputDate(now)

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [background, setBackground] = useState(0)
  const [date, setDate] = useState(nowDate)
  const [time, setTime] = useState(nowTime)
  const [selectedSongs, setSelectedSongs] = useState([])

  // Callbacks //

  function onTitleChange(event) {
    setTitle(event.value)
  }
  function onSubTitleChange(event) {
    setSubTitle(event.value)
  }
  function onBackgroundChange(event) {
    setBackground(event.value)
  }
  function onDateChange(event) {
    setDate(event.value)
  }
  function onTimeChange(event) {
    setTime(event.value)
  }
  function onSelectSong(event) {
    const songId = event.value
    const index = selectedSongs.indexOf(songId)
    if (index > -1) {
      const newSongs = selectedSongs.slice()
      newSongs.splice(index, 1)
      setSelectedSongs(newSongs)
    } else {
      const newSongs = [...selectedSongs, songId]
      setSelectedSongs(newSongs)
    }
  }

  function onReset() {
    setTitle('')
    setSubTitle('')
    setBackground(0)
    const now = new Date()
    now.setHours(now.getHours() + 1)
    const {
      date: nowDate,
      time: nowTime
    } = toInputDate(now)
    setDate(nowDate)
    setTime(nowTime)
    setSelectedSongs([])
  }

  function onStartClick() {
    const targetDate = new Date(`${date}T${time}`).getTime();
    const targetSongs = ArrayUtils.shuffle(selectedSongs.length ? selectedSongs : songs.map((song, i) => i))
    navigate(`/wait?title=${title}&subTitle=${subTitle}&background=${background}&date=${targetDate}&songs=${targetSongs}`)
  }

  // Rendering //

  return (
    <ShellArea className='home'>

      <HomeArea>
        <Title
          level={TitleLevels.H4}
          text='Texts'
        />

        <FormGroup
          style={{
            display: 'inline-flex',
            marginRight: '1rem'
          }}
          direction={FormGroupDirections.HORIZONTAL}
        >
          <Label>
            Title
          </Label>
          <Input
            onChange={onTitleChange}
            value={title}
          />
        </FormGroup>
        <FormGroup
          style={{
            display: 'inline-flex'
          }}
          direction={FormGroupDirections.HORIZONTAL}
        >
          <Label>
            Sub Title
          </Label>
          <Input
            onChange={onSubTitleChange}
            value={subTitle}
          />
        </FormGroup>
      </HomeArea>

      <HomeArea
        style={{
          flexGrow: 1,
          height: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Title
          text={`Background`}
          level={TitleLevels.H4}
        />
        <ThumbnailContainer>
          {images.map((image) => {
            const selected = image.id === background
            return (
              <Thumbnail
                key={image.id}
                alt={image.name}
                selected={selected}
                src={image.url}
                onClick={() => onBackgroundChange({ value: image.id })}
              />
            )
          })}
        </ThumbnailContainer>
      </HomeArea>

      <HomeArea>
        <Title
          text={`Timing`}
          level={TitleLevels.H4}
        />
        <FormGroup
          style={{
            display: 'inline-flex',
            marginRight: '1rem'
          }}
          direction={FormGroupDirections.HORIZONTAL}
        >
          <Label>
            Date
          </Label>
          <Input
            onChange={onDateChange}
            type='date'
            value={date}
          />
        </FormGroup>
        <FormGroup
          style={{
            display: 'inline-flex'
          }}
          direction={FormGroupDirections.HORIZONTAL}
        >
          <Label>
            Time
          </Label>
          <Input
            onChange={onTimeChange}
            type='time'
            value={time}
          />
        </FormGroup>
      </HomeArea>

      <HomeArea
        style={{
          flexGrow: 1,
          height: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Title
          text={`Songs (${selectedSongs.length})`}
          level={TitleLevels.H4}
        />
        <SongList>
          {songs.map((song) => {
            const selected = selectedSongs.includes(song.id)
            return (
              <Song
                key={song.name}
                selected={selected}
                text={song.name}
                onClick={() => onSelectSong({ value: song.id })}
              />
            )
          })}
        </SongList>
      </HomeArea>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          marginTop: '1rem'
        }}
      >
        <Button
          semantic={ButtonSemantics.DEFAULT}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          semantic={ButtonSemantics.PRINCIPAL}
          onClick={onStartClick}
        >
          Start Session
        </Button>
      </div>

    </ShellArea >
  )
}
