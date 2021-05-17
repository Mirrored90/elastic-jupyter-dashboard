export interface INotebookInfo {
  id: string;
  notebookName: string;
  notebookNamespace: string;
  status: string;
  createdOn: string;
  gatewayName?: string;
  gatewayId?: string;
}
