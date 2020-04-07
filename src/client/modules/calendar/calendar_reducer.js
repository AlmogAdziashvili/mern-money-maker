export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_CALENDAR_SUCCESS':
      return {
        ...state,
        events: action.data,
      };
    default:
      return state;
  }
}
