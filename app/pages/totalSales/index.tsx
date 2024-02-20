import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { TotalSalesList } from '../../components/TotalSales';
import TableData from '../../components/TotalSales/TableData';

const TotalSales = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>Total Sales</Card.Header>
        <Card.Body>
          <TotalSalesList />
          <TableData />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default TotalSales;
