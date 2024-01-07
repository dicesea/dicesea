/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { IUser } from "@/interfaces";

export interface MarketplaceState {
  isLoading: boolean;
  user: IUser | null;
}

const initialState: MarketplaceState = {
  isLoading: false,
  user: null,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLocalStorage: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
    },
  },
});

export const getLocalStorage = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Retrieve the user JSON string from local storage
    const user = localStorage.getItem("user");

    // If a user JSON string is found, parse it into an object
    if (user) {
      const userObject = JSON.parse(user);
      dispatch(setLocalStorage(userObject));
    }

    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error setting user from local storage:", error);
    dispatch(setLoading(false));
  }
};

export const { setLoading, setLocalStorage } = marketplaceSlice.actions;

export const selectMarketplaceState = (state: RootState) => state.marketplace;

export default marketplaceSlice.reducer;
