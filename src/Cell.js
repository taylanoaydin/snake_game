import React from 'react';

function Cell(props) {
  const style = {
    width: '20px',
    height: '20px',
    backgroundColor: props.sfe === "snake" ? 'green' : props.sfe === "food" ? 'red' : 'white',
  };

  return <div style={style}></div>;
}

export default Cell;
