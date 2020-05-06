import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

  useEffect(() => {
    props.fetchOrders(props.token, props.id);
  }, [])

  let orders = <Spinner />;
  if (!props.loading) {
  orders = (
    <div>
      {props.orders.map(order => (
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={+order.price} />
      ))}
    </div>
  )
  }
  return orders;
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    id: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, id) => dispatch(actions.fetchOrdersInit(token, id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
