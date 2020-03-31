import React, { Component } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.id);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
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
