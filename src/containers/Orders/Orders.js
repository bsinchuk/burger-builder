import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const fetched = [];
        for (const key in res.data) {
          fetched.push({
            ...res.data[key],
            id: key })
        }
        this.setState({orders: fetched});
        console.log(fetched);
      })
      .finally(() => {this.setState({loading: false})});
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price} />
        ))}
      </div>
    )
  }
}

export default Orders
