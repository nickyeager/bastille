import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {addDocumentTypes} from '../../../services/backend/document'


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const onSaveRow = (rowKey: number, data : any, row: any) => {
  // Save the documents current row.
  console.log('row saved ')
  console.log(data);
  console.log(row);

  // get the name from the row, along with the current l  ogged in user.

  /*await addDocumentTypes()*/

}

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

export default (editableKeys : any,  setEditableRowKeys  : any) => {
/*  export default () => {*/
    // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
console.log(editableKeys);
  console.log(setEditableRowKeys);
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
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
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
    <>
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
          onSave: async (rowKey, data, row) => {
            await onSaveRow(rowKey, data, row);
            // save the row
/*            console.log(rowKey, data, row);
            await waitTime(2000);*/
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="JSON Values" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
