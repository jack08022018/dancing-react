import { React } from 'react';
import { Dropdown, Menu, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

function useActionMenu({ selectedRow }) {

  const handleMenuClick = (action) => {
    if (action.key === 'edit') {
      console.log(action)
    }
  };

  const handleSingleDelete = () => {
    console.log('handleSingleDelete, selected:', selectedRow);
  };

  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <EditOutlined />
        Update
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm title="Sure to delete?" placement="left" onConfirm={handleSingleDelete}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />} >
          <DeleteOutlined type="delete" />
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const actionColumnView = (
    <span>
      <Dropdown overlay={actionMenu} trigger={['click']}>
        <a className="ant-dropdown-link" href='#' >
          Actions <DownOutlined />
        </a>
      </Dropdown>
    </span>
  );

  return [actionColumnView];
}

export default useActionMenu;