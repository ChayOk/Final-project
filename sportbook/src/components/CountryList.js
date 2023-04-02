import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCountries, updateEvents } from '../store/sportsActions';
import  TournamentList  from "./TournamentList";

class CountryList extends React.Component {

    render() {
    return (
      <>
        { Array.isArray(this.props.countries) && this.props.countries.map(country => 
        <div className="countryItem">
          <button className="countryBtn">
            <div>
              {country.name}
            </div>
          </button>
          <ul>
            {/* <TournamentList /> */}
          </ul>
        </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries,
});

const mapDispatchToProps = {
  updateCountries,
  updateEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);