import React, { useState } from 'react';
import { Table } from 'antd';
import useActionMenu from './ActionMenu';
import { useAppSelector } from '../../../../app/hooks';
import * as constants from './Constants';

function useDataTable({ doPaging }) {
  const { loading, dataSource } = useAppSelector((rootState) => {
    let loading = rootState.homePage.table.loading;
    let dataSource = rootState.homePage.table.data;
    return { loading, dataSource };
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actionColumnView] = useActionMenu({ selectedRow });

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.key === 2,
    }),
  };

  const updatedColumns = [
    ...constants.columns,
    { title: 'Action', width: 150, align: 'center', render: () => actionColumnView, key: '-1', fixed: 'right' },
  ];

  const handleTableChange = pagination => {
    doPaging({currentPage: pagination.current - 1})
  };

  const DataTable = () => (
    <Table
      rowKey={record => record.key}
      rowSelection={rowSelection}
      columns={updatedColumns}
      dataSource={dataSource.content}
      loading={loading}
      scroll={{ y: 150 }}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            setSelectedRow(record);
          },
        };
      }}
      onChange={handleTableChange}
      pagination={{
        pageSize: constants.PAGE_SIZE,
        current: dataSource.currentPage + 1,
        total: dataSource.total,
        showTotal: (total, range) => {
          return `${range[0]}-${range[1]} of ${total} items`;
        },
      }}
    />
  );

  return {
    DataTable,
    hasSelected,
    selectedRow,
    selectedRowKeys,
  };
}

export default useDataTable;