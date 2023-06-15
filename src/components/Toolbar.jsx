import { Check, Delete, Search, SearchOff, SignalCellularAlt } from '@mui/icons-material';
import {
  Button,
  IconButton, TextField, ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { playClickSound } from '../helpers/playAudio';
import SelectWithLabel from './SelectWithLabel';

const initialColumns = [
  'population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water',
];

export default function ToolBar() {
  const { setFilters, filters, setSortCriteria } = useContext(PlanetsContext);
  const [column, setColumn] = useState(initialColumns[0]);
  const [columnSort, setColumnSort] = useState(initialColumns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [optColumns, setOptColumns] = useState(initialColumns);
  const [sort, setSort] = useState('ASC');

  const handleClick = () => {
    playClickSound();
    const newFilter = {
      column,
      comparison,
      value,
    };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setOptColumns((prevOpt) => {
      const optFiltereds = prevOpt.filter((opt) => opt !== column);
      setColumn(optFiltereds[0]); // seta a option como a primeira opção
      return optFiltereds;
    }); // remover o escolhido
    setValue(0);
    setComparison('maior que');
  };

  const handleSortChange = (_event, newValue) => {
    playClickSound();
    if (newValue !== null) { setSort(newValue); }
  };

  const handleClickSort = () => {
    playClickSound();
    setSortCriteria({
      column: columnSort,
      sort,
    });
  };

  const removeFilters = () => {
    // remove tudo
    playClickSound();
    setFilters([]); // limpou o array de filtros
    setOptColumns(() => {
      setColumn(initialColumns[0]);
      return initialColumns;
    });
  };

  const removeFilter = (indexToRem) => {
    // remove um filtro
    playClickSound();
    setFilters((prev) => {
      const newFilters = prev.filter((_elm, index) => index !== indexToRem);
      // percorrer as options novamente e redefinir as posições
      // se o array de options não estiver contido no filtros, então manda ele pra lá
      const newOptions = initialColumns.filter(
        (opt) => !newFilters.some((f) => f.column === opt),
      );

      setOptColumns(newOptions);
      setColumn(newOptions[0]);

      return newFilters;
    });
  };

  return (
    <div className="ToolBar--container">
      <div className="ToolBar">
        <SelectWithLabel
          id="selectColumn"
          data-testid="column-filter"
          label="Coluna"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
          options={ optColumns }
        />

        <SelectWithLabel
          id="selectColumn"
          data-testid="column-filter"
          label="Comparação"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
          options={ ['maior que', 'menor que', 'igual a'] }
        />
        <TextField
          id="inputValue"
          type="number"
          label="Valor"
          variant="filled"
          data-testid="value-filter"
          value={ value }
          sx={ { width: '150px' } }
          onChange={ ({ target }) => setValue(target.value) }
        />
        <IconButton
          onClick={ handleClick }
          disabled={ optColumns.length < 1 }
          color="primary"
        >
          <Search />
        </IconButton>
        <IconButton
          onClick={ removeFilters }
          color="primary"
        >
          <SearchOff />
        </IconButton>
      </div>
      <div className="ToolBar">
        <SelectWithLabel
          id="selectSort"
          data-testid="column-sort"
          label="Coluna"
          value={ columnSort }
          onChange={ ({ target }) => setColumnSort(target.value) }
          options={ initialColumns }
        />

        <ToggleButtonGroup
          value={ sort }
          exclusive
          onChange={ handleSortChange }
          aria-label="Platform"
          color="secondary"
        >
          <ToggleButton
            aria-label="ASC"
            value="ASC"
            className={ sort === 'ASC' ? 'pressedButton' : 'unpressedButton' }
          >

            <SignalCellularAlt />
          </ToggleButton>
          <ToggleButton
            aria-label="DESC"
            value="DESC"
            className={ sort === 'DESC' ? 'pressedButton' : 'unpressedButton' }
          >

            <SignalCellularAlt sx={ { transform: 'scale(-1, 1)' } } />
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          onClick={ handleClickSort }
          variant="outlined"
          startIcon={ <Check /> }
        >
          Ordenar
        </Button>

      </div>
      <div className="ToolBar__filters">
        {
          filters.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <span>{`${filter.column} ${filter.comparison} ${filter.value} `}</span>
              <IconButton color="primary" onClick={ () => removeFilter(index) }>
                <Delete />
              </IconButton>
            </div>
          ))
        }
      </div>

    </div>
  );
}
