import React from 'react'
import gif from '../media/images/loading.gif'

export default function LoadingYoda() {
  return (
    <div className='LoadingYoda'>
      <img src={gif} alt="loading"/>
    </div>
  )
}
