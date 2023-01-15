import React from 'react';
import { Tabs } from 'antd';
import DrugReserve from './DrugReserve'

const Insurance = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: `药品储备`,
        key: '1',
        children: <DrugReserve />,
      },
      {
        label: `医保消费`,
        key: '2',
        children: `Content of Tab Pane 2`,
      },
      {
        label: `其他保险`,
        key: '3',
        children: `Content of Tab Pane 2`,
      },
    ]}
  />
);

export default Insurance;
