import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { validate } from '../../shared/utility';
import styles from './Auth.css';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      modified: false,
      valid: false,
      validation: {
        required: true
      },
      errorMessage: ''
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password'
      },
      value: '',
      modified: false,
      valid: false,
      validation: {
        required: true,
        minLength: 6
      },
      errorMessage: ''
    }
  });
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (!props.building) {
      props.setRedirectPath();
    }
  }, []);
  
  const inputChangedHandler = (event, id) => {
    const form = {
      ...controls
    };
    const element = {
      ...form[id]
    };
    element.modified = true;
    element.value = event.target.value;
    const [valid, message] = validate(element.value, element.validation);
    element.valid = valid;
    element.errorMessage = message;
    form[id] = element;
    setControls(form);
  }

  const formSubmittedHandler = (event) => {
    event.preventDefault();
    props.authenticate(controls.email.value,
                            controls.password.value,
                            isSignIn);
  }

  const signModeChangedHandler = () => {
    setIsSignIn(!isSignIn);
  }

  const formArray = [];
  for (const key in controls) {
    formArray.push({
      id: key,
      config: controls[key]
    })
  }
  let inputs = formArray.map(e => (
    <Input 
      key={e.id}
      elementType={e.config.elementType}
      elementConfig={e.config.elementConfig}
      invalid={!e.config.valid}
      validated={e.config.validation}
      touched={e.config.modified}
      errorMessage={e.config.errorMessage}
      value={e.config.value}
      changed={(event) => inputChangedHandler(event, e.id)} />
  ));

  if (props.loading) {
    inputs = <Spinner />
  }

  let error = null;
  if (props.error) {
    error = (
      <p>{props.error}</p>
    )
  }
  
  let redirect = null;
  if (props.isAuthenticated) {
    redirect = <Redirect to={props.redirectPath} />
  }

  return (
    <div className={styles.auth}>
      {redirect}
      {error}
      <form 
        className={styles['auth__form']} 
        onSubmit={e => formSubmittedHandler(e)}>
        {inputs}
        <Button type='success'>Sign {isSignIn ? 'In' : 'Up'}</Button> 
      </form>
      <Button 
        type='danger'
        clicked={signModeChangedHandler}>
          SWITCH TO SIGN {isSignIn ? 'UP' : 'IN'}
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.auth.redirectPath,
    building: state.burger.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password, login) => dispatch(actions.authInit(email, password, login)),
    setRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);