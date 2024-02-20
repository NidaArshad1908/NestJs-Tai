import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { AssignUserFunctionsList } from '../../components/AssignUserFunctions';

const AssignUserFunctions = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header>Assign User Functions</Card.Header>
        <Card.Body>
          <AssignUserFunctionsList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default AssignUserFunctions;
