import React from 'react';
import { battle } from '../utils/api';
import { css } from 'emotion';
import Card from '../components/Card';
import ProfileList from '../components/ProfileList';
import Loading from '../components/Loading';
import queryString from 'query-string';
import { Link } from '@reach/router';

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search);
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
      return <Loading speed={300} text="Loading" />;
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
        <Link className="btn btn-dark btn-space" to="/battle">
          Reset
        </Link>
      </>
    );
  }
}

export default Results;
