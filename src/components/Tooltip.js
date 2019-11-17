import React, { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
};

function Tooltip({ text, children }) {
  const [state, setState] = useState({
    hovering: false,
  });
  const mouseOver = () => {
    setState({
      hovering: true,
    });
  };

  const mouseOut = () => {
    setState({
      hovering: false,
    });
  };

  return (
    <div onMouseOver={mouseOver} onMouseOut={mouseOut} style={styles.container}>
      {state.hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
