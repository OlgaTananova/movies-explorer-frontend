import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isUserChecked: false,
  showError: false,
  errorMessage: '',
  isLoading: false,
  screenWidth: window.innerWidth,
  windowOuterWidth: window.outerWidth,
  isInfoToolTipOpen: false,
  status: 'idle',
}

const appSlice = createSlice({
  name: 'app', initialState, reducers: {
    setIsLoadingTrue(state) {
      state.isLoading = true;
    }, setIsLoadingFalse(state) {
      state.isLoading = false;
    }, setScreenWidth(state, action) {
      state.screenWidth = action.payload;
    }, setWindowOuterWidth(state, action) {
      state.windowOuterWidth = action.payload;
    }, setShowErrorTrue(state, action) {
      state.showError = true;
      state.errorMessage = action.payload;
      state.isInfoToolTipOpen = true;
    }, setShowErrorFalse(state) {
      state.showError = false;
      state.errorMessage = "";
      state.isInfoToolTipOpen = false;
    },
    setInfoToolTipOpenTrue(state) {
      state.isInfoToolTipOpen = true;
    },
    setInfoToolTipOpenFalse(state) {
      state.isInfoToolTipOpen = false;
    },
    onLogin(state) {
      state.isUserChecked = true;
    },
    onLogout(state) {
      state.isUserChecked = false;
      state.errorMessage = '';
      state.isLoading = false;
      state.searchCount = 0;
      state.showError = false;
      state.status = 'idle';
    },
    setIsUserCheckedTrue(state) {
      state.isUserChecked = true;
    },
    setIsUserCheckedFalse(state) {
      state.isUserChecked = false;
    },
  }
})

export const {
  onLogout,
  onLogin,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorFalse,
  setShowErrorTrue,
  setScreenWidth,
  setWindowOuterWidth,
  setInfoToolTipOpenTrue,
  setInfoToolTipOpenFalse,
  setIsUserCheckedTrue,
  setIsUserCheckedFalse,
} = appSlice.actions;

export default appSlice.reducer;
