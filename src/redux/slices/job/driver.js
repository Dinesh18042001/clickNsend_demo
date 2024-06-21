import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isJobAlertLoading: false,
  jobAlertError: null,
  jobAlert: {
    data: [],
    pageCount: 0,
    dataCount: 0,
    page: 1,
    pageSize: 10,
  },
  isJobActiveLoading: false,
  jobActiveError: null,
  jobActive: {
    data: [],
    pageCount: 0,
    dataCount: 0,
    page: 1,
    pageSize: 10,
  },
  isJobHistoryLoading: false,
  jobHistoryError: null,
  jobHistory: {
    data: [],
    pageCount: 0,
    dataCount: 0,
    page: 1,
    pageSize: 10,
  },
};

const slice = createSlice({
  name: "driverJob",
  initialState,
  reducers: {
    // START LOADING
    startJobAlertLoading(state) {
      state.isJobAlertLoading = true;
    },

    startJobActiveLoading(state) {
      state.isJobActiveLoading = true;
    },
    startJobHistoryLoading(state) {
      state.isJobActiveLoading = true;
    },

    // HAS ERROR START
    hasJobAlertError(state, action) {
      state.isJobAlertLoading = false;
      state.error = action.payload;
    },

    hasJobActiveError(state, action) {
      state.isJobActiveLoading = false;
      state.error = action.payload;
    },
    hasJobHistoryError(state, action) {
      state.isJobActiveLoading = false;
      state.error = action.payload;
    },

    // HAS ERROR END

    // SET JOB ALERT
    setJobAlert(state, action) {
      state.isJobAlertLoading = false;
      state.jobAlert.data = action.payload.data;
      state.jobAlert.dataCount = action.payload.data.length;
      state.jobAlert.pageCount = action.payload.meta?.last_page;
    },

    setJobAlertPage(state, action) {
      state.jobAlert.page = action.payload;
    },
    // SET JOB END

    // ====================================================

    // SET JOB ALERT
    setJobActive(state, action) {
      state.isJobActiveLoading = false;
      state.jobActive.data = action.payload.data;
      state.jobActive.dataCount = action.payload.data.length;
      state.jobActive.pageCount = action.payload.meta?.last_page;
    },

    setJobActivePage(state, action) {
      state.jobActive.page = action.payload;
    },
    // SET JOB END

    // =====================================================

    // SET JOB hISTORY
    setJobHistory(state, action) {
      state.isJobHistoryLoading = false;
      state.jobHistory.data = action.payload.data;
      state.jobHistory.dataCount = action.payload.data.length;
      state.jobHistory.pageCount = action.payload.meta?.last_page;
    },

    setJobHistoryPage(state, action) {
      state.jobHistory.page = action.payload;
    },
    // SET JOB HISTORY END

    // ========================================================
  },
});

// Reducer
export default slice.reducer;
// export default{ sliceActive.reducer};

// Actions
export const {
  startJobAlertLoading,
  setJobAlertPage,
  setJobActivePage,
  setJobHistoryPage,
} = slice.actions;

// ----------------------------------------------------------------------

export const getJobAlert = (params) => {
  return async (dispatch) => {
    dispatch(slice.actions.startJobAlertLoading());
    try {
      const response = await axiosInstance.get("api/auth/jobs/list", {
        params: {
          status: "pending",
          type: "driver",
          ...params,
        },
      });
      dispatch(slice.actions.setJobAlert(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobAlertError(error));
    }
  };
};

export const getJobActive = (params) => {
  return async (dispatch) => {
    dispatch(slice.actions.startJobActiveLoading());
    try {
      const response = await axiosInstance.get("api/auth/jobs/list", {
        params: {
          status: "active",
          type: "driver",
          ...params,
        },
      });
      dispatch(slice.actions.setJobActive(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobActiveError(error));
    }
  };
};
export const getJobHistory = (params) => {
  return async (dispatch) => {
    dispatch(slice.actions.startJobHistoryLoading());
    try {
      const response = await axiosInstance.get("api/auth/jobs/list", {
        params: {
          status: "history",
          type: "driver",
          ...params,
        },
      });
      dispatch(slice.actions.setJobHistory(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobHistoryError(error));
    }
  };
};
