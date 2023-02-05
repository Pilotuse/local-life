import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Badge, message, Tooltip } from 'antd';
import AddDrugs from './components/AddDrugs'
import services from '@/services'
import { useRef, useState } from 'react';
import Barcode from '@/components/Barcode'
import { DRUG_VALUEENUM, DRUG_TYPE } from '@/constants'
import { TabletOutlined } from '@ant-design/icons';

import styles from './index.less'


type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '药品名称',
    dataIndex: 'drugName',
    width: 250,
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '药品条码',
    dataIndex: 'drug_barcode',
    copyable: true,
    ellipsis: true,
    render: (_, record: any) => {
      return <Barcode value={record.drug_barcode} height={20} width={1} />
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    render: (_, record: any) => {
      return <Badge status="success" text={DRUG_VALUEENUM[record.state]?.text} />
    },
    valueEnum: DRUG_VALUEENUM,
  },
  {
    title: '售价',
    key: 'price',
    dataIndex: 'price',
    hideInSearch: true,
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'drug_type',
    search: false,
    render: (_, record: any) => {
      return <span>{DRUG_TYPE?.find(el => el.value === record.drug_type)?.label}</span>
    },
    renderFormItem: (_: any, { defaultRender }: any) => {
      return defaultRender(_);
    },
  },
  {
    title: '主治',
    key: 'indications',
    dataIndex: 'indications',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '剩余含量',
    tooltip: '剂次单位: 片或毫升',
    key: 'tablets',
    dataIndex: 'tablets',
    hideInSearch: true,
  },
  {
    title: '历史服用',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '说明书',
    key: 'instructions',
    tooltip: '文本或照片',
    dataIndex: 'instructions',
    hideInSearch: true,
  },
  {
    title: '过期时间',
    key: 'lifespan_time',
    dataIndex: 'lifespan_time',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'ctime',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value: any) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text: any, record: any, _: any, action: any) => {
      return [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
            { key: 'print', name: '打印' },
          ]}
        />,
      ]
    },
  },
];

const DrugReserve = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const onRequest = async (params: any) => {
    const result = await services.DrugController.QueryDrugs(params)
    if (!result?.success) {
      message.error(result.msg)
      return Promise.reject({
        data: [],
        success: false,
      });
    }
    return Promise.resolve({
      data: result.data,
      success: true,
    });
  }

  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={onRequest}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          // 比较两个不一样的地方，然后进行变更

          console.log(rowKey, data, row);
   
        },
        onChange: setEditableRowKeys,
      }}
      className={styles["drug-reserve-container"]}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      headerTitle="家庭药品信息"
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      // options={false}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values: any, type: any) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Tooltip key="search" title="移动端新增">
          <Button type="primary" shape="circle" icon={<TabletOutlined />} />
        </Tooltip>,
        <AddDrugs key="add" type="add" reload={actionRef?.current?.reload} />,
        <Button key="delete" type="default">
          批量删除
        </Button>
      ]}
    />
  );
};

export default DrugReserve
