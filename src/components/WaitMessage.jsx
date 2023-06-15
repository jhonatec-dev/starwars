import React, { useContext } from 'react'
import { PlanetsContext } from '../context/PlanetsContext'

export default function WaitMessage() {
  const {progress} = useContext(PlanetsContext)
  return (
    <div className='WaitMessage'>
      <h4>{progress}</h4>
      </div>
  )
}
