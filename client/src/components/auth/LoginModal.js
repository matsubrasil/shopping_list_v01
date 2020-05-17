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
import { login } from './../../actions/authActions';
import { clearErrors } from './../../actions/errorActions';

const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {
  const initialValue = {
    email: '',
    password: '',
  };
  const [modal, setModal] = useState(false);
  const [userForm, setUserForm] = useState(initialValue);
  const [errorMsgLogin, setErrorMsgLogin] = useState(null);

  // console.log('console.log abertura modal1', modal);

  useEffect(() => {
    return () => {
      setErrorMsgLogin(null);
      // console.log('destroy');
    };
  }, []);

  useEffect(() => {
    // console.log('RegsiterModal: useEffect => ErrorReducer', error);
    if (error.id === 'LOGIN_FAIL') {
      console.log('useEffect.error:  LOGIN_FAIL', error.id);
      setErrorMsgLogin(error.warning_msg.msg);
      setUserForm({ name: '', email: '', password: '' });
      return;
    } else {
      setErrorMsgLogin(null);
      setUserForm({ name: '', email: '', password: '' });
      // console.log('useEffect.error : LOGIN_SUCCESS', error.id);
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
      setErrorMsgLogin(null);
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

    // Attempt to login
    login(userForm);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {errorMsgLogin ? <Alert color="danger">{errorMsgLogin}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
