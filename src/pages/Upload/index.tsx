import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { Form, Upload, Button, Input  } from 'antd';
import { useIntl } from '@umijs/max';
import { Card } from 'antd';
import FieldTable from "./FieldTable/FieldTable";
import React from 'react';

const UploadForm: React.FC = () => {
  const intl = useIntl();
  const [formFields, setFormFields] = useState([]);


  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleFormSubmit = async ({upload: upload}) => {
    const { file } = upload[0];

    // TODO: Call third-party API to extract form fields from file

// /*    const extractedFields = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@example.com',
//       // ... replace with actual extracted fields
//     };*/

    /*setFormFields([extractedFields]);*/
  };


  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'Upload your file here',
      })}
    >
      <Card>
        <Form {...formLayout} onFinish={handleFormSubmit}>

          <Form.Item
            name="documentTypeTitle"
            label="Enter the name of the document type"
            rules={[{ required: true, message: 'Please enter the name of the document type' }]}
            valuePropName="documentTypeTitle"
          >
            <Input placeholder="Form title" name="documentTypeTitle" />
          </Form.Item>
          <FieldTable />
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
      </Card>
    </PageContainer>
  );
};

export default UploadForm;
