// src/store/actions.js

import { fetchEvents as fetchEventsAPI, placeBet as placeBetAPI } from '../api';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const PLACE_BET = 'PLACE_BET';

export const fetchEvents = () => async (dispatch) => {
const events = await fetchEventsAPI();
dispatch({ type: FETCH_EVENTS, payload: events });
};

export const placeBet = (eventId, bet) => async (dispatch) => {
const result = await placeBetAPI(eventId, bet);
// TODO: Handle the result (e.g. show a success message)
};