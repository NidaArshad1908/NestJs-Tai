import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { FunctionsList } from '../../components/Functions';

const Functions = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Functions</Card.Header>
        <Card.Body>
          <FunctionsList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Functions;
