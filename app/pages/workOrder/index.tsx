import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { WorkOrderList } from '../../components/WorkOrder';

const WorkOrder = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Work Order</Card.Header>
        <Card.Body>
          <WorkOrderList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default WorkOrder;
