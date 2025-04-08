import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
  const TYPES = {
    pending: 'warning',
    error: 'danger',
    success: 'success',
  };

  const ApiMessage = ({ request }) => {
    const { status, error } = request;

    if (!error) {
      return null;
    }

    return (
      <Alert bsStyle="danger" style={{ marginTop: '1rem' }}>
        {error && (
          <span>
            <strong>
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{' '}
              Error:
            </strong>{' '}
            {error}
          </span>
        )}
      </Alert>
    );
  };
  ApiMessage.defaultProps = {
    request: { status: null, result: null, error: null },
  };
  ApiMessage.propTypes = {
    request: PropTypes.object,
  };

  export default ApiMessage;

