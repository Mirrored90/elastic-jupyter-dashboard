import * as React from 'react';
import { NavLink, withRouter, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { Menu, Layout } from 'antd';
import { JupyterIcon, GatewayIcon, KernelIcon } from '../Icons/Icons';
import styles from './SideMenu.module.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

export enum MenuKey {
  NotebookOverview = '/notebook/overview',
  NotebookWorkloads = '/notebook/workloads',
  NotebookLogs = '/notebook/logs',
  GatewayOverview = '/gateway/overview',
  GatewayWorkloads = '/gateway/workloads',
  GatewayLogs = '/gateway/logs',
  KernelOverview = '/kernel/overview',
  KernelWorkloads = '/kernel/workloads',
  KernelLogs = '/kernel/logs',
}

function SideMenu(): JSX.Element {
  const location = useLocation<Location>();
  const menuTitles: string[] = ['Notebook', 'Gateway', 'Kernel'];

  function getLogo(): JSX.Element {
    return <div className={styles.logoTitle}>Jupyter Dashboard</div>;
  }

  function getSubMenuForNotebook(): JSX.Element {
    return (
      <SubMenu key={menuTitles[0]} icon={<JupyterIcon />} title={menuTitles[0]}>
        <Menu.Item key={MenuKey.NotebookOverview}>
          <NavLink to={MenuKey.NotebookOverview}>Overview</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.NotebookWorkloads}>
          <NavLink to={MenuKey.NotebookWorkloads}>WorkLoads</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.NotebookLogs}>
          <NavLink to={MenuKey.NotebookLogs}>Logs</NavLink>
        </Menu.Item>
      </SubMenu>
    );
  }

  function getSubMenuForGateway(): JSX.Element {
    return (
      <SubMenu key={menuTitles[1]} icon={<GatewayIcon />} title={menuTitles[1]}>
        <Menu.Item key={MenuKey.GatewayOverview}>
          <NavLink to={MenuKey.GatewayOverview}>Overview</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.GatewayWorkloads}>
          <NavLink to={MenuKey.GatewayWorkloads}>Workloads</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.GatewayLogs}>
          <NavLink to={MenuKey.GatewayLogs}>Logs</NavLink>
        </Menu.Item>
      </SubMenu>
    );
  }

  function getSubMenuForKernel(): JSX.Element {
    return (
      <SubMenu key={menuTitles[2]} icon={<KernelIcon />} title={menuTitles[2]}>
        <Menu.Item key={MenuKey.KernelOverview}>
          <NavLink to={MenuKey.KernelOverview}>Overview</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.KernelWorkloads}>
          <NavLink to={MenuKey.KernelWorkloads}>Workloads</NavLink>
        </Menu.Item>
        <Menu.Item key={MenuKey.KernelLogs}>
          <NavLink to={MenuKey.KernelLogs}>Logs</NavLink>
        </Menu.Item>
      </SubMenu>
    );
  }

  return (
    <Sider>
      <div className={styles.menuContainer}>
        {getLogo()}
        <Menu
          className={styles.menuContainer}
          defaultOpenKeys={menuTitles}
          selectedKeys={[location.pathname]}
          mode="inline"
        >
          {getSubMenuForNotebook()}
          {getSubMenuForGateway()}
          {getSubMenuForKernel()}
        </Menu>
      </div>
    </Sider>
  );
}

export default withRouter(SideMenu);
