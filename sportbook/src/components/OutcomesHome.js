import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateOutcomesHome, addToCart } from '../store/sportsActions';
// import { addToCart } from '../store/cartActions';
import '../Events.css';

const mapStateToProps = (state) => ({
  outcomesHome: state.outcomesHome
});

const mapDispatchToProps = {
  updateOutcomesHome,
  addToCart
};

class OutcomesHome extends React.Component {

  componentDidMount() {
    // axios.get('http://sportbook.loc/?api=outcomes_1x2_home')
    axios.get('http://localhost:8081/api/outcomes_1x2_home')
      .then(res => {
        this.props.updateOutcomesHome(res.data);
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
    // console.log(this.props.eventId);
    const filteredOutcomes = Array.isArray(this.props.outcomesHome)
      ? this.props.outcomesHome.filter(outcome => outcome.tournament_id === Number(tournamentId) && outcome.event_id === this.props.eventId)
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

export default connect(mapStateToProps, mapDispatchToProps)(OutcomesHome);