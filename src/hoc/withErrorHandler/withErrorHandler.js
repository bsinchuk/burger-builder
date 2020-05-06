import React from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-request-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [state, setState] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal 
          showed={state.error}
          modalClosed={() => setState({error: null})}>
            {state.error ? state.error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler;