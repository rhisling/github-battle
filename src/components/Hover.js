import React, { useState } from 'react';

function Hover(props) {
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
    <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {props.children(state.hovering)}
    </div>
  );
}

export default Hover;
