import React from 'react';
  /**
   * Last active date section
   */
  const LastActiveDateRow = ({ date, selected, onChange }) => (
    <div className="col-xs-12">
      <label className={selected ? '' : 'auth-aff-label'}>
        <input checked={selected} type="radio" onChange={onChange} /> {date}
      </label>
    </div>
  );

  export default LastActiveDateRow;

