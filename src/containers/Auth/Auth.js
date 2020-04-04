import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { validate } from '../../shared/utility';
import styles from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignIn: false
  }

  componentDidMount() {
    if (!this.props.building) {
      this.props.setRedirectPath();
    }
  }
  
  inputChangedHandler = (event, id) => {
    const form = {
      ...this.state.controls
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
    this.setState({controls: form});
  }

  formSubmittedHandler = (event) => {
    event.preventDefault();
    this.props.authenticate(this.state.controls.email.value,
                            this.state.controls.password.value,
                            this.state.isSignIn);
  }

  signModeChangedHandler = () => {
    this.setState((prevState) => {
      return {
        isSignIn: !prevState.isSignIn
      }
    });
  }

  render() {
    const formArray = [];
    for (const key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
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
        changed={(event) => this.inputChangedHandler(event, e.id)} />
    ));

    if (this.props.loading) {
      inputs = <Spinner />
    }

    let error = null;
    if (this.props.error) {
      error = (
        <p>{this.props.error}</p>
      )
    }
    
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.redirectPath} />
    }

    return (
      <div className={styles.auth}>
        {redirect}
        {error}
        <form 
          className={styles['auth__form']} 
          onSubmit={e => this.formSubmittedHandler(e)}>
          {inputs}
          <Button type='success'>Sign {this.state.isSignIn ? 'In' : 'Up'}</Button> 
        </form>
        <Button 
          type='danger'
          clicked={this.signModeChangedHandler}>
            SWITCH TO SIGN {this.state.isSignIn ? 'UP' : 'IN'}
        </Button>
      </div>
    );
  }
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