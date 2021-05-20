import * as React from 'react';
import NotebookList from '../../components/NotebookList/NotebookList';
import NotebookDetailDrawer from '../../components/NotebookDetailDrawer/NotebookDetailDrawer';
import NotebookCreationDrawer from '../../components/NotebookCreationDrawer/NotebookCreationDrawer';

export default function NotebookOverview(): JSX.Element {
  return (
    <>
      <NotebookList />
      <NotebookDetailDrawer />
      <NotebookCreationDrawer />
    </>
  );
}
