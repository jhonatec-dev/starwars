import { TextField } from '@mui/material';
import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export default function SearchName() {
  const { namePlanet, setNamePlanet } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setNamePlanet(value);
  };
  return (
    <div className="SearchName">
      <TextField
        label="Nome do planeta"
        variant="filled"
        data-testid="name-filter"
        id="inputName"
        type="text"
        value={ namePlanet }
        onChange={ handleChange }
        sx={ { width: '400px' } }
      />
    </div>
  );
}
