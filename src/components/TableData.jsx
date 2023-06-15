import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useWindowSize } from '@uidotdev/usehooks';
import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { playClickSound } from '../helpers/playAudio';
import LoadingYoda from './LoadingYoda';
import WaitMessage from './WaitMessage';

const initialColumns = [
  'name', 'population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water',
];
const getLabelFromCol = (col) => {
  // const colWitouthSpace = col.replaceAll('_', ' ')
  const arrayWords = col.split('_');
  return arrayWords.reduce((result, word)  => {
    if(result.length > 0){
      result += ' ' +  word[0].toUpperCase() + word.substring(1);
    } else{
      result = word[0].toUpperCase() + word.substring(1);
    }
    return result;
  }, '');
}

function Row(props){
  //State
  const [open, setOpen] = useState(false);
  //Props
  const {planet, columns} = props;
  const detailsCols = Object.keys(planet).filter((key) => !columns.some((col) => col === key) );
  const handleIconClick = () => {
    playClickSound();
    setOpen(!open)
  }
  return(
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={handleIconClick}>
        <TableCell>
          <IconButton color='primary'>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {
          columns.map((col) => <TableCell align='right' key={col}>{planet[col]}</TableCell>)
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{padding: '20px 0'}}>
              <h3>Planet Details</h3>
              <Table>
                <TableBody>
                {
                  detailsCols.map((col) => (
                    <TableRow key={col}>
                      <TableCell>{getLabelFromCol(col)}</TableCell>
                      <TableCell> {
                        col === "url" 
                        ? (<a href={planet[col]}>Click here</a>)
                        : planet[col]
                      }
                      </TableCell>
                    </TableRow>
                  ))
                }
                </TableBody>
              </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )

}

export default function TableData() {
  const {planets, loading} = useContext(PlanetsContext)
  const [columns, setColumns] = useState(initialColumns);
  const [style, setStyle] = useState({});

  const size = useWindowSize();
  // Effect
  useEffect(() => {
    const {width} = size;
    if(width < 1000){
      setColumns(initialColumns.slice(0,1))
      setStyle({fontSize: '24px', color: 'var(--secondaryTextColor)'})
    } else{
      setColumns(initialColumns);
      setStyle({fontSize: '16px'})
    }
  }, [size])

    return (
      <>
      { planets.length < 1 ? <WaitMessage />
      : (
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              {
                columns.map((col) => <TableCell key={col} align='right' style={style}>{getLabelFromCol(col)}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              planets && 
              planets.map((planet) => <Row key={planet.name} planet={planet} columns={columns}/>)
            }
          </TableBody>
        </Table>
      )
      }
        {loading && <div className='Loading'> <LoadingYoda /></div>}
        </>
    );
  
  
  
}
