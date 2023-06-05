import React from 'react';
import house from './images/house.svg'

const DeleteButton = ({ petName, handleDelete }) => {
  return (
    <div>
      <p></p>
      <button style={{backgroundColor:"red"}}onClick={handleDelete}>
        <img src={house} alt="" /> Adopt {petName}</button>
    </div>
  );
};

export default DeleteButton;