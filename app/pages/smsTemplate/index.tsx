import { Card } from 'react-bootstrap';
import React from 'react';
import { AdminLayout } from '../../layout';
import { SmsTemplateList } from '../../components/SmsTemplate';

const SmsTemplate = () => {
  return (
    <AdminLayout>
      <Card style={{ width: 1320, backgroundColor: '#3c4b64' }}>
        <Card.Header style={{ color: '#FFFFFF' }}>SMS Template</Card.Header>
        <Card.Body>
          <SmsTemplateList />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default SmsTemplate;
