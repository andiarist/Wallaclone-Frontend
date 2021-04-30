/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  List,
  TextField,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import ChatItem from './ChatItem';
import { initChatClient } from '../../api/chat';
import './ChatScreen.css';

const styles = {
  textField: { width: '100%', borderWidth: 0, borderColor: 'transparent' },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: 'auto', height: '70vh' },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: '#475a9e' },
  sendIcon: { color: 'white', cursor: 'pointer' },
  mainGrid: { paddingTop: 100, borderWidth: 1 },
};

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: [],
      loading: false,
      channel: null,
    };

    this._isMounted = false;
    this.messagesEndRef = React.createRef();
    // this.scrollDiv = React.createRef();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  componentDidMount = async () => {
    this._isMounted = true;
    const { location } = this.props;
    const { state } = location || {};
    const { email, room, userToJoin } = state || {};

    if (!email || !room || !userToJoin) {
      this._isMounted = false;
      this.props.history.replace('/');
    }

    if (this._isMounted) {
      this.setState({ loading: true });

      const client = await initChatClient(email);
      // const clientOwner = await initChatClient(_id);

      client.on('channelJoined', async channel => {
        // getting list of all messages since this is an existing channel
        if (channel.channelState.friendlyName === room) {
          const messages = await channel.getMessages();
          this.setState({ messages: messages.items || [] });
          this.scrollToBottom();
        }
      });
      try {
        const channel = await client.getChannelByUniqueName(room);
        await this.joinChannel(channel);

        if (userToJoin) {
          const clientToJoin = await initChatClient(userToJoin);
          const channelToJoin = await clientToJoin.getChannelByUniqueName(room);
          if (channelToJoin.channelState.status !== 'joined') {
            await channelToJoin.join();
            // console.log(`${userToJoin} unido de nuevo al canal`);
          }
        }

        // console.log('Canal encontrado:', channel);
        this.setState({ channel, loading: false });
      } catch {
        try {
          const channel = await client.createChannel({
            uniqueName: room,
            friendlyName: room,
          });
          await this.joinChannel(channel);
          if (userToJoin) {
            const clientToJoin = await initChatClient(userToJoin);
            const channelToJoin = await clientToJoin.getChannelByUniqueName(
              room,
            );
            await channelToJoin.join();
            // console.log(`${userToJoin} unido al canal`);
          }
          // console.log('Canal creado:', channel);
          this.setState({ channel, loading: false });
        } catch {
          throw new Error('unable to create channel, please reload this page');
        }
      }
    }
  };

  joinChannel = async channel => {
    if (channel.channelState.status !== 'joined') {
      await channel.join();
    }
    channel.on('messageAdded', this.handleMessageAdded);
  };

  handleMessageAdded = message => {
    const { messages } = this.state;
    this.setState({
      messages: messages ? [...messages, message] : [message],
    });
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  sendMessage = () => {
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      if (channel) channel.sendMessage(text);
      this.setState({ text: '', loading: false });
    }
  };

  previousPage = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading, text, messages, channel } = this.state;
    const { location } = this.props;
    const { state } = location || {};
    const { email, adName, owner } = state || {};

    if (!email || !adName || !owner) {
      this._isMounted = false;
      return <Redirect to="/" />;
    }

    return (
      <>
        <div className="chat-main-content">
          <Backdrop open={loading} style={{ zIndex: 999 }}>
            <CircularProgress style={{ color: 'white' }} />
          </Backdrop>
          <div className="chat-header">
            <div className="wrapper">
              <div className="chat-title">
                <span className="chat-advert-name">{adName}</span>
                <br />
                <span className="chat-owner-name">by {owner.username}</span>
              </div>
              <div className="chat-button-exit-container">
                <Button
                  onClick={this.previousPage}
                  className="chat-exit-button"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>

          <div className="chat-content">
            <div className="wrapper">
              <Grid container direction="column" style={styles.mainGrid}>
                <div className="chat-advice">
                  <div className="chat-advice-content">
                    Por razones de seguridad, nunca compartas datos privados
                  </div>
                </div>
                <Grid item style={styles.gridItemChatList} ref={this.scrollDiv}>
                  <List dense>
                    {messages &&
                      messages.map(message => (
                        <ChatItem
                          key={message.index}
                          message={message}
                          email={email}
                        />
                      ))}
                  </List>
                  <div
                    style={{ float: 'left', clear: 'both' }}
                    ref={this.messagesEndRef}
                  />
                </Grid>
                <Grid item style={styles.gridItemMessage}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item style={styles.textFieldContainer}>
                      <TextField
                        required
                        style={styles.textField}
                        placeholder="Enter message"
                        variant="outlined"
                        multiline
                        rows={2}
                        value={text}
                        disabled={!channel}
                        onChange={event =>
                          this.setState({ text: event.target.value })
                        }
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        style={styles.sendButton}
                        onClick={this.sendMessage}
                        disabled={!channel || !text}
                      >
                        <Send style={styles.sendIcon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatScreen;
