import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isJobPostLoading: false,
  jobPostError: null,
  jobPost: {
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

  isJobDeleteLoading: false,
  jobDeleteError: null,
  jobDelete: {
    data: [],
    pageCount: 0,
    dataCount: 0,
    page: 1,
    pageSize: 10,
  },
};

const slice = createSlice({
  name: "customerJob",
  initialState,
  reducers: {
    // START LOADING
    startJobPostLoading(state) {
      state.isJobPostLoading = true;
    },

    startJobHistoryLoading(state) {
      state.isJobActiveLoading = true;
    },

    startJobDeleteLoading(state) {
      state.isJobDeleteLoading = true;
    },

    // HAS ERROR START
    hasJobPostError(state, action) {
      state.isJobPostLoading = false;
      state.error = action.payload;
    },

    hasJobHistoryError(state, action) {
      state.isJobActiveLoading = false;
      state.error = action.payload;
    },

    hasJobDeleteError(state, action) {
      state.isJobDeleteLoading = false;
      state.error = action.payload;
    },

    // HAS ERROR END

    // SET JOB Post
    setJobPost(state, action) {
      state.isJobPostLoading = false;
      state.jobPost.data = action.payload.data;
      state.jobPost.dataCount = action.payload.data.length;
      state.jobPost.pageCount = action.payload.meta?.last_page;
    },

    setJobPostPage(state, action) {
      state.jobPost.page = action.payload;
    },
    // SET JOB END

    // =======================================================

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
    setJobHistoryPageSize(state, action) {
      state.jobHistory.pageSize = action.payload;
    },
    // SET JOB HISTORY END
    // ========================================================
    // SET JOB DELETE
    setJobDelete(state, action) {
      state.isJobDeleteLoading = false;
      state.jobDelete.data = action.payload.data;
      state.jobDelete.dataCount = action.payload.data.length;
      state.jobDelete.pageCount = action.payload.meta?.last_page;
    },

    setJobDeletePage(state, action) {
      state.jobDelete.page = action.payload;
    },
    // SET JOB END

    // =====================================================
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startJobPostLoading,
  setJobPostPage,
  setJobHistoryPage,
  setJobHistoryPageSize,
  setJobDeletePage,
} = slice.actions;

// ----------------------------------------------------------------------

export const getJobPost = (params) => {
  return async (dispatch) => {
    dispatch(slice.actions.startJobPostLoading());
    try {
      const response = await axiosInstance.get("api/auth/jobs/list", {
        params: {
          status: "post",
          type: "customer",
          ...params,
        },
      });
      dispatch(slice.actions.setJobPost(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobPostError(error));
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
          type: "customer",
          ...params,
        },
      });
      dispatch(slice.actions.setJobHistory(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobHistoryError(error));
    }
  };
};

export const getJobDelete = (params) => {
  return async (dispatch) => {
    dispatch(slice.actions.startJobDeleteLoading());
    try {
      const response = await axiosInstance.get("api/auth/jobs/list", {
        params: {
          status: "pending",
          type: "customer",
          is_deleted: 1,
          ...params,
        },
      });
      dispatch(slice.actions.setJobDelete(response?.data?.view_data));
    } catch (error) {
      dispatch(slice.actions.hasJobDeleteError(error));
    }
  };
};
