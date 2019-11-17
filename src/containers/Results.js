import React from 'react';
import { battle } from '../utils/api';
import { css } from 'emotion';
import Card from '../components/Card';
import ProfileList from '../components/ProfileList';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';



class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(players =>
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        }),
      )
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;
    if (loading) {
      return <Loading speed={300} text='Loading'/>;
    }
    if (error) {
      return (
        <p
          className={css`
            color: #ff1616;
            font-size: 20px;
            margin: 50px 0;
          `}
        >
          {error}
        </p>
      );
    }
    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button className="btn btn-dark btn-space" onClick={this.props.onReset}>
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Results;
