import React, { Component } from "react";
import styled from 'styled-components';
import Nfc from 'nfc-react-web';

const MenuButtonWithNfc = styled.button`
  background: #660000;
  color: white;
  border: none;
  margin: 15px;
  font-size: 20px;

  :active {
    background-color: #660000ad;
  }

  :focus {
    outline: none;
  }

  // newer mobile phones
  @media (min-height: 550px) {
      height: 140px;
  }

  @media (min-width: 330px) {
      width: 140px;
  }

  // older mobile phones
  @media (max-height: 550px) {
      height: 100px;
  }

  @media (max-width: 330px) {
      width: 120px;
  }
`;

const MenuButtonNoNfc = styled.button`
  background: #660000;
  color: white;
  border: none;
  margin: 15px;
  font-size: 20px;

  :active {
    background-color: #660000ad;
  }

  :focus {
    outline: none;
  }

  // newer mobile phones
  @media (min-height: 550px) {
      height: 80px;
  }

  @media (min-width: 330px) {
      width: 80%;
  }

  // older mobile phones
  @media (max-height: 550px) {
      height: 60px;
  }

  @media (max-width: 330px) {
      width: 80%;
  }
`;

export default class Button extends Component {

  render() {
    const { text, onClick } = this.props;

    return(
      <div>
        {'nfc' in navigator
          ? <MenuButtonWithNfc onClick={onClick} >
              {text}
            </MenuButtonWithNfc>
          : <MenuButtonNoNfc onClick={onClick} >
              {text}
            </MenuButtonNoNfc>
        }
      </div>
    );
  }
}
