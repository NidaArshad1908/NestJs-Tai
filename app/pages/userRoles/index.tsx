import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { UserRolesList } from '../../components/UserRoles';

const UserRoles = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>User Roles</Card.Header>
        <Card.Body>
          <UserRolesList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default UserRoles;
