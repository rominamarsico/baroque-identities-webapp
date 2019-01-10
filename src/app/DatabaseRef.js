import React, { Component } from "react";
import Nfc from 'nfc-react-web';

import firebase from '../firebase';
import Button from './Button.js';

const App = () => (
  <Nfc
    read={data => {
      console.log(`Data read from tag: ${JSON.stringify(data)}`);
    }}
    timeout={15} // time to keep trying to read tags, in seconds
  ></Nfc>
);

export default class DatabaseRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: [],
      showMission: false,
      showInventory: false,
      showCharacter: false
    };
    this.writeUserData = this.writeUserData.bind(this);
    //this.readUserData = this.readUserData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.showMission = this.showMission.bind(this);
    this.showInventory = this.showInventory.bind(this);
    this.showCharacter = this.showCharacter.bind(this);
  }

  componentDidUpdate() {
    if(this.state.showMission === true) {
      console.log('mission');
    } else if (this.state.showInventory === true) {
      console.log('inventory');
    } else if(this.state.showCharacter === true) {
      console.log('character');
    }
  }

  writeUserData(ref, val){
    firebase.database().ref(ref).set({
      val
    }).then((data)=>{
      //console.log('data ' , data)
    }).catch((error)=>{
      console.log('error ' , error)
    })
  }

  // readUserData() {
  //     firebase.database().ref().once('value', function (snapshot) {
  //         console.log(snapshot.val())
  //     });
  // }

  deleteData(ref){
    firebase.database().ref(ref).remove();
  }

  showMission() {
    this.setState({showMission: true, showInventory: false, showCharacter: false});
    this.writeUserData('/Mission', 'Mission');
    this.deleteData('/Inventar');
    this.deleteData('/Character')
  }

  showInventory() {
    this.setState({showMission: false, showInventory: true, showCharacter: false});
    this.writeUserData('/Inventar', 'Inventar');
    this.deleteData('/Mission');
    this.deleteData('/Character')
  }

  showCharacter() {
    this.setState({showMission: false, showInventory: false, showCharacter: true});
    this.writeUserData('/Character', 'Character');
    this.deleteData('/Inventar');
    this.deleteData('/Mission')
  }

  render() {
    return(
      <div>
        <Button
          text={'Mission'}
          onClick={this.showMission}
        />
        <Button
          text={'Inventar'}
          onClick={this.showInventory}
        />
        <Button
          text={'Character'}
          onClick={this.showCharacter}
        />
      </div>
    );
  }
}
