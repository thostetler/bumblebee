'use strict';
define([
  'react',
  'react-prop-types',
  'es6!./button.jsx',
], function (React, PropTypes, Button) {

  const styles = {
    container: {
      display: 'inline-block',
      borderRadius: '4px',
      border: '1px solid #dbdbdb',
      margin: '8px 8px 12px 8px',
      padding: '4px 15px 4px 5px',
      fontSize: '14px',
      minWidth: 75,
      WebkitTransition: 'box-shadow, 1s',
      transition: 'box-shadow, 1s',
      position: 'relative'
    },
    title: {
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 'bold'
    }
  };

  const Item = ({
      lockable, onLock, onDelete, title, locked, operand
    }) => {
    return (
      <div style={styles.container}>
        <h5 style={styles.title}>{title}</h5>
        <span>{operand}</span>
        {!locked &&
          <Button
            position="top-right"
            icon="remove"
            onClick={onDelete}
          />
        }
        {lockable &&
          <Button
            position="bottom-right"
            icon={locked ? 'lock' : 'unlock-alt'}
            onClick={onLock}
          />
        }
      </div>
    );
  };

  Item.propTypes = {
    onLock: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    operand: PropTypes.string,
    locked: PropTypes.bool,
    lockable: PropTypes.bool
  };

  Item.defaultProps = {
    title: 'Category',
    operand: 'Custom Filter',
    locked: false,
    lockable: true
  };

  return Item;
});