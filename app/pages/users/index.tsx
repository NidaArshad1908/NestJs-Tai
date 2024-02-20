import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { UserList } from '../../components/Users';

const Users = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Users</Card.Header>
        <Card.Body>
          <UserList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Users;
