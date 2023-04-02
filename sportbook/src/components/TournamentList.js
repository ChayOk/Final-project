import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateTournaments } from '../store/sportsActions';

class TournamentList extends React.Component {

  render() {
        return (
          <>
            { this.props.tournaments.map(tournament => 
            <li>
              <label className='labelBtn'>
                <span className='tournamentTitle'>
                  {tournament.tournament_name}
                </span>
                <input type="checkbox" className="tournamentCheckbox" />
    
              </label>
            </li>
            )}
          </>
        )
      }
    }

const mapStateToProps = (state) => ({
  tournaments: state.tournaments,
  // events: state.events
});

const mapDispatchToProps = {
  updateTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);