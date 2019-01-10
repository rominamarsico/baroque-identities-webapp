import React, { Component } from "react";

export default class Button extends Component {

  render() {
    const { text, onClick } = this.props;

    return(
      <div>
        <button onClick={onClick}>
          {text}
        </button>
      </div>
    );
  }
}
