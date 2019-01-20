import React, { Component } from "react";
import Nfc from 'nfc-react-web';
import styled from 'styled-components';

import firebase from '../firebase';
import Button from './Button.js';

let missionCounter = 1;
let inventoryCounter = 1;
let characterCounter = 1;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default class DatabaseRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: [],
      showMission: false,
      showInventory: false,
      showCharacter: false,
      nfcTag: ''
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
    this.readNfcData = this.readNfcData.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
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

  componentDidUpdate() {
    this.writeUserData('/nfcTag', this.state.nfcTag);
  }

  readNfcData = (nfcData) => {
    this.setState({ nfcTag: nfcData[0].data});
    console.log('NFC Tag: ');
    console.log(this.state.nfcTag);
  }

  // readUserData() {
  //     firebase.database().ref().once('value', function (snapshot) {
  //         console.log(snapshot.val())
  //     });
  // }

  deleteData(ref){
    firebase.database().ref(ref).remove();
  }

  reloadPage() {
    window.location.reload();
  }

  missionClickCounter() {
    missionCounter++;
    inventoryCounter = 1;
    characterCounter = 1;
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
    missionCounter = 1;
    characterCounter = 1;
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
    missionCounter = 1;
    inventoryCounter = 1;
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
        {'nfc' in navigator
          ? <Nfc
              read={this.readNfcData}
              timeout={15} // time to keep trying to read tags, in seconds
            />
          : null
        }
        {'nfc' in navigator
          ? <div>
              <ButtonWrapper>
                <Button
                  text={'Mission'}
                  onClick={this.showMission}
                />
                <Button
                  text={'Read NFC tag'}
                  onClick={this.reloadPage}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  text={'Inventar'}
                  onClick={this.showInventory}
                />
                <Button
                  text={'Charaktere'}
                  onClick={this.showCharacter}
                />
              </ButtonWrapper>
            </div>
          : <div>
              <Button
                text={'Mission'}
                onClick={this.showMission}
              />
              <Button
                text={'Inventar'}
                onClick={this.showInventory}
              />
              <Button
                text={'Charaktere'}
                onClick={this.showCharacter}
              />
            </div>
        }
      </div>
    );
  }
}
