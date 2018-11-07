import React from 'react'
import { Layout, Menu } from 'antd'

const Header = () => (
  <Layout.Header>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">Nav 1</Menu.Item>
      <Menu.Item key="2">Nav 2</Menu.Item>
      <Menu.Item key="3">Nav 3</Menu.Item>
    </Menu>
  </Layout.Header>
)

export default Header
