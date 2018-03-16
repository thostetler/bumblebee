'use strict';
define([
  'react',
  'react-prop-types',
  'es6!./item.jsx'
], function (React, PropTypes, Item) {

  const FilterApp = ({ app, lockFilter, deleteFilter }) => {

    const onLock = (index) => {
      lockFilter(index);
    };

    const onDelete = (index) => {
      deleteFilter(index);
    };

    return (
      <div id="filter-visualizer">
        {app.filters.map((item, index) => (
          <Item
            key={item.title}
            title={item.title}
            operand={item.operand}
            locked={item.locked}
            lockable={item.lockable}
            onLock={e => onLock(index)}
            onDelete={e => onDelete(index)}
          />
        ))}
      </div>
    );
  };

  FilterApp.propTypes = {
    app: PropTypes.object.isRequired
  };

  return FilterApp;
});