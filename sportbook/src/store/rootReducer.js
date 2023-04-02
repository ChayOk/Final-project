// Обрабатывает два действия и соответствующим образом обновляет состояние хранилища. Например:

// rootReducer.js


const initialState = {
    sports: [],
    countries: [],
    tournaments: [],
    events: [],
    outcomesHome: [],
    outcomesDraw: [],
    outcomesAway: [],
    cart: { items: [] }
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SPORTS':
        return { ...state, sports: action.sports };
      case 'UPDATE_COUNTRIES':
        return { ...state, countries: action.countries };
      case 'UPDATE_TOURNAMENTS':
        return { ...state, tournaments: action.tournaments };
      case 'UPDATE_EVENTS':
        return { ...state, events: action.events };
      case 'UPDATE_OUTCOMESHOME':
        return { ...state, outcomesHome: action.outcomesHome };
      case 'UPDATE_OUTCOMESDRAW':
        return { ...state, outcomesDraw: action.outcomesDraw };
      case 'UPDATE_OUTCOMESAWAY':
        return { ...state, outcomesAway: action.outcomesAway };
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [
              ...state.cart.items,
              {
                eventName: action.payload.eventName,
                outcomeCoeff: action.payload.outcomeCoeff
              }
            ]
          }
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;