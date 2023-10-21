import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const getUsernameAvatar = () => {
  return (
    <div>
      <Avatar
        style={{ backgroundColor: '#6e6af3', verticalAlign: 'middle', margin: 0 }}
        size={35}
        icon={<UserOutlined />}
      >
      </Avatar>
    </div>
  );
};