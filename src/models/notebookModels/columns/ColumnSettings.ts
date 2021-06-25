import { IColumnSettings } from '../../common/IColumnSettings';
import { INotebookInfo } from '../INotebookInfo';

export enum ColumnKeys {
  NAME = 'NOTEBOOK_NAME',
  NAMESPACE = 'NOTEBOOK_NAMESPACE',
  CREATED_ON = 'NOTEBOOK_CREATED_ON',
  STATUS = 'NOTEBOOK_STATUS',
  GATEWAY_NAME = 'GATEWAY_NAME',
  ACTION = 'NOTEBOOK_ACTION',
}

export const defaultColumnSettings: { [key: string]: IColumnSettings<INotebookInfo> } = {
  [ColumnKeys.NAME]: {
    key: ColumnKeys.NAME,
    title: 'Name',
    dataIndex: 'name',
    editable: false,
    width: 200,
  },
  [ColumnKeys.NAMESPACE]: {
    key: ColumnKeys.NAMESPACE,
    title: 'Namespace',
    dataIndex: 'namespace',
    editable: false,
    width: 50,
  },
  [ColumnKeys.STATUS]: {
    key: ColumnKeys.STATUS,
    title: 'Status',
    dataIndex: 'status',
    editable: false,
    width: 50,
  },
  [ColumnKeys.GATEWAY_NAME]: {
    key: ColumnKeys.GATEWAY_NAME,
    title: 'Gateway name',
    dataIndex: 'gatewayName',
    editable: false,
    width: 200,
    render: (_value, record): string => (record.gatewayName ? record.gatewayName : '-'),
  },
  [ColumnKeys.CREATED_ON]: {
    key: ColumnKeys.CREATED_ON,
    title: 'Create on',
    dataIndex: 'createdOn',
    editable: false,
    width: 150,
  },
  [ColumnKeys.ACTION]: {
    key: ColumnKeys.ACTION,
    title: 'Action',
    dataIndex: 'action',
    editable: true,
    width: 50,
  },
};
