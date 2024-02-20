import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { WorkersList } from '../../components/Workers';

const Workers = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Workers</Card.Header>
        <Card.Body>
          <WorkersList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Workers;
