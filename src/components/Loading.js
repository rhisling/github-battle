import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center',
  },
};

const Loading = ({text, speed}) => {
  const [state, setState] = useState({
    content: text,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      state.content === text + '...'
        ? setState({ content: text })
        : setState(({ content }) => ({ content: content + '.' }));
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p style={styles.content}>{state.content}</p>;
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

export default Loading;
