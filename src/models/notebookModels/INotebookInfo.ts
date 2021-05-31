import { IContainerInfo } from '../common/IContainerInfo';

export interface INotebookInfo {
  id: string;
  notebookName: string;
  notebookNamespace: string;
  status: string;
  createdOn: string;
  notebookLabels?: string[];
  conditions?: string[];
  node?: string;
  secrets?: string;
  toleration?: string;

  containers?: IContainerInfo[];

  gatewayName?: string;
  gatewayId?: string;
}
