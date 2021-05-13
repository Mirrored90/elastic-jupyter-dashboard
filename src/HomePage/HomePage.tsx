import * as React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { Layout } from 'antd';
import SideMenu, { MenuKey } from '../components/SiedeMenu/SideMenu';
import NotebookOverview from '../NotebookPage/OverviewPage/NotebookOverview';
import GatewayOverview from '../GatewayPage/OverviewPage/GatewayOverview';
import KernelOverview from '../KernelPage/OverviewPage/KernelOverview';
import styles from './HomePage.module.scss';

const { Header, Footer, Content } = Layout;

export interface IHomePageProps {}

export interface IHomePageState {}

function NoMatch(): JSX.Element {
  const location = useLocation<Location>();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  public constructor(props: IHomePageProps) {
    super(props);
    this.state = {};
  }

  private getContent = (): JSX.Element => (
    <Content>
      <Switch>
        <Route exact path="/">
          <Redirect to={MenuKey.NotebookOverview} />
        </Route>
        <Route exact path={MenuKey.NotebookOverview} component={NotebookOverview} />
        <Route exact path={MenuKey.GatewayOverview} component={GatewayOverview} />
        <Route exact path={MenuKey.KernelOverview} component={KernelOverview} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Content>
  );

  public render(): JSX.Element {
    return (
      <>
        <Layout className={styles.fillWindow}>
          <SideMenu />
          <Layout>
            <Header>Header</Header>
            {this.getContent()}
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
