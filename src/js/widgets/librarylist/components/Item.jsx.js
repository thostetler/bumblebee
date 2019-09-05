define([
  'react',
  'react-bootstrap'
], function (React, b3) {

  const bibcodeStyle = {
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "display": "inline-block",
    "whiteSpace": "nowrap",
    "maxWidth": "100%"
  };

  const identifierStyle = {
    "color": "#5D5D5D"
  };

  const titleStyle = {
    "marginTop": "-3px",
    "marginBottom": "4px",
    "fontSize": "16px",
    "color": "#2152b9",
    "fontWeight": "500",
    "lineHeight": "1.2",
    "letterSpacing": ".01em",
    "wordSpacing": ".05em"
  };

  const iconStyle = {
    "fontSize": "1.2rem"
  };

  class Item extends React.PureComponent {

    makeAbsLink(target) {
      const item = this.props.data[this.props.index];
      return `/abs/${ item.bibcode }/${ target }`
    }

    render() {
      const { data, style, index } = this.props;

      const {
        bibcode,
        formattedDate,
        num_citations = 0,
        title,
        authorFormatted
      } = data[index];

      return (
        <b3.Row style={{ ...style, fontSize: '1.6rem' }}>
          <b3.Col xs={11}>
            <b3.Row>
              <b3.Col xs={1}>
                <label><input type="checkbox" name="item-{index}" id="item-{index}"/> { index + 1 }</label>
              </b3.Col>
              <b3.Col xs={3}>
              <span style={ bibcodeStyle }>
                <a style={ identifierStyle } href={ this.makeAbsLink('abstract') }>{ bibcode }</a>
              </span>
              </b3.Col>
              <b3.Col xs={2}>{ formattedDate }</b3.Col>
              <b3.Col xs={3}>
              {num_citations > 0 &&
                <a href={ this.makeAbsLink('citations') }>cited: { num_citations }</a>
              }
              </b3.Col>
              <b3.Col xs={3}>
                <b3.Col xs={4}>
                  <b3.Button bsStyle="link">
                    <i className="fa fa-file-text-o" aria-label="quick access to full text links" />
                  </b3.Button>
                </b3.Col>
                <b3.Col xs={4}>
                  <b3.Button bsStyle="link">
                    <i className="fa fa-paper" aria-label="quick access to full text links" />
                  </b3.Button>
                </b3.Col>
                <b3.Col xs={4}>
                  <b3.Button bsStyle="link">
                    <i className="fa fa-paper" aria-label="quick access to full text links" />
                  </b3.Button>
                </b3.Col>
              </b3.Col>
            </b3.Row>
            <b3.Row>
              <b3.Col xsOffset={1} xs={11}>
                <a href={ this.makeAbsLink('abstract') }>
                  <h3 style={ titleStyle }>{ title }</h3>
                </a>
              </b3.Col>
            </b3.Row>
            <b3.Row>
              <b3.Col xsOffset={1} xs={11}>
                { authorFormatted }
              </b3.Col>
            </b3.Row>
          </b3.Col>
          <b3.Col xs={1}>
            <b3.Button bsStyle="danger">
              <i className="fa fa-trash"></i>
            </b3.Button>
          </b3.Col>
        </b3.Row>
      );
    }
  }

  Item.defaultProps = {
    data: {},
    index: 0,
    style: {}
  }

  return Item;
})
