/*Работающая версия компонента, с попыткой получить данные через роут*/
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateEvents} from '../store/sportsActions';
import OutcomesHome from './OutcomesHome';
import OutcomesAway from './OutcomesAway';
import '../Events.css';

const mapStateToProps = (state) => ({
  events: state.events,
});
  
const mapDispatchToProps = {
  updateEvents
};

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedEventIds: new Set()
    };
  }

  componentDidMount() {
    axios.get('http://sportbook.loc/?api=events')
    // axios.get('http://localhost:8081/api/events')
      .then(res => {
        this.props.updateEvents(res.data);
      });
  }

  render() {
    const idArray = window.location.pathname.split('/');
    const countryName = idArray[2];
    const tournamentId = idArray[3];
    const filteredEvents = Array.isArray(this.props.events) ? this.props.events.filter(event => event.tournament_id === Number(tournamentId) && event.country_name === countryName && !this.state.renderedEventIds.has(event.event_id)) : [];

    return (
      <>
          {filteredEvents.map(event => (
            <div className="eventRow" key={event.event_id}>
              <div className="start_time">
                <p key={event.start_time}>{event.start_time}</p>
              </div>    
              <div className="event_tournament">
                <div className="titleBlock" key={event.event_name}>
                  {event.event_name}
                  <p key={event.tournament_name}>{event.tournament_name}</p>
                </div>
              </div>
              <div className="odds">
                <div className="oddsNumber">
                  <OutcomesHome eventId={event.event_id} />
                </div>
                <div className="oddsNumber bordredNone">
                  <OutcomesAway eventId={event.event_id} /> 
                </div>
                <div className="otherOdds">
                  <button className="otherBut">+123</button>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);