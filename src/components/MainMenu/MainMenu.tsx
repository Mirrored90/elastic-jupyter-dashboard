import * as React from 'react';
import { Menu } from 'antd';
import { JupyterIcon, GatewayIcon, KernelIcon } from '../Icons/Icons';

export enum MenuKey {
  NotebookOverview = 'Notebook_Overview',
  NotebookWorkloads = 'Notebook_Workloads',
  NotebookLogs = 'Notebook_Logs',
  GatewayOverview = 'Gateway_Overview',
  GatewayWorkloads = 'Gateway_Workloads',
  GatewayLogs = 'Gateway_Logs',
  KernelOverview = 'Kernel_Overview',
  KernelWorkloads = 'Kernel_Workloads',
  KernelLogs = 'Kernel_Logs',
}

export interface IMainMenuProps {
  onMenuSelected: (value: string) => void;
}

export default function MainMenu(props: IMainMenuProps): JSX.Element {
  const { SubMenu } = Menu;
  const menuKeys: string[] = ['Notebook', 'Gateway', 'Kernel'];
  const [selectedKey, setSelectedKey] = React.useState<string>(MenuKey.NotebookOverview);

  React.useEffect(() => {
    // console.log('------', selectedKey);
    props.onMenuSelected(selectedKey);
  }, [props, selectedKey]);

  function getSubMenuForNotebook(): JSX.Element {
    return (
      <SubMenu key={menuKeys[0]} icon={<JupyterIcon />} title={menuKeys[0]}>
        <Menu.Item key={MenuKey.NotebookOverview} onClick={() => setSelectedKey(MenuKey.NotebookOverview)}>
          Overview
        </Menu.Item>
        <Menu.Item key={MenuKey.NotebookWorkloads} onClick={() => setSelectedKey(MenuKey.NotebookWorkloads)}>
          Workloads
        </Menu.Item>
        <Menu.Item key={MenuKey.NotebookLogs} onClick={() => setSelectedKey(MenuKey.NotebookLogs)}>
          Logs
        </Menu.Item>
      </SubMenu>
    );
  }

  function getSubMenuForGateway(): JSX.Element {
    return (
      <SubMenu key={menuKeys[1]} icon={<GatewayIcon />} title={menuKeys[1]}>
        <Menu.Item key={MenuKey.GatewayOverview} onClick={() => setSelectedKey(MenuKey.GatewayOverview)}>
          Overview
        </Menu.Item>
        <Menu.Item key={MenuKey.GatewayWorkloads} onClick={() => setSelectedKey(MenuKey.GatewayWorkloads)}>
          Workloads
        </Menu.Item>
        <Menu.Item key={MenuKey.GatewayLogs} onClick={() => setSelectedKey(MenuKey.GatewayLogs)}>
          Logs
        </Menu.Item>
      </SubMenu>
    );
  }

  function getSubMenuForKernel(): JSX.Element {
    return (
      <SubMenu key={menuKeys[2]} icon={<KernelIcon />} title={menuKeys[2]}>
        <Menu.Item key={MenuKey.KernelOverview} onClick={() => setSelectedKey(MenuKey.KernelOverview)}>
          Overview
        </Menu.Item>
        <Menu.Item key={MenuKey.KernelWorkloads} onClick={() => setSelectedKey(MenuKey.KernelWorkloads)}>
          Workloads
        </Menu.Item>
        <Menu.Item key={MenuKey.KernelLogs} onClick={() => setSelectedKey(MenuKey.KernelLogs)}>
          Logs
        </Menu.Item>
      </SubMenu>
    );
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '64px', background: 'white', textAlign: 'center', lineHeight: '64px', fontSize: 'large' }}>
        Jupyter Dashboard
      </div>
      <Menu
        style={{ height: '100%' }}
        defaultSelectedKeys={[MenuKey.NotebookOverview]}
        defaultOpenKeys={menuKeys}
        mode="inline"
      >
        {getSubMenuForNotebook()}
        {getSubMenuForGateway()}
        {getSubMenuForKernel()}
      </Menu>
    </div>
  );
}
