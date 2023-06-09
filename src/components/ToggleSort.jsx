import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

export default function ToggleSort() {
  return (
    <ToggleButtonGroup
      color="primary"
      value={ alignment }
      exclusive
      onChange={ handleChange }
      aria-label="Platform"
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  );
}
