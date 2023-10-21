import React from 'react';
import { Tag } from 'antd';

export const columns = [
  { title: 'Id', dataIndex: 'key', width: 50, align: 'center', key: '1' },
  { title: 'Name', ellipsis: true, dataIndex: 'name', key: '2' },
  { title: 'Description', ellipsis: true, dataIndex: 'description', key: '3' },
  { title: 'Group', width: 250, align: 'center',
    children: [
      { title: 'Quantity', dataIndex: 'qty', width: 100, align: 'center', key: '4' },
      { title: 'owner', dataIndex: 'owner', width: 150, align: 'center', key: '5' },
    ]
  },
  { title: 'Category', dataIndex: 'category', width: 120, key: '6',
    render: tag => {
      return (
        <Tag color={getTagColor(tag)} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
];

function getTagColor(tag) {
  if (tag === 'accessory') return 'volcano';
  if (tag === 'clothing') return 'geekblue';
  if (tag === 'jewellery') return 'green';
  return 'blue';
}

export const PAGE_SIZE = 2;
export const dataSource = {
  totalElements: 3,
  content: [
    { key: 1, name: 'Personalized 1', description: 'This is a metal 1', qty: 32, owner: 'John Brown 1', category: 'jewellery' },
    { key: 2, name: 'Personalized 2', description: 'This is a metal 2', qty: 35, owner: 'John Brown 2', category: 'clothing' },
    { key: 3, name: 'Personalized 3', description: 'This is a metal 3', qty: 43, owner: 'John Brown 3', category: 'jewellery' },
    { key: 4, name: 'Personalized 4', description: 'This is a metal 4', qty: 12, owner: 'John Brown 4', category: 'clothing' },
    { key: 5, name: 'Personalized 5', description: 'This is a metal 5', qty: 21, owner: 'John Brown 5', category: 'jewellery' },
    { key: 6, name: 'Personalized 6', description: 'This is a metal 6', qty: 16, owner: 'John Brown 6', category: 'jewellery' },
    // ...  
  ],
};