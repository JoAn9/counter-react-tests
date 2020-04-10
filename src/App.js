import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    error: false,
  };

  increment = () => {
    this.setState({ error: false });
    this.setState({ counter: this.state.counter + 1 });
  };

  decrement = () => {
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1 });
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    const errorClass = this.state.error ? '' : 'hidden';

    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">Counter is {this.state.counter}</h1>
        <p data-test="error-message" className={`error ${errorClass}`}>
          Can't be lower then 0
        </p>

        <button data-test="increment-button" onClick={this.increment}>
          Increment
        </button>
        <button data-test="decrement-button" onClick={this.decrement}>
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
