import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { BrandsandRatesList } from '../../components/Brands&Rates';

const BrandsandRates = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Brands & Rates</Card.Header>
        <Card.Body>
          <BrandsandRatesList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default BrandsandRates;
