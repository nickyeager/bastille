import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { Form, Upload, Button, Table } from 'antd';
import { useIntl } from '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';

const Admin: React.FC = () => {
  const intl = useIntl();
  const [formFields, setFormFields] = useState([]);

  const formFieldsToExtract = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    // ... add more fields here
  ];

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleFormSubmit = async ({upload: upload}) => {
    const { file } = upload[0];

    // TODO: Call third-party API to extract form fields from file

    const extractedFields = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      // ... replace with actual extracted fields
    };

    /*setFormFields([extractedFields]);*/
  };

  const columns = [
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
    { title: 'Email', dataIndex: 'email' },
    // ... add more columns for each form field to display
  ];

  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'Upload your file here  ',
      })}
    >
      <Card>
        <Form {...formLayout} onFinish={handleFormSubmit}>
          <Form.Item
            name="upload"
            label="Upload Document"
            rules={[{ required: true, message: 'Please upload a document' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload.Dragger name="file" action="/upload">
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={formFields} />
      </Card>
    </PageContainer>
  );
};

export default Admin;