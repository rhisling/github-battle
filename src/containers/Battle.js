import React from 'react';
import Instruction from '../components/Instruction';
import PlayerInput from '../components/PlayerInput';
import './Battle.css';
import PlayerPreview from '../components/PlayerPreview';
import Results from './Results';

class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    });
  };

  handleReset = id => {
    this.setState({
      [id]: null
    });
  };
  render() {
    const { playerOne, playerTwo, battle } = this.state;
    if (battle) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }
    return (
      <>
        <Instruction></Instruction>
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label="Player One"
                onReset={() => this.handleReset('playerOne')}
              />
            )}
            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handleReset('playerTwo')}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className="btn btn-dark btn-space"
              onClick={() => this.setState({ battle: true })}>
              Battle
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Battle;
