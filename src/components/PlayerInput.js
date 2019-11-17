import React from 'react';
import PropTypes from 'prop-types';
import './PlayerInput.css';

class PlayerInput extends React.Component {
  state = {
    username: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleUsername}
          />
          <button
            className="btn btn-dark"
            type="submit"
            disabled={!this.state.username}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propType = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default PlayerInput;
