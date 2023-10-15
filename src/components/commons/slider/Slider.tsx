import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './Slider.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface SliderProperties {
  className?: string
  style?: CSSProperties

  max: number
  min?: number
  value: number
  onChange: (event: { value: number }) => void
}
export const Slider = ({
  className,
  style,

  max,
  min = 0,
  value,
  onChange,
}: SliderProperties) => {

  // Hooks //

  const rail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return unregisterEvents
  }, [])

  // Events //

  function onRailClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const mouseX = event.pageX
    changeFromX(mouseX)
  }
  function onSpotMouseDown() {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
  }
  function onMouseUp() {
    unregisterEvents()
  }
  function onMouseMove(event: MouseEvent) {
    const mouseX = event.pageX
    changeFromX(mouseX)
  }
  function changeFromX(x: number) {
    if (rail.current) {
      const container = rail.current.getBoundingClientRect()
      const containerWidth = container.width
      const containerX = container.x

      const delta = Math.min(Math.max(0, x - containerX), containerWidth)
      const deltaPerc = delta * 100 / containerWidth
      const newValue = min + deltaPerc * 100 / (max - min)
      onChange({ value: newValue })
    }
  }
  function unregisterEvents() {
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
  }

  // Rendering //

  const classes = new ClassBuilder(['ap-slider', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div
        ref={rail}
        className='ap-slider_rail'
        onClick={onRailClick}
      >
        <div
          className='ap-slider_pusher'
          style={{
            width: `${(value  * (max - min) / 100)}%`
          }}
        />
        <div
          className='ap-slider_spot'
          title={String(value)}
          onMouseDown={onSpotMouseDown}
        />
      </div>
    </div>
  )
}
