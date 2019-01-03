import React, { Component } from "react";
import firebase from '../firebase';

class DatabaseRef extends Component {
  constructor(props) {
    super(props);
    this.state = { photoData: [] }; // <- set up react state
    this.writeUserData = this.writeUserData.bind(this);
    this.readUserData = this.readUserData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  writeUserData(nfcId){
      firebase.database().ref().push({
          nfcId
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }

  readUserData() {
      firebase.database().ref().once('value', function (snapshot) {
          console.log(snapshot.val())
      });
  }

  readWriteNfc() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
        consoleLog("NFC message received from Tag " + message.data);
      }
    }
  }

  deleteData(){
      firebase.database().ref().remove();
  }

  render() {
    return(
      <div>
        <h1>Wilkommen!</h1>
        <button onClick={() => this.writeUserData('foo')}>Button 01</button>
        <button onClick={() => this.writeUserData('bar')}>Button 02</button>
        <button onClick={this.deleteData}>remove</button>
      </div>
    );
  }
}

export default DatabaseRef;
