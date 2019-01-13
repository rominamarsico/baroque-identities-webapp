import React, { Component } from "react";
import styled from 'styled-components';

const MenuButton = styled.button`
  background: #660000;
  color: white;
  border: none;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;

  :active {
    background-color: #660000ad;
  }

  :focus {
    outline: none;
  }

  @media (min-height: 630px) {
      height: 150px;
  }

  @media (max-height: 630px) {
      height: 100px;
  }

  @media (min-width: 330px) {
      width: 300px;
  }

  @media (max-width: 330px) {
      width: 200px;
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
