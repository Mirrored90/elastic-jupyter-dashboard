import * as React from 'react';
import NotebookList from '../../components/NotebookList/NotebookList';
import NotebookDetailDrawer from '../../components/NotebookDetailDrawer/NotebookDetailDrawer';

export default function NotebookOverview(): JSX.Element {
  return (
    <>
      <h1>Notebook overview</h1>
      <NotebookList />
      <NotebookDetailDrawer />
    </>
  );
}
