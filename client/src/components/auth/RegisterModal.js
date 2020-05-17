import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from './../../actions/authActions';
import { clearErrors } from './../../actions/errorActions';

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const initialValue = {
    name: '',
    email: '',
    password: '',
  };
  const [modal, setModal] = useState(false);
  const [userForm, setUserForm] = useState(initialValue);
  const [errorMsgRegister, setErrorMsgRegister] = useState(null);

  // console.log('console.log abertura modal1', modal);

  useEffect(() => {
    return () => {
      setErrorMsgRegister(null);
      // console.log('destroy');
    };
  }, []);

  useEffect(() => {
    // console.log('RegsiterModal: useEffect => ErrorReducer', error);
    if (error.id === 'REGISTER_FAIL') {
      // console.log('useEffect.error:  REGISTER_FAIL', error.id);
      setErrorMsgRegister(error.warning_msg.msg);
      return;
    } else {
      setErrorMsgRegister(null);
      setUserForm({ name: '', email: '', password: '' });
      // console.log('useEffect.error : REGISTER_SUCCESS', error.id);
    }
    // if Modal open and is authenticated, close the modal
    if (modal) {
      if (isAuthenticated) {
        //console.log('aqui modal, isAuthenticaded', modal, isAuthenticated);
        toggle();
      }
    }
    return () => {
      //console.log('useEffect.error destroy');
      setErrorMsgRegister(null);
      setUserForm({ name: '', email: '', password: '' });
    };
    // eslint-disable-next-line
  }, [error]);

  const toggle = () => {
    // console.log('function toggle modal', modal);
    clearErrors();
    setModal(!modal);
  };

  const onChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log('user ==>', userForm);

    //const { name, email, password } = userForm;
    //create user object

    // Attempt to register
    register({
      name: userForm.name,
      email: userForm.email,
      password: userForm.password,
    });

    //toggle();
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {errorMsgRegister ? (
            <Alert color="danger">{errorMsgRegister}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                value={userForm.name}
                className="mb-3"
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                onChange={onChange}
                value={userForm.email}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                value={userForm.password}
                className="mb-3"
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal,
);
