import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { OrdersList } from '../../components/Orders';

const Orders = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Customers Orders</Card.Header>
        <Card.Body>
          <OrdersList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Orders;
