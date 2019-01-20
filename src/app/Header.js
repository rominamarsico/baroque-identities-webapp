import React, { Component } from "react";
import styled from 'styled-components';

const BannerWrapper = styled.div`
  width: 100%;
  padding-bottom: 15px;
`;

const HeaderImage = styled.img`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
`;

const Logo = styled.img`
  width: 30%;
  position: absolute;
  left: 12%;
  top: 15%;
`;

export default class Header extends Component {

  render() {
    return(
      <BannerWrapper>
        <HeaderImage src={require('../assets/header_bg.jpg')} />
        <Logo src={require('../assets/Logo.png')} />
      </BannerWrapper>
    );
  }
}
