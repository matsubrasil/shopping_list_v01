import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from './../actions/itemActions';

const ItemModal = ({ isAuthenticated, addItem }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => {
    setName('');
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name,
    };

    addItem(newItem);
    setName('');
    toggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage item</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
