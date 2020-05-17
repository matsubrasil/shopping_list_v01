import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = ({ isAuthenticated, item, getItems, deleteItem }) => {
  const { items } = item;

  useEffect(() => {
    getItems();
  }, [getItems]);

  const onHandleDelete = (id) => {
    deleteItem(id);
    //setItems(items.filter((item) => item.id !== id));
  };
  if (!items) {
    return <div>Loading..</div>;
  }
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated && (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => onHandleDelete(_id)}
                  >
                    &times;
                  </Button>
                )}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  isAuthenticated: PropTypes.bool,
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
