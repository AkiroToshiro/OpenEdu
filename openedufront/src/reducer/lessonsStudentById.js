import {
  FETCH_LESSONS_STUDENT_BY_ID,
  FETCH_LESSONS_STUDENT_BY_ID_FAIL,
  FETCH_LESSONS_STUDENT_BY_ID_SUCCESS,
} from "../actions/types";

const defaultState = {
  detailed: {},
  loading: true,
  error: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
	case FETCH_LESSONS_STUDENT_BY_ID:
	  return {
		...state,
		loading: true,
		error: null,
	  }
	case FETCH_LESSONS_STUDENT_BY_ID_SUCCESS:
	  return {
		...state,
		loading: false,
		detailed: action.payload
	  }
	case FETCH_LESSONS_STUDENT_BY_ID_FAIL:
	  return {
		...state,
		loading: true,
		error: action.error,
		detailed: {},
	  }
	default:
	  return state;
  }
}