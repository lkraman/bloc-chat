import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAfTbKtXZUD0PZzJxGECO3unfiv10ZqX0w",
  authDomain: "bloc-chat-kraman.firebaseapp.com",
  databaseURL: "https://bloc-chat-kraman.firebaseio.com",
  projectId: "bloc-chat-kraman",
  storageBucket: "bloc-chat-kraman.appspot.com",
  messagingSenderId: "596845905245"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

activeRoom(room) {
  this.setState({ activeRoom: room })
}

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div>
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
        : (null)
        }
      </div>
    );
  }
}

 export default App;
