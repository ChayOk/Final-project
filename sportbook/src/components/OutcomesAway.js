import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateOutcomesAway, addToCart } from '../store/sportsActions';
import '../Events.css';

const mapStateToProps = (state) => ({
  outcomesAway: state.outcomesAway
});

const mapDispatchToProps = {
  updateOutcomesAway,
  addToCart
};

class OutcomesAway extends React.Component {

  componentDidMount() {
    // axios.get('http://sportbook.loc/?api=outcomes_1x2_away')
    axios.get('http://localhost:8081/api/outcomes_1x2_away')
      .then(res => {
        this.props.updateOutcomesAway(res.data);
      });
  }

  onAddToCart = (eventName, outcomeCoeff) => {
    this.props.addToCart({
      eventName,
      outcomeCoeff
    });
  }

  render() {
    const idArray = window.location.pathname.split('/');
    const tournamentId = idArray[3];
    const filteredOutcomes = Array.isArray(this.props.outcomesAway)
      ? this.props.outcomesAway.filter(outcome => outcome.tournament_id === Number(tournamentId) && outcome.event_id === this.props.eventId)
      : [];

    return (
      <>
        {filteredOutcomes.map(outcome => (
          <button className="outcomeBut" key={outcome.outcome_id} onClick={() => this.onAddToCart(outcome.event_name, outcome.outcomes_coef)}>
            {outcome.outcomes_coef}
          </button>
        ))}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutcomesAway);