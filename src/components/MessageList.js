import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        messages:  [{
          username: "",
          content: "",
           sentAt: "",
           roomId: ""
         }],
        newMessage:"",
      };
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }


    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat(message) })
      });
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
        roomId: this.props.activeRoomId,
      })
      this.setState({newMessage: ''});
    }





    render() {

      return (
        <section className="messages">
          {this.state.messages
            .filter(messages => messages.roomId === this.props.activeRoomId)
            .map(messages => (
              <ul className="message-group" key={messages.key}>
                <div>{messages.username}</div>
                <div>{messages.content}</div>
                <div>{messages.sentAt}</div>
              </ul>
            ))}
          <form className="enter-message" onSubmit={this.createMessage}>
            <input
              type="text"
              placeholder="Enter Message"
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
