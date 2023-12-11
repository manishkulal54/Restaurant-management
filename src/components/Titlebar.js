import React from 'react'

export default function Titlebar(props) {
  return (
    <div className='titlebar'>{props.title.replace(/^[a-z]/, match => match.toUpperCase())}</div>
  )
}
