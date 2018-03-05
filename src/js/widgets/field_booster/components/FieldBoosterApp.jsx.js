'use strict';
define([
  'react',
  'es6!./Row.jsx'
], function (React, Row) {

  const style = {
    row: { marginTop: 20 }
  };

  const initialState = {
    newField: '',
    newValue: 0
  };

  /**
   * Main component
   *
   * This is a container component, it is the only type of component
   * that is connected directly to the store.  All dispatches and
   * state changes should happen here.
   */
  class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = initialState;
    }

    onNewFieldUpdate(newField) {
      this.setState({ newField });
    }

    onNewValueUpdate(newValue) {
      this.setState({ newValue });
    }

    onDeleteClick(index) {
      this.props.deleteField(index);
    }

    onAdd(index, value) {
      this.props.increaseField(index, value);
    }

    onMinus(index, value) {
      this.props.decreaseField(index, value);
    }

    onAddNewField() {
      this.props.addField(this.state.newField, this.state.newValue);
      this.setState(initialState);
    }

    onSubmit() {
      this.props.submit();
    }

    onCopy() {
      this.props.copy();
    }

    render() {
      return (
        <div className="query-info-widget s-query-info-widget">
          <div className="s-right-col-widget-container">
            <h4>Field Booster</h4>
            <div className="well">
              {this.props.app.fields.length <= 0 ? 'No Fields' : null}
              {this.props.app.fields.map(({key, value}, idx) =>
                <Row
                  key={key} name={key} value={value}
                  onDelete={e => this.onDeleteClick(idx)}
                  onAdd={e => this.onAdd(idx, value)}
                  onMinus={e => this.onMinus(idx, value)}
                />
              )}
            </div>

            <p>Add New Field:</p>
            <div className="row" style={style.row}>
              <div className="col-xs-5">
                <input type="text" className="form-control input-sm" placeholder="Field"
                       value={this.state.newField}
                       onChange={e => this.onNewFieldUpdate(e.currentTarget.value)}
                />
              </div>
              <div className="col-xs-4">
                <input type="text" className="form-control input-sm"
                       value={this.state.newValue}
                       onChange={e => this.onNewValueUpdate(e.currentTarget.value)}
                />
              </div>
              <div className="col-xs-3">
                <button className="btn btn-primary btn-sm" onClick={e => this.onAddNewField()}>Add</button>
              </div>
            </div>
            <hr/>
            <div className="row" style={style.row}>
              <div className="col-xs-8 col-xs-offset-2">
                <div className="btn-group btn-group-justified">
                  <div className="btn-group" role="group">
                    <button className="btn btn-primary" onClick={e => this.onSubmit()}>Apply To Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return App;
});