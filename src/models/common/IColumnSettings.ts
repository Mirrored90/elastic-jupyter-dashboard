import { ColumnProps } from 'antd/es/table';

export interface IColumnSettings<T> {
  key: string;
  title: string;
  dataIndex: string;
  width: number;
  editable: boolean;
  sorter?: ColumnProps<T>['sorter'];
  onCell?: ColumnProps<T>['onCell'];

  // tslint:disable-next-line:no-any
  render?: ColumnProps<T>['render'];
}
