import type { ProFormInstance } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProFormRadio,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { message, Upload } from 'antd';
import React, {useRef, useState} from 'react';

import {addDocumentTypes, addField} from '@/services/backend/document';
import {currentUser} from "@/services/backend/api";


export default () => {
  const formRef = useRef<ProFormInstance>();
  type DataSourceType = {
    id: React.Key;
    name?: string;
    value?: string;
    state?: string;
    created_at?: string;
    update_at?: string;
    children?: DataSourceType[];
  };

  const defaultData: DataSourceType[] = [
  ];

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [documentType, setDocumentType] = useState<{ }>({});
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tooltip: 'Enter the name of the value to be extracted.',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: 'What?' }] : [],
        };
      },
      width: '15%',
    },
    {
      title: 'Value',
      dataIndex: 'readonly',
      tooltip: 'The value that is being extracted',
      readonly: true,
      width: '15%',
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      readonly: true,
      valueEnum: {
        all: { text: 'Default', status: 'Default' },
        open: {
          text: 'Error',
          status: 'Error',
        },
        closed: {
          text: 'Success',
          status: 'Success',
        },
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      valueType: 'date',
      readonly: true,
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      valueType: 'date',
      readonly: true,
    },
    {
      title: 'Actions',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {

          message.success('Form type created');
        }}
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="documentTypeName"
          title="Enter the type of document you'd like to name "
          stepProps={{
            description: "Examples include: Purchase Request, Purchase Order, etc",
          }}
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="documentTypeName"
            label="Document Type Name"
            width="md"
            tooltip="Enter the document types name"
            placeholder="The document name"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="documentFields"
          title="Enter the field titles"
          stepProps={{
            description: 'Enter the fields you want to extract in the form',
          }}
          onFinish={async () => {

            if (dataSource.length) {
              const { data, error } = await currentUser()
              const {user} = data;
              const { id } = user;
              const documentTypeField = formRef.current?.getFieldsValue("documentFields");
              const { documentTypeName } = documentTypeField;
              const documentType = await addDocumentTypes({name: documentTypeName, user: id})
              if (documentType)
              {
                setDocumentType(documentType);
                dataSource.map(data => {
                  addField({name: data.name, user: id, document_type: documentType.id});
                });
              }
            }
            return true
          }}
        >
            <EditableProTable<DataSourceType>
              rowKey="id"
              headerTitle="Enter the fields you want to extract from the document."
              maxLength={5}
              scroll={{
                x: 960,
              }}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                    position: position as 'top',
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                  }
                  : false
              }
              loading={false}
              toolBarRender={() => [
                <ProFormRadio.Group
                  key="render"
                  fieldProps={{
                    value: position,
                    onChange: (e) => setPosition(e.target.value),
                  }}
                  options={[
                    {
                      label: 'Top',
                      value: 'top',
                    },
                    {
                      label: 'Bottom',
                      value: 'bottom',
                    },
                    {
                      label: 'Hidden',
                      value: 'hidden',
                    },
                  ]}
                />,
              ]}
              columns={columns}
              request={async () => ({
                data: defaultData,
                total: 3,
                success: true,
              })}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
              }}
            />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="upload"
          title="Upload Document"
          stepProps={{
            description: "Upload the document you'd like to extract text form",

          }}
        >
          <Upload.Dragger
            name="file"
            action="http://localhost:8002/api/extract"
            data={{
              api_key: "test",
              document_type: documentType,
              prompt: "Extract the following data from this document: document Type, line items, total amount, customer, customer address, vendor address. Return the answer in JSON"
            }}
            onChange={async (info) => {
              console.log(info);
              console.log('called');
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
              if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
            }}
          >
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              You'll see a preview of the document here.
            </p>
          </Upload.Dragger>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
