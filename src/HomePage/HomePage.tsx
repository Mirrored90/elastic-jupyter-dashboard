import * as React from 'react';
import { Layout } from 'antd';
import MainMenu, { MenuKey } from '../components/MainMenu/MainMenu';
import HeaderBreadcrumb from '../components/HeaderBreadcrumb/HeaderBreadcrumb';

const { Header, Footer, Sider, Content } = Layout;

export interface IHomePageProps {}

export interface IHomePageState {
  selectedMenu: string;
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  public constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      selectedMenu: '',
    };
  }

  private setSelectedMenu = (value: string): void => {
    this.setState({ selectedMenu: value });
  };

  private getContent = (): JSX.Element => {
    switch (this.state.selectedMenu) {
      case MenuKey.NotebookOverview:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.NotebookWorkloads:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.NotebookLogs:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.GatewayOverview:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.GatewayWorkloads:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.GatewayLogs:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.KernelOverview:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.KernelWorkloads:
        return <>{this.state.selectedMenu}</>;
      case MenuKey.KernelLogs:
        return <>{this.state.selectedMenu}</>;
      default:
        return <></>;
    }
  };

  public render(): JSX.Element {
    return (
      <>
        {/* <Layout className={styles.fillWindow}> */}
        <Layout style={{ height: '100%', position: 'absolute', left: '0', width: '100%', overflow: 'hidden' }}>
          <Sider>
            <MainMenu onMenuSelected={this.setSelectedMenu} />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content>{this.getContent()}</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
