import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Divider } from 'antd';
import DetailItem from '../DetailItem/DetailItem';
import { IState } from '../../states/IState';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import ActionType from '../../redux/actions/ActionTypes';
import styles from './NotebookDetailDrawer.module.scss';

export interface INotebookDetailDrawerProps {
  isOpen?: boolean;
  dispatch?: Dispatch;
  selection?: INotebookInfo;
}

export interface INotebookDetailDrawerState {}

class NotebookDetailDrawer extends React.Component<INotebookDetailDrawerProps, INotebookDetailDrawerState> {
  public constructor(props: INotebookDetailDrawerProps) {
    super(props);
    this.state = {};
  }

  private onDismiss = (): void => {
    this.props.dispatch?.({
      type: ActionType.CLOSE_NOTEBOOK_DETAIL_DRAWER,
    });
  };

  private getNotebookDetail = (): JSX.Element => {
    const { selection } = this.props;
    if (!selection) {
      return <></>;
    }
    return (
      <>
        <div className={styles.header}>
          <Divider orientation="left">Notebook</Divider>
        </div>
        <div className={styles.content}>
          <DetailItem label="Name" fieldValue={selection.name} />
          <DetailItem label="Pod Name" fieldValue={selection.podName} />
          <DetailItem label="Namespace" fieldValue={selection.namespace} />
          <DetailItem label="Created" fieldValue={selection.createdOn} />
          <DetailItem label="Gateway Name" fieldValue={selection.gatewayName} />
          <DetailItem label="Gateway Namespace" fieldValue={selection.gatewayNamespace} />
          <DetailItem label="Labels" fieldValues={selection.label} />
          <DetailItem label="Status" fieldValue={selection.status} />
          <DetailItem label="Node" fieldValue={selection.node} />
          <DetailItem label="Conditions" fieldValues={selection.conditions} />
        </div>
      </>
    );
  };

  private getDetailContent = (): JSX.Element => <div className={styles.drawerBody}>{this.getNotebookDetail()}</div>;

  public render(): JSX.Element {
    return (
      <>
        <Drawer
          title={this.props.selection?.name}
          closable
          onClose={this.onDismiss}
          visible={this.props.isOpen}
          width={720}
        >
          {this.getDetailContent()}
        </Drawer>
      </>
    );
  }
}

function mapStateToProps(state: IState, ownProps: INotebookDetailDrawerProps): INotebookDetailDrawerProps {
  return {
    ...ownProps,
    isOpen: state.showNotebookDetailDrawer,
    selection: state.notebook.selectedNotebook,
  };
}

export default connect(mapStateToProps)(NotebookDetailDrawer);
