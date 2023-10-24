import React from 'react';
import { Space } from 'antd';
import './Style.css';
import useDataTable from './component/datatable/Datatable';
import useFormSearch from './component/formSearch/FormSearch';
// import EditableRow from './component/EditableRow';

export default function HomePage() {
  const {
    FormSearch,
    doPaging,
  } = useFormSearch();

  const {
    DataTable,
    // hasSelected,
    // selectedRow,
    // selectedRowKeys,
  } = useDataTable({
    doPaging: doPaging,
  });

  return (
    <Space direction="vertical" size="small">
      <FormSearch />
      <DataTable />
    </Space>
  );
}
