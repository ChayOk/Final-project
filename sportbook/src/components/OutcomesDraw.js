import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateOutcomesDraw } from '../store/sportsActions';
import '../Events.css';

const mapStateToProps = (state) => ({
  outcomesDraw: state.outcomesDraw
});

const mapDispatchToProps = {
  updateOutcomesDraw
};

class OutcomesDraw extends React.Component {

  componentDidMount() {
    axios.get('http://sportbook.loc/?api=outcomes_1x2_draw')
    // axios.get('http://localhost:8081/api/outcomes_1x2_draw')
      .then(res => {
        this.props.updateOutcomesDraw(res.data);
      });
  }

  render() {
    const idArray = window.location.pathname.split('/');
    const tournamentId = idArray[3];
    console.log(this.props.eventId);
    const filteredOutcomes = Array.isArray(this.props.outcomesDraw)
      ? this.props.outcomesDraw.filter(outcome => outcome.tournament_id === Number(tournamentId) && outcome.event_id === this.props.eventId)
      : [];

    return (
      <>
        {filteredOutcomes.map(outcome => (
          <button className="outcomeBut" key={outcome.outcome_id}>
            {outcome.outcomes_coef}
          </button>
        ))}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutcomesDraw);