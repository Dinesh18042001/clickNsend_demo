import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isTotalUserLoading: false,
  totalUserError: null,
  totalUser: {
    data: [],
  },
  isTestimonialLoading: false,
  testimonialError: null,
  testimonial: {
    data: [],
  },
};
const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // START LOADING

    startTotalUserLoading(state) {
      state.isTotalUserLoading = true;
    },
    startTestimonialLoading(state) {
      state.isTotalUserLoading = true;
    },

    // HAS ERROR START

    hasTotalUserError(state, action) {
      state.isTotalUserLoading = false;
      state.error = action.payload;
    },
    hasTestimonialError(state, action) {
      state.isTotalUserLoading = false;
      state.error = action.payload;
    },

    // HAS ERROR END

    // SET TOTAL USER

    setTotalUser(state, action) {
      state.isTotalUserLoading = false;
      state.totalUser.data = action.payload;
    },

    // SET TOTAL USER END

    // SET TESTIMONIAL

    setTestimonial(state, action) {
      state.isTestimonialLoading = false;
      state.testimonial.data = action.payload;
    },

    // SET TESTIMONIAL END

    // =====================================================
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startTotalUserLoading, startTestimonialLoading } = slice.actions;

// ----------------------------------------------------------------------

export const getTotalUser = () => {
  return async (dispatch) => {
    dispatch(slice.actions.startTotalUserLoading());
    try {
      const response = await axiosInstance.get("api/home/total-users");
      dispatch(slice.actions.setTotalUser(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasTotalUserError(error));
    }
  };
};

// ==========================================================

export const getTestimonial = () => {
  return async (dispatch) => {
    dispatch(slice.actions.startTestimonialLoading());
    try {
      const response = await axiosInstance.get("api/home/faq-testimonial");
      dispatch(slice.actions.setTestimonial(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasTestimonialError(error));
    }
  };
};
