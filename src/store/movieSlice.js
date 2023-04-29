import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getMovies, getMoviesByPerson, getTrendingMovies,
} from '../utils/MoviesApi';
import {getSavedMovies, saveMovie, deleteMovie} from '../utils/MainApi';
// function to set initial state of search input if there is a cached search input in local storage
const cachedSearchInput = () => {
  const cachedInput = JSON.parse(localStorage.getItem('searchedMovies'))?.searchedMovies || {};
  if (Object.keys(cachedInput).length !== 0) {
    return Object.keys(cachedInput)[0];
  } else {
    return '';
  }
}
const initialState = {
  trendingMovies: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPageCount: JSON.parse(localStorage.getItem('searchedMovies'))?.totalPageCount || 0,
  searchCount: 0,
  searchedMovies: JSON.parse(localStorage.getItem('searchedMovies'))?.searchedMovies || {},
  currentQuery: cachedSearchInput(),
  searchBy: JSON.parse(localStorage.getItem('searchedMovies'))?.searchBy || 'bymovie',
  savedMovies: [],
};
// variable to store query string when we make a request to the server
let searchInput = '';

const movieSlice = createSlice({
  name: 'movie', initialState: initialState, reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }, setSearchCount(state) {
      state.searchCount += 1;
    }, setTotalPageCount(state, action) {
      state.totalPageCount = action.payload;
    }, setSearchBy(state, action) {
      state.searchBy = action.payload;
    }
  }, extraReducers(builder) {
    builder.addCase(fetchTrendingMovies.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMovies = action.payload.results;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(searchMovies.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.currentQuery = searchInput;
      // if there is no such query in the store, we create a new object with the query as a key
      if (!state.searchedMovies[searchInput]) {
        const movies = {
          [searchInput]: {
            [action.payload.page]: action.payload.results
          }
        }
        // we rewrite the state with the new object
        state.searchedMovies = {...movies};
      } else {
        state.searchedMovies[searchInput][action.payload.page] = action.payload.results
      }
      searchInput = '';
    });
    builder.addCase(searchMovies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      searchInput = '';
    });
    builder.addCase(searchMoviesByPerson.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(searchMoviesByPerson.fulfilled, (state, action) => {
      state.currentQuery = searchInput;
      // if there is no such query in the store, we create a new object with the query as a key
      if (!state.searchedMovies[searchInput]) {
        const movies = {
          [searchInput]: {
            [action.payload.page]: action.payload.results.reduce((acc, item) => {
              return [...acc, ...item.known_for]
            }, [])
          }
        }
        // we rewrite the state with the new object
        state.searchedMovies = {...movies};
      } else {

        state.searchedMovies[searchInput][action.payload.page] = action.payload.results.reduce((acc, item) => {
          return [...acc, ...item.known_for]
        }, [])
      }
      searchInput = '';
    });
    builder.addCase(searchMoviesByPerson.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      searchInput = '';
    });
    builder.addCase(fetchSavedMovies.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSavedMovies.fulfilled, (state, action) => {
      state.savedMovies = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(fetchSavedMovies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(likeMovie.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(likeMovie.fulfilled, (state, action) => {
      state.savedMovies = [...state.savedMovies, action.payload];
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(likeMovie.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(dislikeMovie.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(dislikeMovie.fulfilled, (state, action) => {
     state.savedMovies = state.savedMovies.filter(item => item._id !== action.payload._id);
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(dislikeMovie.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});
export const {
  setCurrentPage, setSearchCount, setTotalPageCount, setSearchBy
} = movieSlice.actions;
export const fetchTrendingMovies = createAsyncThunk('movie/getTrendingMovies', async () => {
  return await getTrendingMovies();
});

export const searchMovies = createAsyncThunk('movie/searchMovies', async ({
                                                                            query,
                                                                            page
                                                                          }) => {
  searchInput = query;
  return await getMovies(query, page);
});
export const searchMoviesByPerson = createAsyncThunk('movie/searchMoviesByPerson', async ({
                                                                                            query,
                                                                                            page
                                                                                          }) => {
  searchInput = query;
  return await getMoviesByPerson(query, page);
});

export const fetchSavedMovies = createAsyncThunk('movie/fetchSavedMovies', async () => {
  return await getSavedMovies();
});

export const likeMovie = createAsyncThunk('movie/likeMovie', async ({movie}) => {
  return await saveMovie(movie);
});

export const dislikeMovie = createAsyncThunk('movie/dislikeMovie', async ({id}) => {
  return await deleteMovie(id);
});

export default movieSlice.reducer;
