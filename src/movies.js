const API_KEY = "abfa9f67f148b55780a6395ab8ce9aca";

const movies = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  Action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  Comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  Horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  Romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documentry: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default movies;
