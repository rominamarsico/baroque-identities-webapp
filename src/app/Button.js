import React, { Component } from "react";
import styled from 'styled-components';

const MenuButton = styled.button`
  background: #660000;
  color: white;
  width: 300px;
  height: 150px;
  border: none;
  margin-bottom: 30px;
  font-size: 20px;

  :active {
    background-color: #660000ad;
  }
`;

export default class Button extends Component {

  render() {
    const { text, onClick } = this.props;

    return(
      <div>
        <MenuButton onClick={onClick}>
          {text}
        </MenuButton>
      </div>
    );
  }
}
