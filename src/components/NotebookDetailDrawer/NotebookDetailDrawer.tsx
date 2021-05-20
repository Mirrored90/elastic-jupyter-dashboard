import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Drawer, List } from 'antd';
import { IState } from '../../states/IState';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import ActionType from '../../redux/actions/ActionTypes';

export interface INotebookDetailDrawerProps {
  isOpen?: boolean;
  dispatch?: Dispatch;
  selection?: INotebookInfo;
}

export interface INotebookDetailDrawerState {}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

// eslint-disable-next-line react/prefer-stateless-function
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

  public render(): JSX.Element {
    return (
      <>
        <Drawer
          title={this.props.selection?.notebookName}
          closable
          onClose={this.onDismiss}
          visible={this.props.isOpen}
          width={720}
        >
          <List
            size="large"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered={false}
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
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
