import format from 'string-format';
import { INotebookResponses } from '../models/notebookModels/INotebookResponses';
import { INotebookInfo } from '../models/notebookModels/INotebookInfo';

export default class DataProvider {
  private absoluteUrl: string;

  private static readonly DELETE_NOTEBOOK_END_POINT: string = '/notebooks?name={0}&namespace={1}';

  private static readonly GET_NOTEBOOK_END_POINT: string = '/notebooks';

  private static readonly CREATE_NOTEBOOK_END_POINT: string = '/notebooks/create';

  public constructor() {
    this.absoluteUrl = 'http://0.0.0.0:9090';
  }

  public deleteNotebook(name: string, namespace: string): Promise<void> {
    const url = format(`${this.absoluteUrl}${DataProvider.DELETE_NOTEBOOK_END_POINT}`, name, namespace);

    return fetch(url, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('response not ok');
        } else {
          // eslint-disable-next-line no-useless-return
          return;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public getNotebooks(): Promise<INotebookInfo[]> {
    return fetch(`${this.absoluteUrl}${DataProvider.GET_NOTEBOOK_END_POINT}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: INotebookResponses) => {
        const notebooks: INotebookInfo[] = DataProvider.parseNotebookResponses(data);
        return notebooks;
      })
      .catch((error) => {
        throw error;
      });
  }

  public createNotebook(settings: INotebookInfo): Promise<void> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notebook: settings }),
    };

    return fetch(`${this.absoluteUrl}${DataProvider.CREATE_NOTEBOOK_END_POINT}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('response not ok');
        } else {
          // eslint-disable-next-line no-useless-return
          return;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  private static parseNotebookResponses(notebooks: INotebookResponses): INotebookInfo[] {
    const res: INotebookInfo[] = [];
    for (const notebook of notebooks?.data) {
      res.push({
        name: notebook.name,
        podName: notebook.podName,
        namespace: notebook.namespace,
        status: notebook.status,
        createdOn: notebook.createdOn,
        label: notebook.label,
        node: notebook.node,
        gatewayName: notebook.gatewayName,
        gatewayNamespace: notebook.gatewayNamespace,
      });
    }
    return res;
  }
}
