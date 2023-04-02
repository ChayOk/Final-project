// Чтобы сохранить данные API в хранилище Redux, вам нужно будет отправить действия для обновления состояния хранилища при получении данных из API. Вот пример того, как вы можете изменить код для хранения данных о спорте и событиях в Redux store:

// 1. Создайте файл действий, который экспортирует двух создателей действий для обновления видов спорта и событий в Redux store. Например:

// sportsActions.js

export const updateSports = (sports) => ({
    type: 'UPDATE_SPORTS',
    sports
  });
  
  export const updateEvents = (events) => ({
    type: 'UPDATE_EVENTS',
    events
  });

  
// 2. Создайте файл-редуктор, который обрабатывает два действия и соответствующим образом обновляет состояние хранилища. Например:

// rootReducer.js

const initialState = {
    sports: [],
    events: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SPORTS':
        return { ...state, sports: action.sports };
      case 'UPDATE_EVENTS':
        return { ...state, events: action.events };
      default:
        return state;
    }
  };
  
  export default rootReducer;

// 3. Создайте файл хранилища, который объединяет корневой редуктор и применяет любое промежуточное программное обеспечение (например, Redux Thunk). Например:

// store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// 4. Импортируйте два action creators и Redux store в свой компонент SportList и используйте их для обновления состояния хранилища при получении данных API. Например:

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateSports, updateEvents } from './sportsActions';

class SportList extends React.Component {
  componentDidMount() {
    axios.get(`http://sportbook.loc/?api=sports`)
      .then(res => {
        this.props.updateSports(res.data);
      });

    axios.get(`http://localhost:8081/api/events`)
      .then(res => {
        this.props.updateEvents(res.data);
      });
  }

  render() {
    return (
      <ul>
        { this.props.sports.map(sport => 
          <li className="sportItem" key={sport.id}>
            <button className="sportBtn">
              <div>{sport.name}</div>
            </button>
            <div>
              {/* <CountryList /> */}
            </div>
          </li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  sports: state.sports,
  events: state.events
});

const mapDispatchToProps = {
  updateSports,
  updateEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(SportList);

// В этом измененном коде компонент SportList получает спортивные данные из хранилища Redux с помощью функции mapStateToProps. Когда компонент монтируется, он отправляет порты обновлений и действия updateEvents для сохранения данных в хранилище Redux. Хранилище Redux определено в store.js файл, который объединяет rootReducer и применяет промежуточное программное обеспечение.