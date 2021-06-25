import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form, Drawer, Button, Row, Col, Input, Space, Switch } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';
import DataProvider from '../../dataProvider/DataProvider';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import { NotebookIcon, DockerIcon, GatewayBackIcon } from '../Icons/Icons';
import styles from './NotebookCreationDrawer.module.scss';

export interface INotebookCreationDrawerProps {
  isOpen?: boolean;
  dispatch?: Dispatch;
}

export interface INotebookCreationDrawerState {
  notebookName: string;
  notebookNamespace: string;
  specifyGateway: boolean;
  gatewayName: string;
  gatewayNamespace: string;
  customizeContainer: boolean;
  containerName: string;
  containerCommands: string[];
  containerImage: string;
  containerPorts: string;
  containerVolumes: string;
  containerEnvironments: string;
}

class NotebookCreationDrawer extends React.Component<INotebookCreationDrawerProps, INotebookCreationDrawerState> {
  formRef = React.createRef<FormInstance>();

  private dataProvider: DataProvider;

  public constructor(props: INotebookCreationDrawerProps) {
    super(props);
    this.dataProvider = new DataProvider();
    this.state = {
      notebookName: '',
      notebookNamespace: '',
      specifyGateway: false,
      gatewayName: '',
      gatewayNamespace: '',
      customizeContainer: false,
      containerName: '',
      containerCommands: [],
      containerImage: '',
      containerPorts: '',
      containerVolumes: '',
      containerEnvironments: '',
    };
  }

  private onSubmit = (): void => {
    const newNotebook: INotebookInfo = {
      name: this.state.notebookName,
      namespace: this.state.notebookNamespace,
      ...(this.state.customizeContainer && {
        gatewayName: this.state.gatewayName,
        gatewayNamespace: this.state.gatewayNamespace,
      }),
      ...(this.state.customizeContainer && {
        containers: [
          {
            containerName: this.state.containerName,
            image: this.state.containerImage,
            ports: this.state.containerPorts,
            commands: this.state.containerCommands,
            volumes: this.state.containerVolumes,
            environment: this.state.containerEnvironments,
          },
        ],
      }),
    };
    // TODO: call POST api to create notebook here
    this.dataProvider.createNotebook(newNotebook);
    this.onCloseDrawer();
  };

  private resetState = (): void => {
    this.setState({
      notebookName: '',
      notebookNamespace: '',
      gatewayName: '',
      gatewayNamespace: '',
      customizeContainer: false,
      containerName: '',
      containerImage: '',
      containerPorts: '',
      containerVolumes: '',
      containerEnvironments: '',
    });
  };

  private onCloseDrawer = (): void => {
    this.resetState();
    this.formRef.current?.resetFields();
    this.props.dispatch?.({
      type: ActionType.CLOSE_NOTEBOOK_CREATION_DRAWER,
    });
  };

  private onNotebookNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      notebookName: e.target.value,
    });
  };

  private onGatewaySwitchChange = (checked: boolean): void => {
    this.setState({
      specifyGateway: checked,
    });
  };

  private onNotebookNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      notebookNamespace: e.target.value,
    });
  };

  private onGatewayNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      gatewayName: e.target.value,
    });
  };

  private onGatewayNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      gatewayNamespace: e.target.value,
    });
  };

  private onContainerSwitchChange = (checked: boolean): void => {
    this.setState({
      customizeContainer: checked,
    });
  };

  private onContainerNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerName: e.target.value,
    });
  };

  private onContainerImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerImage: e.target.value,
    });
  };

  private onContainerPortsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerPorts: e.target.value,
    });
  };

  private onContainerVolumesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerVolumes: e.target.value,
    });
  };

  private onContainerEnvironmentsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerEnvironments: e.target.value,
    });
  };

  private getNotebookContent = (): JSX.Element => (
    <div className={styles.sectionContainer}>
      <Space direction="vertical">
        <div className={styles.header}>
          <NotebookIcon />
          <div className={styles.headerText}>Notebook</div>
        </div>
        <div>Specify the name and namespace of the notebook server.</div>
      </Space>
      <Row className={styles.rowContainer} gutter={20}>
        <Col span={12}>
          <Form.Item name="notebookName" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input onChange={this.onNotebookNameChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="namespace" label="Namespace" rules={[{ required: true, message: 'Please enter namespace' }]}>
            <Input onChange={this.onNotebookNamespaceChange} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

  private getGatewayContent = (): JSX.Element => (
    <div className={styles.sectionContainer}>
      <Space direction="vertical">
        <div className={styles.header}>
          <GatewayBackIcon />
          <div className={styles.headerText}>Gateway</div>
        </div>
        <div>Specify the name and namespace of the gateway which links to the notebook.</div>
      </Space>
      <Row className={styles.rowContainer} gutter={20}>
        <Col span={12}>
          <Form.Item name="gatewaySwitch" label="Specify existed gateway">
            <Switch checked={this.state.specifyGateway} onChange={this.onGatewaySwitchChange} />
          </Form.Item>
        </Col>
      </Row>
      {this.state.specifyGateway && this.getGatewayExtraContent()}
    </div>
  );

  private getGatewayExtraContent = (): JSX.Element => (
    <>
      <Row className={styles.rowContainer} gutter={20}>
        <Col span={12}>
          <Form.Item name="gatewayName" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input onChange={this.onGatewayNameChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gatewayNamespace"
            label="Namespace"
            rules={[{ required: true, message: 'Please enter namespace' }]}
          >
            <Input onChange={this.onGatewayNamespaceChange} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  private getContainerContent = (): JSX.Element => (
    <div className={styles.sectionContainer}>
      <Space direction="vertical">
        <div className={styles.header}>
          <DockerIcon />
          <div className={styles.headerText}>Container</div>
        </div>
        <div>Container instruction</div>
      </Space>
      <Row className={styles.rowContainer} gutter={20}>
        <Col span={12}>
          <Form.Item name="containerSwitch" label="Customize container">
            <Switch checked={this.state.customizeContainer} onChange={this.onContainerSwitchChange} />
          </Form.Item>
        </Col>
      </Row>
      {this.state.customizeContainer && this.getContainerExtraContent()}
    </div>
  );

  private addCommands = (name: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const commands: string[] = cloneDeep(this.state.containerCommands);
    commands[name] = e.target.value;
    this.setState({
      containerCommands: [...commands],
    });
  };

  private removeCommands = (remove: (index: number | number[]) => void, name: number): void => {
    remove(name);
    const commands: string[] = cloneDeep(this.state.containerCommands);
    commands.splice(name, 1);
    this.setState({
      containerCommands: [...commands],
    });
  };

  private getListForCommands = (): JSX.Element => (
    <Form.List name="commands">
      {(fields, { add, remove }) => (
        <>
          <Form.Item className={styles.plusOutlined} label="Commands">
            <Button shape="round" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={name}
                fieldKey={fieldKey}
                rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Input onChange={(event) => this.addCommands(name, event)} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => this.removeCommands(remove, name)} />
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );

  private getContainerExtraContent = (): JSX.Element => (
    <>
      <Form.Item name="containerName" label="Name" rules={[{ required: true, message: 'Please enter namespace' }]}>
        <Input onChange={this.onContainerNameChange} />
      </Form.Item>
      <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please enter namespace' }]}>
        <Input onChange={this.onContainerImageChange} />
      </Form.Item>
      <Form.Item name="ports" label="Ports" rules={[{ required: true, message: 'Please enter namespace' }]}>
        <Input onChange={this.onContainerPortsChange} />
      </Form.Item>
      <Form.Item
        name="environments"
        label="Environments"
        rules={[{ required: true, message: 'Please enter namespace' }]}
      >
        <Input onChange={this.onContainerEnvironmentsChange} />
      </Form.Item>
      <Form.Item name="volumes" label="Volumes" rules={[{ required: true, message: 'Please enter namespace' }]}>
        <Input onChange={this.onContainerVolumesChange} />
      </Form.Item>
      {this.getListForCommands()}
    </>
  );

  private getDrawerContent = (): JSX.Element => (
    <div className={styles.drawerBody}>
      {this.getNotebookContent()}
      {this.getGatewayContent()}
      {this.getContainerContent()}
    </div>
  );

  private getFooterContent = (): JSX.Element => (
    <div className={styles.footerButton}>
      <Button style={{ marginRight: 8 }} onClick={this.onCloseDrawer}>
        Cancel
      </Button>
      <Button form="creationForm" key="submit" htmlType="submit" type="primary">
        Submit
      </Button>
    </div>
  );

  public render(): JSX.Element {
    return (
      <>
        <Drawer
          width={720}
          onClose={this.onCloseDrawer}
          visible={this.props.isOpen}
          // bodyStyle={{ paddingLeft: 16 }}
          footer={this.getFooterContent()}
        >
          <Form id="creationForm" ref={this.formRef} onFinish={this.onSubmit}>
            {this.getDrawerContent()}
          </Form>
        </Drawer>
      </>
    );
  }
}

function mapStateToProps(state: IState, ownProps: INotebookCreationDrawerProps): INotebookCreationDrawerProps {
  return { ...ownProps, isOpen: state.showNotebookCreationDrawer };
}

export default connect(mapStateToProps)(NotebookCreationDrawer);
