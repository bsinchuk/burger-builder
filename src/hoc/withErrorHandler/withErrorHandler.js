import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // was componentWillMount, changed cause of warning
    componentDidMount() {
      this.reqInt = axios.interceptors.request.use(res => {
        this.setState({error: null});
        return res;
      });
      this.respInt = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err});
        return Promise.reject(err);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.respInt);
    }
    render() {
      return (
        <Aux>
          <Modal 
            showed={this.state.error}
            modalClosed={() => this.setState({error: null})}>
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;