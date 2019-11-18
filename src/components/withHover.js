import React, { useState } from 'react';

export default function withHover(Component, propName = 'hovering') {
  return props => {
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

    const tempProps = {
      [propName]: state.hovering,
      ...props,
    };

    return (
      <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
        <Component {...tempProps} />
      </div>
    );
  };
}
