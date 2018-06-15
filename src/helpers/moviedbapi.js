export function getPopular(
    page = 1,
    api_key = "3a9e6cc51801d61e4f390cf3193bc623"
) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=ru-ru&page=${page}`
        ).then(response => {
            try {
                if (response.status !== 200)
                throw new Error('getPopularError');
                resolve(response.json());
            }
            catch (e) {
                reject(e.message);
            }
        });
    });
}

export function searchMovies(
    page = 1,
    query = "",
    api_key = "3a9e6cc51801d61e4f390cf3193bc623"    
) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ru-ru&query=${query}&page=${page}`
        ).then(response => {
            try {
                if (response.status !== 200)
                throw new Error('searchMoviesError');
                resolve(response.json());
            }
            catch (e) {
                reject(e.message);
            }
        });
    });
}

export function getGenreList() {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=3a9e6cc51801d61e4f390cf3193bc623&language=ru-ru`
        ).then(response => {
            try {
                if (response.status !== 200)
                throw new Error('getDetailsError');
                resolve(response.json());
            }
            catch (e) {
                reject(e.message);       
            }
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
            try {
                if (response.status !== 200)
                throw new Error('getDetailsError');
                resolve(response.json());
            }
            catch (e) {
                reject(e.message);       
            }
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

