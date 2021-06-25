import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { PlusOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import { IState } from '../../states/IState';
import ActionType from '../../redux/actions/ActionTypes';
import { INotebookInfo } from '../../models/notebookModels/INotebookInfo';
import DataProvider from '../../dataProvider/DataProvider';
import { defaultColumnSettings } from '../../models/notebookModels/columns/ColumnSettings';
import styles from './NotebookList.module.scss';

export interface INotebookListProps {
  notebooks?: INotebookInfo[];
  dispatch?: Dispatch;
}

export interface INotebookListState {}

class NotebookList extends React.Component<INotebookListProps, INotebookListState> {
  private dataProvider: DataProvider;

  public constructor(props: INotebookListProps) {
    super(props);
    this.dataProvider = new DataProvider();
    this.state = {};
  }

  componentDidMount() {
    this.refreshList();
  }

  private refreshList = async (): Promise<void> => {
    try {
      const responses: INotebookInfo[] = await this.dataProvider.getNotebooks();
      this.props.dispatch?.({
        type: ActionType.UPDATE_NOTEBOOK_TABLE,
        payload: { notebooks: responses },
      });
    } catch (error) {
      console.log('---error:', error);
    }
  };

  private refreshListLocally = (value: string): void => {
    const updatedNotebooks: INotebookInfo[] | undefined = this.props.notebooks?.filter(
      (notebook) => notebook.podName !== value,
    );
    if (updatedNotebooks) {
      this.props.dispatch?.({
        type: ActionType.UPDATE_NOTEBOOK_TABLE,
        payload: { notebooks: updatedNotebooks },
      });
    }
  };

  private onClickPress = (): void => {
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
  };

  private getRenderActionColumn = (value: any, record: INotebookInfo): JSX.Element => (
    <>
      <Button
        icon={<LinkOutlined />}
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          e.stopPropagation();
          console.log('----click connect');
          // TODO: call API to connect notebook by sending name and namespace to backend
        }}
      >
        Connect
      </Button>
      <Button
        className={styles.deleteButton}
        icon={<DeleteOutlined />}
        onClick={async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          e.stopPropagation();
          try {
            await this.dataProvider.deleteNotebook(record.name, record.namespace);
            if (record.podName) {
              this.refreshListLocally(record.podName);
            }
          } catch (error) {
            console.log('error:', error);
          }
        }}
      >
        Delete
      </Button>
    </>
  );

  private getColumns = (): ColumnProps<INotebookInfo>[] => {
    const columns: ColumnProps<INotebookInfo>[] = [];
    for (const columnKey of Object.keys(defaultColumnSettings)) {
      if (!defaultColumnSettings[columnKey].editable) {
        columns.push(defaultColumnSettings[columnKey]);
      } else {
        columns.push({
          ...defaultColumnSettings[columnKey],
          render: (value: any, record: INotebookInfo) => this.getRenderActionColumn(value, record),
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
