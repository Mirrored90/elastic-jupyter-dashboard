import { IContainerInfo } from '../common/IContainerInfo';

export interface INotebookInfo {
  name: string;
  podName?: string;
  namespace: string;
  status?: string;
  createdOn?: string;
  label?: string[];
  conditions?: string[];
  node?: string;

  containers?: IContainerInfo[];

  gatewayName?: string;
  gatewayNamespace?: string;
}
