import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { URL_API, fetchDataAPI, fetchFilms } from '../helpers';

export const PlanetsContext = createContext();

const MINUS_ONE = -1;
const ONE = 1;

export function PlanetsArea({ children }) {
  const [apiData, setApiData] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [namePlanet, setNamePlanet] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState('Buscando dados');

  const sortPlanets = () => {
    setPlanets((prev) => {
      const sorted = prev.sort((a, b) => {
        if (a[sortCriteria.column] === 'unknown') { return ONE; }
        if (b[sortCriteria.column] === 'unknown') { return MINUS_ONE; }

        if (sortCriteria.sort === 'ASC') {
          return a[sortCriteria.column] - b[sortCriteria.column];
        }
        return b[sortCriteria.column] - a[sortCriteria.column];
      });

      return sorted;
    });
  };

  useEffect(() => {
    const getContent = async () => {
      //filmes
      const newFilms = await fetchFilms();
      if (!newFilms) {
        setProgress('Erro ao obter os dados dos filmes, tente novamente mais tarde.');
        setLoading(false);
        return;
      }
      let URL = URL_API;
      let next = null;
      do {
        const fetchContent = await fetchDataAPI(newFilms, URL);//await fetchDataAPI();
        //console.log(fetchContent);
        if (!fetchContent) {
          setProgress('Erro ao obter os dados dos planetas, tente novamente mais tarde.');
          setLoading(false);
          return;
        }
        setApiData((prev) => prev ? [...prev, ...fetchContent.planets] : [...fetchContent.planets]);
        next = fetchContent.next;
        URL = next;
      } while (next);
      setLoading(false);
    };
    getContent();
  }, []);

  useEffect(() => {
    if (apiData) {
      setPlanets(apiData.filter(
        (pl) => pl.name.toLowerCase().includes(namePlanet.toLowerCase()),
      ));

      filters.forEach((filter) => {
        // column - comparison - value
        setPlanets((prev) => prev.filter((planet) => {
          if (filter.comparison === 'maior que') {
            return +planet[filter.column] > +filter.value;
          }
          if (filter.comparison === 'menor que') {
            return +planet[filter.column] < +filter.value;
          }
          return +planet[filter.column] === +filter.value;
        }));
      });

      if (sortCriteria) {
        sortPlanets();
      }// if(sortCriteria)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData, namePlanet, filters, sortCriteria]);

  const values = useMemo(() => ({
    apiData,
    planets,
    namePlanet,
    setNamePlanet,
    filters,
    setFilters,
    setSortCriteria,
    loading,
    setLoading,
    progress,
  }), [apiData, planets, namePlanet, filters, loading, progress]);

  return (
    <PlanetsContext.Provider value={values}>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsArea.propTypes = {
  children: PropTypes.node,
}.isRequired;
