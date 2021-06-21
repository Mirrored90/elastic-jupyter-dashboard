// Same as backend
export interface INotebookResponse {
  name: string;
  podName: string;
  namespace: string;
  status: string;
  createdOn: string;
  label: string[];
  node: string;
  gatewayName: string;
  gatewayNamespace: string;
}

export interface INotebookResponses {
  data: INotebookResponse[];
}
