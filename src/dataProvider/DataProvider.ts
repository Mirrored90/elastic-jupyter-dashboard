import { INotebookResponses } from '../models/notebookModels/INotebookResponses';
import { INotebookInfo } from '../models/notebookModels/INotebookInfo';

export default class DataProvider {
  private absoluteUrl: string;

  public constructor() {
    this.absoluteUrl = 'http://0.0.0.0:9090/';
  }

  public getNotebooks(): Promise<INotebookInfo[] | void> {
    return fetch(`${this.absoluteUrl}${'notebooks'}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: INotebookResponses) => {
        const notebooks: INotebookInfo[] = DataProvider.parseNotebookResponses(data);
        return notebooks;
      })
      .catch((error) => {
        console.log('----error is', error);
      });
  }

  private static parseNotebookResponses(notebooks: INotebookResponses): INotebookInfo[] {
    const res: INotebookInfo[] = [];
    for (const notebook of notebooks?.data) {
      res.push({
        notebookName: notebook.name,
        podName: notebook.podName,
        notebookNamespace: notebook.namespace,
        status: notebook.status,
        createdOn: notebook.createdOn,
        notebookLabels: notebook.label,
        node: notebook.node,
        gatewayName: notebook.gatewayName,
        gatewayNamespace: notebook.gatewayNamespace,
      });
    }
    return res;
  }
}
