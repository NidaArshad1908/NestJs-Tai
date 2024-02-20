import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { SaleInvoicesList } from '../../components/SaleInvoices';

const SaleInvoices = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Sale Invoices</Card.Header>
        <Card.Body>
          <SaleInvoicesList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default SaleInvoices;
