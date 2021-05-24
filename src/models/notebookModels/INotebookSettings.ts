export interface INotebookSettings {
  notebookName?: string;
  notebookNamespace?: string;

  gatewayName?: string;
  gatewayNamespace?: string;

  containerName?: string;
  image?: string;
  ports?: string;
  command?: string[];
  mounts?: string[];
  environment?: string[];
}
