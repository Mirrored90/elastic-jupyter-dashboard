import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import { defaultColumnSettings } from '../../models/notebookModels/columns/ColumnSettings';
import styles from './NotebookList.module.scss';

const data: INotebookInfo[] = [
  {
    id: 'guid1',
    notebookName: 'notebook_111',
    notebookNamespace: 'default',
    status: 'Running',
    gatewayName: '',
    createdOn: '3/27/2021',
    notebookLabels: ['namespace=default', 'notebook=jupyter', 'notebook-samplepod-template-hash=7879f56c8c'],
  },
  {
    id: 'guid2',
    notebookName: 'notebook_work',
    notebookNamespace: 'default',
    status: 'Running',
    gatewayName: 'my gateway1',
    createdOn: '5/17/2021',
  },
  {
    id: 'guid3',
    notebookName: 'happy_jupyter',
    notebookNamespace: 'default',
    status: 'Pending',
    createdOn: '1/30/2021',
  },
];

export interface INotebookListProps {
  notebooks?: INotebookInfo[];
  dispatch?: Dispatch;
}

export interface INotebookListState {
  rowId: string;
}

class NotebookList extends React.Component<INotebookListProps, INotebookListState> {
  public constructor(props: INotebookListProps) {
    super(props);
    this.state = {
      rowId: '',
    };
  }

  private mockNotebookData = (): void => {
    this.props.dispatch?.({
      type: ActionType.UPDATE_NOTEBOOK_TABLE,
      payload: { notebooks: data },
    });
  };

  private onClickPress = (): void => {
    // TODO: remove this mock
    this.mockNotebookData();

    this.props.dispatch?.({
      type: ActionType.OPEN_NOTEBOOK_CREATION_DRAWER,
    });
  };

  private onRowClicked = (record: INotebookInfo): void => {
    this.props.dispatch?.({
      type: ActionType.UPDATE_SELECTED_NOTEBOOK,
      payload: { selectedNotebook: record },
    });

    this.props.dispatch?.({
      type: ActionType.OPEN_NOTEBOOK_DETAIL_DRAWER,
    });

    console.log('----click', ' ', record.id);
  };

  private getRenderForConnectButton = (value: any, record: INotebookInfo): JSX.Element => (
    <Button
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        console.log('----click connect', ' ', record.id);
        // TODO: call API to connect notebook by sending record.id to backend
      }}
    >
      Connect
    </Button>
  );

  private getColumns = (): ColumnProps<INotebookInfo>[] => {
    const columns: ColumnProps<INotebookInfo>[] = [];
    for (const columnKey of Object.keys(defaultColumnSettings)) {
      if (!defaultColumnSettings[columnKey].editable) {
        columns.push(defaultColumnSettings[columnKey]);
      } else {
        columns.push({
          ...defaultColumnSettings[columnKey],
          render: (value: any, record: INotebookInfo) => this.getRenderForConnectButton(value, record),
        });
      }
    }
    return columns;
  };

  public render(): JSX.Element {
    return (
      <>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={this.onClickPress} />
        <Table
          columns={this.getColumns()}
          dataSource={this.props.notebooks}
          pagination={false}
          tableLayout="auto"
          onRow={(record) => ({
            onClick: () => this.onRowClicked(record),
          })}
          rowClassName={this.props.notebooks?.length !== 0 ? styles.tableRows : ''}
        />
      </>
    );
  }
}

function mapStateToProps(state: IState, ownProps: INotebookListProps): INotebookListProps {
  return { ...ownProps, notebooks: state.notebook.notebooks };
}

export default connect(mapStateToProps)(NotebookList);
