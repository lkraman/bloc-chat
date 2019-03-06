import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './reset.css';
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: null,
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room.title,
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
       <div id='item1' className="item">
         <h1>Bloc Chat</h1>
         </div>
         <div id='item2' className="item">
         <h2>Current Room: {this.state.activeRoom}</h2>
         </div>
          <div id='item3' className="item">
           <User firebase={firebase} user={this.state.user} setUserName={this.setUserName} key={1} />
         </div>
       </header>
        <div id='item4' className="item">

           <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} key={2}/>
         </div>
          <div id='item5' className="item">
           <MessageList firebase={firebase} user={this.state.user} activeRoom={this.state.activeRoom} key={3} />
         </div>
     </main>
   );
 }
}

export default App;
