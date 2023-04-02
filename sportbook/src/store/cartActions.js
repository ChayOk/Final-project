// Экспортирует двух создателей действий для обновления видов спорта и событий в Redux store. Например:

// sportsActions.js

export const updateSports = (sports) => ({
    type: 'UPDATE_SPORTS',
    sports
  });
  export const updateCountries = (countries) => ({
    type: 'UPDATE_COUNTRIES',
    countries
  });
  export const updateTournaments = (tournaments) => ({
    type: 'UPDATE_TOURNAMENTS',
    tournaments
  });
  export const updateEvents = (events) => ({
    type: 'UPDATE_EVENTS',
    events
  });
  export const updateOutcomesHome = (outcomesHome) => ({
    type: 'UPDATE_OUTCOMESHOME',
    outcomesHome
  });
  export const updateOutcomesDraw = (outcomesDraw) => ({
    type: 'UPDATE_OUTCOMESDRAW',
    outcomesDraw
  });
  export const updateOutcomesAway = (outcomesAway) => ({
    type: 'UPDATE_OUTCOMESAWAY',
    outcomesAway
  });