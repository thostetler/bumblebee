define([
  'react',
  'react-window',
  'es6!./Item.jsx'
], function (React, ReactWindow, Item) {

  const { FixedSizeList: List } = ReactWindow;
  const App = ({ loading, items }) => {

    console.log(items);

    if (loading) {
      return (
        <div className="library-detail-view">
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className="library-detail-view">
        <List
          height={800}
          itemData={items}
          itemCount={items.length}
          itemSize={120}
          width="auto"
        >
          {Item}
        </List>
      </div>
    )
  };
  App.defaultProps = {
    loading: false,
    items: []
  };

  return App;
})
