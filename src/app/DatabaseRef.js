import React, { Component } from "react";
import firebase from '../firebase';
import Nfc from 'nfc-react-web';

const App = () => (
  <Nfc
    read={data => {
      console.log(`Data read from tag: ${JSON.stringify(data)}`);
    }}
    timeout={15} // time to keep trying to read tags, in seconds
  ></Nfc>
);

class DatabaseRef extends Component {
  constructor(props) {
    super(props);
    this.state = { photoData: [] }; // <- set up react state
    this.writeUserData = this.writeUserData.bind(this);
    this.readUserData = this.readUserData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  writeUserData(key, val){
      firebase.database().ref(key).set({
          val
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

  deleteData(){
      firebase.database().ref().remove();
  }



  render() {
    return(
      <div>
        <h1>Wilkommen!</h1>
        <button onClick={() => this.writeUserData('/Mission', 'Mission')}>Mission</button>
        <button onClick={() => this.writeUserData('/Inventar', 'Inventar')}>Inventar</button>
        <button onClick={() => this.writeUserData('/Character', 'Character')}>Character</button>
        <button onClick={this.deleteData}>remove</button>
      </div>
    );
  }
}

export default DatabaseRef;
