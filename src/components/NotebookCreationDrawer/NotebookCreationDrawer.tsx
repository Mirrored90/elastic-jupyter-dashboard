import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form, Drawer, Button, Row, Col, Input, Space, Switch } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';
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
  gatewayName: string;
  gatewayNamespace: string;
  customizeContainer: boolean;
  containerName: string;
  containerNamespace: string;
  containerCommands: string[];
}

class NotebookCreationDrawer extends React.Component<INotebookCreationDrawerProps, INotebookCreationDrawerState> {
  formRef = React.createRef<FormInstance>();

  public constructor(props: INotebookCreationDrawerProps) {
    super(props);
    this.state = {
      notebookName: '',
      notebookNamespace: '',
      gatewayName: '',
      gatewayNamespace: '',
      customizeContainer: false,
      containerName: '',
      containerNamespace: '',
      containerCommands: [],
    };
  }

  private onSubmit = (): void => {
    console.log(
      '-',
      this.state.notebookName,
      '-',
      this.state.notebookNamespace,
      '-',
      this.state.gatewayName,
      '-',
      this.state.gatewayNamespace,
      '-',
      this.state.containerName,
      '-',
      this.state.containerNamespace,
    );
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
      containerNamespace: '',
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

  private onContainerNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      containerNamespace: e.target.value,
    });
  };

  private getNotebookContent = (): JSX.Element => (
    <>
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
    </>
  );

  private getGatewayContent = (): JSX.Element => (
    <>
      <Space direction="vertical">
        <div className={styles.header}>
          <GatewayBackIcon />
          <div className={styles.headerText}>Gateway</div>
        </div>
        <div>Specify the name and namespace of the gateway which links to the notebook.</div>
      </Space>
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
    <>
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
    </>
  );

  private getListForCommands = (): JSX.Element => (
    <Form.List name="commands">
      {(fields, { add, remove }) => (
        <>
          <Form.Item label="Commands">
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
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const commands: string[] = this.state.containerCommands;
                    commands[name] = e.target.value;
                    this.setState(
                      {
                        containerCommands: [...commands],
                      },
                      () => {
                        console.log('--current commands:', this.state.containerCommands);
                      },
                    );
                  }}
                />
              </Form.Item>
              <MinusCircleOutlined
                onClick={() => {
                  remove(name);
                  const toRemove: string = this.state.containerCommands[name];
                  const commands: string[] = this.state.containerCommands.filter((item) => item !== toRemove);
                  // const commands: string[] = this.state.containerCommands.splice(name, 1);
                  this.setState(
                    {
                      containerCommands: [...commands],
                    },
                    () => {
                      console.log('--current commands:', this.state.containerCommands);
                    },
                  );
                }}
              />
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );

  private getContainerExtraContent = (): JSX.Element => (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item name="containerName" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input onChange={this.onContainerNameChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="containerNamespace"
            label="Namespace"
            rules={[{ required: true, message: 'Please enter namespace' }]}
          >
            <Input onChange={this.onContainerNamespaceChange} />
          </Form.Item>
        </Col>
      </Row>
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
    <div
      style={{
        textAlign: 'right',
      }}
    >
      <Button style={{ marginRight: 8 }}>Cancel</Button>
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
