'use strict';
define([
  'react'
], function (React) {

  const style = {
    row: { marginTop: 5 },
    span: { height: 32 },
    label: { paddingTop: 4 }
  };

  const Row = ({ name, value, onDelete, onChange, onAdd, onMinus }) => {
    return (
      <div className="row" style={style.row}>
        <div className="col-xs-5" style={style.label}>
          <strong>{name}</strong>
        </div>
        <div className="col-xs-7">
          <div className="input-group input-group-sm">
            <input type="text" className="form-control" value={value} onChange={onChange}/>
            <div className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={onMinus}>
                <i className="fa fa-minus"/>
              </button>
              <button className="btn btn-default" type="button" onClick={onAdd}>
                <i className="fa fa-plus"/>
              </button>
              <button className="btn btn-danger" type="button" onClick={onDelete}>
                <i className="fa fa-trash"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return Row;
});