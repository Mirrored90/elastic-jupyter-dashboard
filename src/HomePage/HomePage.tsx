import * as React from 'react';
import { Layout } from 'antd';
import MainMenu from '../components/MainMenu';
// import styles from './HomePage.module.scss';

export default function HomePage(): JSX.Element {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <div>
      {/* <Layout className={styles.fillWindow}> */}
      <Layout style={{ height: '100%', position: 'absolute', left: '0', width: '100%', overflow: 'hidden' }}>
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}
