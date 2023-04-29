import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  signIn, signUp, verifyUser, logOut, editUserProfile, getCurrentUser,
} from '../utils/MainApi';

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  isEditUserProfile: false,
  status: 'idle',
  error: null,
};


const userSlice = createSlice({
  name: 'user', initialState: initialState, reducers: {
    setIsLoggedInTrue(state) {
      state.isLoggedIn = true;
    }, setIsLoggedInFalse(state) {
      state.isLoggedIn = false;
    }, setIsEditUserProfileTrue(state) {
      state.isEditUserProfile = true;
    }, setIsEditUserProfileFalse(state) {
      state.isEditUserProfile = false;
    }
  }, extraReducers(builder) {
    builder.addCase(checkUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(logOutUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.error = null;
      state.status = 'idle';
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});


export const checkUser = createAsyncThunk('user/checkUser', async () => {
  return await verifyUser()
});
export const signInUser = createAsyncThunk('user/signInUser', async ({email, password}) => {
  await signIn(email, password);
  return await getCurrentUser()
});
export const signUpUser = createAsyncThunk('user/signUpUser', async ({email, password, name}) => {
  return await signUp(name, email, password);
});
export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
  return await logOut();
});

export const updateUserProfile= createAsyncThunk('user/editUserProfileUser', async ({name, email}) => {
  return await editUserProfile(name, email);
});

export const {setIsLoggedInTrue, setIsLoggedInFalse, setIsEditUserProfileFalse, setIsEditUserProfileTrue} = userSlice.actions;

export default userSlice.reducer;
