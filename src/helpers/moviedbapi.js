export function getPopular(
    page = 1,
    api_key = "3a9e6cc51801d61e4f390cf3193bc623"
) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=ru-ru&page=${page}`
        ).then(response => {
            resolve(response.json());
        });
    });
}

export function getDetails(
    movieID,
    api_key = "3a9e6cc51801d61e4f390cf3193bc623"
) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${api_key}&language=ru-ru`
        ).then(response => {
            resolve(response.json());
        });
    });
}

export function getSimilarMovies(
    movieID,
    api_key = "3a9e6cc51801d61e4f390cf3193bc623"
) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${api_key}&language=ru-ru&page=1`
        ).then(response => {
            resolve(response.json());
    });
});
}

export function consoleResponse(response) {
    console.log(response);
}

//https://api.themoviedb.org/3/movie/550?api_key=8045d0c665abeac3296af280966d176e

//
