import { IContainerInfo } from '../common/IContainerInfo';

export interface INotebookInfo {
  notebookName: string;
  podName: string;
  notebookNamespace: string;
  status: string;
  createdOn: string;
  notebookLabels?: string[];
  conditions?: string[];
  node?: string;

  containers?: IContainerInfo[];

  gatewayName: string;
  gatewayNamespace: string;
}
