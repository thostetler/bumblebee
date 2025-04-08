import React from 'react';
  /**
   * Simple Message
   */
  const Message = ({ type, message, show }) => (
    <div className="col-xs-12">
      {show && (
        <div className={`text-center alert alert-${type}`}>{message}</div>
      )}
    </div>
  );

  export default Message;

