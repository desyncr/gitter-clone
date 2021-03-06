import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const ChatHeader = ({ user, pathname }) => {
  const userInfo = user.loggedIn && (
    <div className="chat-user-avatar">
      <img
      className="avatar"
      src={'http://i.pravatar.cc/30?u=' + user.username} alt={user.username}
      />
    </div>
  );
  return (
    <header className="chat-header">
      <div className="chat-header-avatar">
        <img
          src={'http://i.pravatar.cc/32?u=' + pathname} alt={pathname}
        />
      </div>
      <Link
        className="chat-header-title"
        to={'/' + pathname}
      >
        {pathname}
      </Link>
      {userInfo}
    </header>
  );
};

ChatHeader.propTypes = {
  user: PropTypes.object.isRequired
};

export default ChatHeader;
