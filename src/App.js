import React, { Component } from 'react';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

import './App.css';
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

    this.state = {
      activeRoom: '',
      activeRoomId: '',
      user: null,
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUserName = this.setUserName.bind(this);
    
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room.name,
      activeRoomId: room.key,
    });
  }

  setUserName(user) {
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <main className="container">
        <header className="app-title">
          <h1>Delaware's Community Garden</h1>
          <h2>Current Room: {this.state.activeRoom}</h2>
          </header>
          <section className="row">
          <div className="col" id="user-1-of-1">
            <User firebase={firebase} user={this.state.user} setUserName={this.setUserName} />
            </div>
          </section>
        <section className="row">
          <div className="col" id="roomlist-1-of-2">
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
            </div>
          </section>
          <section className="row">
            <div className="col" id="messagelist-2-of-2">
            <MessageList firebase={firebase} activeRoomId={this.state.activeRoomId} />
            </div>
          </section>
      </main>
    );
  }
}
 export default App;
