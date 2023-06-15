import Swal from "sweetalert2";

export const URL_API = 'https://swapi.dev/api/planets';

const URL_API_FILMS = 'https://swapi.dev/api/films';

export const fetchFilms = async () => {
  try {
    const response = await fetch(URL_API_FILMS);
    const json = await response.json();
    return json.results.map(({ title, url }) => ({ url, title }));
  } catch (error) {
    return false;
  }
};

export const fetchDataAPI = async (films, url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    const planets = json.results.filter((data) => delete data.residents);
    planets.forEach((planet) => {
      // console.log(arrayFilms, planet.films);
      // para cada planeta, trocar cada filme na coluna pelo titulo do arrayFilms
      planet.films = planet.films.map(
        (film) => films.find(({ url }) => url === film).title,
      ).join(', ');

      planet.created = new Date(planet.created).toLocaleDateString('pt-BR');
      planet.edited = new Date(planet.edited).toLocaleDateString('pt-BR');
    });
    return {next: json.next, planets, count: json.count};
  } catch (error) {
    showError(error.message);
    return null;
  }
};


export const showError = (message) => {
  Swal.fire({
    title: 'Opps...',
    text: message,
    icon: "error",
    iconColor: 'var(--themeYellow)',
    customClass: 'glass',
    timer: 3000,
    timerProgressBar: true,
    color: 'white',
    confirmButtonColor: '#910201'
  })
}
