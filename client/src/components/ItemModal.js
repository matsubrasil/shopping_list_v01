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

import { connect } from 'react-redux';
import { addItem } from './../actions/itemActions';
import { v4 as uuidv4 } from 'uuid';

const ItemModal = ({ addItem }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => {
    setName('');
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      name,
    };

    addItem(newItem);
    setName('');
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>
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
const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
