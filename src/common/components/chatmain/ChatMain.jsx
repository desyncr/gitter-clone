import React,
  { PropTypes }       from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router';
import {
  signIn,
  openSignInModal,
  closeModal,
  fetchMessages,
  addMessage }        from '../../actions/';
import makeGetMessagesByConvo from '../../selectors/messagesByConvo';
import Generic404     from '../errors/Generic404';
import SignInModal    from '../modals/SignInModal';
import ChatHeader     from './ChatHeader';
import ChatToolbar    from './ChatToolbar';
import ChatContent    from './ChatContent';
import ChatInput      from './ChatInput';

export class ChatMain extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.convoName !== prevProps.convoName) {
      this.fetchData();
    }
  }
  fetchData() {
    const convo = this.props.routeParams.convo;
    this.props.fetchMessages(convo);
  }
  render() {
    if (this.props.error && this.props.error.status === 404) {
      return <Generic404 />;
    }
    return (
      <main className="chat-header-wrapper">
        { this.props.isFetching &&
          <div className="loading-container">
            <div className="loading-spinner" />
          </div>
        }
        <ChatHeader
        user={this.props.user}
        pathname={this.props.routeParams.path}
        />
        <div className="chat-and-toolbar-wrapper">
          <ChatToolbar
          messages={this.props.messages}
          user={this.props.user}
          />
          <div className="chat-wrapper">
            <ChatContent
            containerId="chat-content"
            messages={this.props.messages}
            />
            <ChatInput
            {...this.props}
            onMessageSubmit={this.props.addMessage}
            />
          </div>
        </div>
        <SignInModal
        user={this.props.user}
        modalIsOpen={this.props.modalIsOpen.signIn}
        onRequestClose={this.props.closeModal}
        onFormSubmit={this.props.signIn}
        />
      </main>
    );
  }
}

ChatMain.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  convoName: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export const makeMapStateToProps = () => {
  const getMessagesByConvo = makeGetMessagesByConvo();
  const mapStateToProps = (state, props) => {
    const convoName = props.routeParams.convo;
    const messages = state.convos[convoName] ?
    getMessagesByConvo(state, convoName) :
    [];
    return {
      messages,
      user: state.user,
      convos: state.convos,
      convoName,
      isFetching: state.ui.isFetching,
      modalIsOpen: state.ui.modalIsOpen,
      error: state.error.messages
    };
  };
  return mapStateToProps;
};

export default withRouter(connect(
  makeMapStateToProps,
  { signIn, openSignInModal, closeModal, fetchMessages, addMessage }
)(ChatMain));
