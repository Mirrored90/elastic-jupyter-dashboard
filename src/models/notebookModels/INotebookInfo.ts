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

// Name             string   `json:"name"`
// 	Namespace        string   `json:"namespace"`
// 	PodName          string   `json:"podName"`
// 	NodeName         string   `json:"node"`
// 	Label            []string `json:"label"`
// 	CreatedOn        string   `json:"createdOn"`
// 	Status           string   `json:"status"`
// 	GatewayName      string   `json:"gatewayName"`
// 	GatewayNamespace string   `json:"gatewayNamespace"`
// 	ContainerName    string   `json:"containerName"`
