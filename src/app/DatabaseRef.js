import React, { Component } from "react";
import Nfc from 'nfc-react-web';

import firebase from '../firebase';
import Button from './Button.js';

let missionCounter = 1;
let inventoryCounter = 1;
let characterCounter = 1;

const Data = (data) => {
  console.log(`Data read from tag: ${JSON.stringify(data)}`);
  console.log(data[0].data);
}

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
    this.missionClickCounter = this.missionClickCounter.bind(this);
    this.inventoryClickCounter = this.inventoryClickCounter.bind(this);
    this.characterClickCounter = this.characterClickCounter.bind(this);
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

  missionClickCounter() {
    missionCounter++;
    if(missionCounter % 2 === 0) {
      this.setState({showMission: true});
      this.writeUserData('/Mission', 'Mission');
    } else {
      this.setState({showMission: false});
      this.deleteData('/Mission');
    }
  }

  inventoryClickCounter() {
    inventoryCounter++;
    if(inventoryCounter % 2 === 0) {
      this.setState({showInventory: true});
      this.writeUserData('/Inventar', 'Inventar');
    } else {
      this.setState({showInventory: false});
      this.deleteData('/Inventar');
    }
  }

  characterClickCounter() {
    characterCounter++;
    if(characterCounter % 2 === 0) {
      this.setState({showCharacter: true});
      this.writeUserData('/Character', 'Character');
    } else {
      this.setState({showCharacter: false});
      this.deleteData('/Character');
    }
  }

  showMission() {
    this.missionClickCounter();
    this.setState({showMission: true, showInventory: false, showCharacter: false});
    this.deleteData('/Inventar');
    this.deleteData('/Character');
  }

  showInventory() {
    this.inventoryClickCounter();
    this.setState({showMission: false, showInventory: true, showCharacter: false});
    this.deleteData('/Mission');
    this.deleteData('/Character');
  }

  showCharacter() {
    this.characterClickCounter();
    this.setState({showMission: false, showInventory: false, showCharacter: true});
    this.deleteData('/Inventar');
    this.deleteData('/Mission');
  }

  render() {
    return(
      <div>
        <Nfc
          read={Data}
          timeout={15} // time to keep trying to read tags, in seconds
        />
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
