import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Widget from '../Widget';

class Widgets {


  moveCard(id, afterId) {
    const { cards } = this.state;

    const card = cards.filter(c => c.id === id)[0];
    const afterCard = cards.filter(c => c.id === afterId)[0];
    const cardIndex = cards.indexOf(card);
    const afterIndex = cards.indexOf(afterCard);

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card]
        ]
      }
    }));
  }

  render() {
    let childWidgets = this.state.children.map((child, index) => {
      return <Widget key={index} {...child} />;
    });

    return (
      <div className="Widgets">
        {childWidgets}
      </div>
    );
  }

}

export default Widgets;
