import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

import './App.css';
import * as firebase from 'firebase';
import fire from 'firebase';

var config = {
  apiKey: "AIzaSyAfTbKtXZUD0PZzJxGECO3unfiv10ZqX0w",
  authDomain: "bloc-chat-kraman.firebaseapp.com",
  databaseURL: "https://bloc-chat-kraman.firebaseio.com",
  projectId: "bloc-chat-kraman",
  storageBucket: "bloc-chat-kraman.appspot.com",
  messagingSenderId: "596845905245"
};
firebase.initializeApp(config);

const AppContainer = styled.div`
 text-align: center;
`;

const AppHeader = styled.header`
 background-color: #442F74;
 height: 100px;
 padding: 20px;
 color: white;
`;

const AppTitle = styled.h1`
   font-size: 1.5em;
`;

const AppLogo = styled.img`
 animation: App-logo-spin infinite 20s linear;
 height: 80px;
 @keyframes App-logo-spin {
   from { transform: rotate(0deg); }
   to { transform: rotate(360deg); }
 }
`;

const AppIntro = styled.p`
 font-size: large;
`;

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
      <main className="wrapper">
        <header className="app-title">
          <h1>Bloc Chat</h1>
          <h2>Current Room: {this.state.activeRoom}</h2>
          <section>
            <User firebase={firebase} user={this.state.user} setUserName={this.setUserName} />
          </section>
        </header>
        <section className="rows">
          <section className="room-list">
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
          </section>
          <section className="message-list">
            <MessageList firebase={firebase} activeRoomId={this.state.activeRoomId} />
          </section>
        </section>
      </main>
    );
  }
}

 export default App;
