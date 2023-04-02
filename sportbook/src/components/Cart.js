import React from "react";
import { connect } from 'react-redux';
import '../Cart.css';

const mapStateToProps = (state) => ({
  cartItems: state.cart.items
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      currentTab: "SINGLE",
      selectedCheckboxes: [],
    };
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleTabClick = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };

  handleCheckboxChange = (e) => {
    const value = e.target.value;
    let selectedCheckboxes = [...this.state.selectedCheckboxes];
    if (e.target.checked) {
      selectedCheckboxes.push(value);
    } else {
      selectedCheckboxes = selectedCheckboxes.filter((item) => item !== value);
    }
    this.setState({
      selectedCheckboxes,
    });
  };

  render() {
    let totalCoef = 1;
    let sum = 0;
    if (this.state.currentTab === "SINGLE") {
      const item = this.props.cartItems[0];
      const coeff = item ? item.eventName['outcomeCoeff'] : 0;
      totalCoef = coeff;
      sum = totalCoef * this.state.inputValue;
      return (
        <div className="cart">
          <div className="titleCart">
           <h4 className="title">Bet Slip</h4>
         </div>
          <div className="tabList">
            <button
              className={`tabButton ${this.state.currentTab === "SINGLE" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SINGLE")}>SINGLE</button>
            <button
              className={`tabButton ${this.state.currentTab === "PARLAY" ? "active" : ""}`}
              onClick={() => this.handleTabClick("PARLAY")}>PARLAY</button>
            <button
              className={`tabButton ${this.state.currentTab === "SYSTEM" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SYSTEM")}>SYSTEM</button>
          </div>
          <ul>
            {item &&
              <li>
                <p className="cartEventName">{item.eventName['eventName']}</p>
                <p className="cartCoeff">{coeff}</p>
              </li>
            }
          </ul>
          <div className="countCoeff">
            <p className="totalCoeff">Total: {sum ? sum.toFixed(2) : (totalCoef === 1) ? 0 : totalCoef.toFixed(2)}</p>
            <input
              type="number"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

    } else if (this.state.currentTab === "PARLAY") {
      this.props.cartItems.forEach((item) => {
        const coeff = item.eventName['outcomeCoeff'];
        totalCoef *= coeff;
      });
      sum = totalCoef * this.state.inputValue;
      return (
        <div className="cart">
          <div className="titleCart">
            <h4 className="title">Bet Slip</h4>
          </div>
          <div className="tabList">
            <button
              className={`tabButton ${this.state.currentTab === "SINGLE" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SINGLE")}
              >
              SINGLE
            </button>
            <button
              className={`tabButton ${this.state.currentTab === "PARLAY" ? "active" : ""}`}
              onClick={() => this.handleTabClick("PARLAY")}
              >
              PARLAY
            </button>
            <button
              className={`tabButton ${this.state.currentTab === "SYSTEM" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SYSTEM")}
              >
              SYSTEM
            </button>
            </div>
            <ul>
              {this.props.cartItems.map((item, index) => (
              <li key={index}>
                <p className="cartEventName">{item.eventName['eventName']}</p>
                <p className="cartCoeff">{item.eventName['outcomeCoeff']}</p>
              </li>
              ))} 
            </ul>
            <div className="countCoeff">
              <p className="totalCoeff">Total: {sum ? sum.toFixed(2) : (totalCoef === 1) ? 0 : totalCoef.toFixed(2)}</p>
              <input
                type="number"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        );
      } else if (this.state.currentTab === "SYSTEM") {
      // Implement SYSTEM tab functionality
      let sum = 0;
      let totalCoef = 1;
      this.props.cartItems.forEach((item, index) => {
        sum += item.eventName['outcomeCoeff'];
      });
      
      // посчет 2/3
      if (this.state.selectedCheckboxes.includes("2/3")) {
        let pairs = [];
        let sum = 0;
        let result = 0;
        this.props.cartItems.forEach((item, index) => {
          pairs.push(item.eventName['outcomeCoeff']);
          for (let i = 0; i < pairs.length - 1; i++) {
            for (let j = i + 1; j < pairs.length; j++) {
              sum = pairs[i] * pairs[j];
            }
            result +=sum;
          }
        });
        totalCoef *= result;
      } else if (this.state.selectedCheckboxes.includes("3/3")) { // подсчет 3/3
        totalCoef = this.props.cartItems.reduce((a, b) => a * b.eventName['outcomeCoeff'], 1);
      }
      
      // подсчет 1/3
      if (this.state.selectedCheckboxes.includes("1/3")) {
        totalCoef += sum - 1;
      }
      
      sum = totalCoef * this.state.inputValue;
      return (
        <div className="cart">
          <div className="titleCart">
            <h4 className="title">Bet Slip</h4>
          </div>
          <div className="tabList">
            <button
              className={`tabButton ${this.state.currentTab === "SINGLE" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SINGLE")}
              >
              SINGLE
            </button>
            <button
              className={`tabButton ${this.state.currentTab === "PARLAY" ? "active" : ""}`}
              onClick={() => this.handleTabClick("PARLAY")}
              >
              PARLAY
            </button>
            <button
              className={`tabButton ${this.state.currentTab === "SYSTEM" ? "active" : ""}`}
              onClick={() => this.handleTabClick("SYSTEM")}
              >
              SYSTEM
            </button>
          </div>
          <ul>
          {this.props.cartItems.map((item, index) => (
            <li key={index} className="systemCartItem">
              <p className="cartEventName">{item.eventName['eventName']}</p>
              <p className="cartCoeff">{item.eventName['outcomeCoeff']}</p>
            </li>
          ))}
          </ul>        
          <div className="countCoeff">
            <p className="totalCoeff">
              Total: {sum ? sum.toFixed(2) : (totalCoef === 1) ? 0 : totalCoef.toFixed(2)}
            </p>
            <input
              type="number"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="systemOptions">
            <label>
              <input
                type="checkbox"
                value="1/3"
                checked={this.state.selectedCheckboxes.includes("1/3")}
                onChange={this.handleCheckboxChange}
              />
              1/3
            </label>
            <label>
              <input
                type="checkbox"
                value="2/3"
                checked={this.state.selectedCheckboxes.includes("2/3")}
                onChange={this.handleCheckboxChange}
              />
              2/3
            </label>
            <label>
              <input
                type="checkbox"
                value="3/3"
                checked={this.state.selectedCheckboxes.includes("3/3")}
                onChange={this.handleCheckboxChange}
              />
              3/3
            </label>
          </div>
        </div>
      );
    }
  }
}
      
export default connect(mapStateToProps)(Cart);