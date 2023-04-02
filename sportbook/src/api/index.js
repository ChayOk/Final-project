// src/api/index.js

import axios from 'axios';

const API_URL = 'http://sportbook.loc/';

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const placeBet = async (eventId, bet) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/bets`, bet);
  return response.data;
};