'use strict';
define([
  'react',
  'react-prop-types'
], function (React, PropTypes) {

  const defaultStyle = {
    position: 'absolute',
    borderRadius: '100%',
    width: 22,
    color: 'white',
    backgroundColor: '#adadad',
    border: '1px solid #999999',
    float: 'right'
  };

  const getButtonStyle = (position) => {
    switch (position) {
      case 'top-right':
        return { ...defaultStyle, top: -10, right: -10 };
      case 'bottom-right':
        return { ...defaultStyle, bottom: -10, right: -10 };
      default:
        return {};
    }
  };

  const Button = ({ position, icon, onClick }) => {
    let buttonStyle = getButtonStyle(position);

    return (
      <button
        className="btn btn-xs"
        style={buttonStyle}
        onClick={onClick}
      >
        <i className={`fa fa-${icon}`}/>
      </button>
    )
  };

  Button.propTypes = {
    position: PropTypes.string,
    icon: PropTypes.string,
    altIcon: PropTypes.string,
    onClick: PropTypes.func
  };

  Button.defaultProps = {
    position: 'top-right',
    icon: 'remove'
  };

  return Button;
});