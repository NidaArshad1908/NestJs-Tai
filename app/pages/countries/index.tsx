import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { CountriesList } from '../../components/Countries';

const Countries = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Countries</Card.Header>
        <Card.Body>
          <CountriesList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Countries;
