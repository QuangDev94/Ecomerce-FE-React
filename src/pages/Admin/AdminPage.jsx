import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { renderPage } from '../../utils';
import Header from '../../components/Header/Header';

const items = [
  {
    key: 'user',
    icon: <MailOutlined />,
    label: 'User',
    // children: [
    //   {
    //     key: '11',
    //     label: 'Option 1',
    //   },
    //   {
    //     key: '12',
    //     label: 'Option 2',
    //   },
    //   {
    //     key: '13',
    //     label: 'Option 3',
    //   },
    //   {
    //     key: '14',
    //     label: 'Option 4',
    //   },
    // ],
  },
  {
    key: 'product',
    icon: <AppstoreOutlined />,
    label: 'Product',
    // children: [
    //   {
    //     key: '21',
    //     label: 'Option 1',
    //   },
    //   {
    //     key: '22',
    //     label: 'Option 2',
    //   },
    //   {
    //     key: '23',
    //     label: 'Submenu',
    //     children: [
    //       {
    //         key: '231',
    //         label: 'Option 1',
    //       },
    //       {
    //         key: '232',
    //         label: 'Option 2',
    //       },
    //       {
    //         key: '233',
    //         label: 'Option 3',
    //       },
    //     ],
    //   },
    //   {
    //     key: '24',
    //     label: 'Submenu 2',
    //     children: [
    //       {
    //         key: '241',
    //         label: 'Option 1',
    //       },
    //       {
    //         key: '242',
    //         label: 'Option 2',
    //       },
    //       {
    //         key: '243',
    //         label: 'Option 3',
    //       },
    //     ],
    //   },
    // ],
  },
];

const AdminPage = () => {
  const [pageSelected,setPageSelected] = useState('user');

  const handelOnClick = ({key}) => {
    setPageSelected(key);
  }
  return (
    <>
      <Header isHiddenSearch isHiddenCart/>
      <div style={{display: 'flex'}}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            height: '100vh'
          }}
          items={items}
          onClick={handelOnClick}
        />
        <div style={{flex: 1,padding: '15px'}}>
          {
            renderPage(pageSelected)
          }
        </div>
      </div>
    </>
  )
}

export default AdminPage