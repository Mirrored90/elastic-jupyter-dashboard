import * as React from 'react';
import { Drawer } from 'antd';

export default function NotebookDetailDrawer(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  return (
    <>
      <Drawer title="Basic Drawer" closable onClose={() => setIsOpen(false)} visible={isOpen} width={750}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
