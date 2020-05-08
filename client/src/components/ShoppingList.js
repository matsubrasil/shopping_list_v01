import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { v4 as uuidv4 } from 'uuid';

// Incantations
// uuidv4();
const initialState = [
  {
    id: uuidv4(),
    name: 'eggs',
  },
  {
    id: uuidv4(),
    name: 'milk',
  },
  {
    id: uuidv4(),
    name: 'coffee',
  },
];

const ShoppingList = () => {
  const [items, setItems] = useState(initialState);

  const onHandleClick = () => {
    // console.log(items);
    const name = prompt('Enter item...');
    if (name) {
      setItems([{ id: uuidv4(), name }, ...items]);
    }
  };

  const onHandleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => onHandleClick()}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => onHandleDelete(id)}
                >
                  &times;
                </Button>

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
