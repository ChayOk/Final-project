/*Настройте проект
Создайте новый проект React, используя предпочитаемый вами метод (например, create-react-app). Установите необходимые зависимости: react, react-dom, react-router-dom, redux, react-redux и axios.

Настройте API
Настройте серверный API, который будет предоставлять данные о спортивных событиях и коэффициентах. Вы можете использовать фреймворк, такой как Express, и базу данных, такую как MongoDB, для хранения данных. Создайте конечные точки, которые будут возвращать данные в формате JSON.

Создайте хранилище Redux
Создайте хранилище Redux с начальным состоянием, которое будет содержать пустой список событий. Определите функцию-редуктор, которая будет обрабатывать действие FETCH_EVENTS, которое будет отправлено, когда компонент монтируется и запрашивает данные из API.*/



// src/store/index.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  events: [],
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;


// src/store/reducers.js

import { FETCH_EVENTS } from '../actions';

const initialState = {
  events: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default rootReducer;


// Создайте запросы API
// Создайте модуль, который будет выполнять запросы API к серверной части. Используйте <url> для отправки HTTP-запросов и получения данных в формате JSON.


// src/api/index.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const placeBet = async (eventId, bet) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/bets`, bet);
  return response.data;
};


// Создайте компоненты пользовательского интерфейса
// Создайте компоненты пользовательского интерфейса, которые будут составлять букмекерскую контору. Вы можете использовать React Router для определения маршрутов и обработки навигации между страницами.


// src/components/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <div>
      <h1>Sportsbook</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Odds: {event.odds}</p>
            <button>Place Bet</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;


// src/components/EventPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { placeBet } from '../api';

const EventPage = () => {
  const { eventId } = useParams();

  const handlePlaceBet = async () => {
    const bet = {
      // TODO: Get bet data from form inputs
    };
    await placeBet(eventId, bet);
  };

  return (
    <div>
      <h1>Event Page</h1>
      <form onSubmit={handlePlaceBet}>
    <label>
      Bet Amount:
      <input type="number" name="amount" />
    </label>
    <br />
    <label>
      Bet Type:
      <select name="type">
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
    </label>
    <br />
    <button type="submit">Place Bet</button>
  </form>
</div>
);
};

export default EventPage;


// 6. Настройте маршруты
// Используйте React Router для определения маршрутов и обработки навигации между страницами.


// src/App.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventPage from './components/EventPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/events/:eventId" component={EventPage} />
            </Switch>
        </Router>
    );
};

export default App;



// 7. Подключите компоненты к хранилищу Redux
// Используйте хук useSelector для выбора данных из хранилища Redux и хук useDispatch для отправки действий.


// src/components/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/actions';

const HomePage = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    return (
        <div>
            <h1>Sportsbook</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <p>Odds: {event.odds}</p>
                        <button>Place Bet</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;


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


// Это базовый пример того, как вы могли бы создать мини-версию букмекера, используя React, React Router и Redux. Конечно, это только отправная точка, и вам, вероятно, потребуется добавить больше функций, чтобы сделать его полнофункциональным букмекером.