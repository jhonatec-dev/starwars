import { GitHub, LinkedIn, YouTube } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <div className='Footer'>
      <p>Developed by <a href='https://jhonatec.dev'>Jhonatec</a> in 23/Jun</p>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button startIcon={<GitHub/>} href='https://github.com/jhonatec-dev' target='_blank'>GitHub</Button>
        <Button startIcon={<LinkedIn/>} href='https://linkedin.com/in/jhonatec' target='_blank'>Linkedin</Button>
        <Button startIcon={<YouTube/>} href='https://youtube.com/c/jhonatec' target='_blank'>YouTube</Button>
      </ButtonGroup>
    </div>
  )
}
