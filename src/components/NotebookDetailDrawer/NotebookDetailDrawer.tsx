import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';

export interface INotebookDetailDrawerProps {
  isOpen?: boolean;
  dispatch?: Dispatch;
}

export interface INotebookDetailDrawerState {
  // rowId: string;
}

// eslint-disable-next-line react/prefer-stateless-function
class NotebookDetailDrawer extends React.Component<INotebookDetailDrawerProps, INotebookDetailDrawerState> {
  public constructor(props: INotebookDetailDrawerProps) {
    super(props);
    this.state = {
      // rowId: '',
    };
  }

  private onDismiss = (): void => {
    console.log('---- dismiss');
    this.props.dispatch?.({
      type: ActionType.CLOSE_NOTEBOOK_DETAIL_DRAWER,
    });
  };

  public render(): JSX.Element {
    return (
      <>
        <Drawer title="Basic Drawer" closable onClose={this.onDismiss} visible={this.props.isOpen} width={750}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}

function mapStateToProps(state: IState, ownProps: INotebookDetailDrawerProps): INotebookDetailDrawerProps {
  return {
    ...ownProps,
    isOpen: state.showNotebookDetailDrawer,
  };
}

export default connect(mapStateToProps)(NotebookDetailDrawer);
