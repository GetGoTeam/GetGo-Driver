import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfomation: null,
  tripDetails: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInfomation: (state, action) => {
      state.travelTimeInfomation = action.payload;
    },
    setTripDetails: (state, action) => {
      state.tripDetails = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInfomation,
  setTripDetails,
} = navSlice.actions;

// Selectors
export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTimeInfomation = state =>
  state.nav.travelTimeInfomation;
export const selectTripDetails = state => state.nav.tripDetails;

export default navSlice.reducer;
