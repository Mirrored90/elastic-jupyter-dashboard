import * as React from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { INotebookInfo } from '../../models/notebookModles/INotebookInfo';
import { defaultColumnSettings } from '../../models/notebookModles/columns/ColumnSettings';
import styles from './NotebookList.module.scss';

const data: INotebookInfo[] = [
  {
    id: 'guid1',
    notebookName: 'John Brown',
    notebookNamespace: 'default',
    status: 'Running',
    gatewayName: '',
    createdOn: '3/27/2021',
  },
  {
    id: 'guid2',
    notebookName: 'John Brown',
    notebookNamespace: 'default',
    status: 'Running',
    gatewayName: 'my gateway1',
    createdOn: '5/17/2021',
  },
  {
    id: 'guid3',
    notebookName: 'John Brown',
    notebookNamespace: 'default',
    status: 'Pending',
    createdOn: '1/30/2021',
  },
];

export interface INotebookListProps {}

export interface INotebookListState {
  rowId: string;
  isDrawerOpen: boolean;
}

export default class NotebookList extends React.Component<INotebookListProps, INotebookListState> {
  public constructor(props: INotebookListProps) {
    super(props);
    this.state = {
      rowId: '',
      isDrawerOpen: false,
    };
  }

  private onConnectClicked = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.stopPropagation();
    console.log('--- click connect');
  };

  private onRowClicked = (record: INotebookInfo): void => {
    this.setState(
      {
        rowId: record.id,
        isDrawerOpen: true,
      },
      () => {
        console.log('--- click id', ' ', this.state.rowId);
        console.log('--- isDrawerOpen', ' ', this.state.isDrawerOpen);
      },
    );
  };

  private getRenderForConnectButton = (): JSX.Element => <Button onClick={this.onConnectClicked}>Connect</Button>;

  private getColumns = (): ColumnProps<INotebookInfo>[] => {
    const columns: ColumnProps<INotebookInfo>[] = [];
    for (const columnKey of Object.keys(defaultColumnSettings)) {
      if (!defaultColumnSettings[columnKey].editable) {
        columns.push(defaultColumnSettings[columnKey]);
      } else {
        columns.push({
          ...defaultColumnSettings[columnKey],
          render: () => this.getRenderForConnectButton(),
        });
      }
    }
    return columns;
  };

  public render(): JSX.Element {
    return (
      <>
        <Table
          className={styles.table}
          columns={this.getColumns()}
          dataSource={data}
          pagination={false}
          tableLayout="auto"
          onRow={(record) => ({
            onClick: () => this.onRowClicked(record),
          })}
        />
      </>
    );
  }
}
