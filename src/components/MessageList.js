import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { messages:  [{username: "", content: "", sentAt: "", roomId: ""},], newMessage:""};
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
      this.formatTime = this.formatTime.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newMessage: e.target.value});
  }

  createMessage(e) {
      e.preventDefault();
      this.messagesRef.push({
        username: this.props.user ? this.props.user.displayName : 'Guest',
        content: this.state.newMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom,
      })
      this.setState({newMessage: ''});
    }


  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  formatTime(time) {
  if (time){
     const date = new Date(time);
     const hour = date.getHours();
     const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
     const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
     const newTime = hour + ':' + min + ':' + sec;
     return newTime;
   }
}


    render() {
      return (
        <section className="messages">
          {this.state.messages
            .filter(messages => messages.roomId === this.props.activeRoom)
            .map((messages, i) => (
              <ul className="message-group" key={i}>
                <div>{messages.username}</div>
                <div>{messages.content}</div>
                <div>{this.formatTime(messages.sentAt)}</div>
              </ul>
            ))}
          <form className="add-message" onSubmit={this.createMessage}>
            <input
              type="text"
              placeholder="Write Your Message Here"
              value={this.state.newMessage}
              onChange={this.handleChange}
            />
            <input type="submit" value="Send" />
          </form>
        </section>
      );
    }
  }

export default MessageList;
