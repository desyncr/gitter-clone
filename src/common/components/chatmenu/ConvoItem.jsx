import React from 'react';
import { Link } from 'react-router';

const ConvoItem = ({ name }) => (
  <div className="convo-item">
    <Link className="convo-item-container" to={'/' + name}>
      <img className="convo-item-avatar" src={'http://i.pravatar.cc/22?u=' + name} alt={name} />
      <h2 className="convo-item-title">{name}</h2>
    </Link>
  </div>
);

ConvoItem.propTypes = {
  // : React.PropTypes.
};

export default ConvoItem;
