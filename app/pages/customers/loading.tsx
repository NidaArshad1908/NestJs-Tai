import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { CustomersList } from '../../components/Customers';

export default function Loading() {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Customers</Card.Header>
        <Card.Body>
          <CustomersList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}
