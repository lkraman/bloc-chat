import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

activeRoom(room) {
  this.setState({ activeRoom: room })
}

render() {
  const showMessages = this.state.activeRoom;
  return (
    <AppContainer>
      <AppHeader>{this.state.activeRoom.title || "Select A Room"}</AppHeader>
      <User firebase={firebase} setUser={this.setUser} />
      <RoomList firebase={firebase} activeRoom={this.activeRoom} />
      { showMessages ?
      (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
      : (null)
      }
    </AppContainer>
    <div className="container-fluid">
      <header className="header">{this.state.activeRoom.title || "Select A Room"}</header>
      <div className="flex-column" id="flex1">
      <User firebase={firebase} setUser={this.setUser} />
      </div>
      <div className="flex-column" id="flex2">
      <RoomList firebase={firebase} activeRoom={this.activeRoom} />
      </div>
      <div className="flex-column" id="flex3">
      { showMessages ?
      (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
      : (null)
    }</div>
    </div>
  );
}
}

 export default App;
export default App;
