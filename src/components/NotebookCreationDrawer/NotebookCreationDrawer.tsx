import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form, Drawer, Button, Row, Col, Input, Space } from 'antd';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import { NotebookIcon } from '../Icons/Icons';
import styles from './NotebookCreationDrawer.module.scss';

export interface INotebookCreationDrawerProps {
  isOpen?: boolean;
  dispatch?: Dispatch;
}

export interface INotebookCreationDrawerState {}

class NotebookCreationDrawer extends React.Component<INotebookCreationDrawerProps, INotebookCreationDrawerState> {
  public constructor(props: INotebookCreationDrawerProps) {
    super(props);
    this.state = {};
  }

  private onCloseDrawer = (): void => {
    this.props.dispatch?.({
      type: ActionType.CLOSE_NOTEBOOK_CREATION_DRAWER,
    });
  };

  private getFooterContent = (): JSX.Element => (
    <div
      style={{
        textAlign: 'right',
      }}
    >
      <Button style={{ marginRight: 8 }}>Cancel</Button>
      <Button type="primary">Submit</Button>
    </div>
  );

  private getNotebookContent = (): JSX.Element => (
    <>
      <Space direction="vertical">
        <div className={styles.header}>
          <NotebookIcon />
          <div className={styles.headerText}>Notebook</div>
        </div>
        <div>Specify the name and namespace of the notebook server</div>
      </Space>
      <Row className={styles.rowContainer} gutter={20}>
        <Col span={12}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter user name' }]}>
            <Input placeholder="Please enter user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="namespace" label="Url" rules={[{ required: true, message: 'Please enter url' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  private getDrawerContent = (): JSX.Element => (
    <div className={styles.drawerBody}>{this.getNotebookContent()}</div>
    // <Form layout="vertical" hideRequiredMark>
    //   <Row gutter={16}>
    //     <Col span={12}>
    //       <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter user name' }]}>
    //         <Input placeholder="Please enter user name" />
    //       </Form.Item>
    //     </Col>
    //     <Col span={12}>
    //       <Form.Item name="url" label="Url" rules={[{ required: true, message: 'Please enter url' }]}>
    //         <Input style={{ width: '100%' }} addonBefore="http://" addonAfter=".com" placeholder="Please enter url" />
    //       </Form.Item>
    //     </Col>
    //   </Row>
    // </Form>
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
          <Form hideRequiredMark>{this.getDrawerContent()}</Form>
        </Drawer>
      </>
    );
  }
}

function mapStateToProps(state: IState, ownProps: INotebookCreationDrawerProps): INotebookCreationDrawerProps {
  return { ...ownProps, isOpen: state.showNotebookCreationDrawer };
}

export default connect(mapStateToProps)(NotebookCreationDrawer);
