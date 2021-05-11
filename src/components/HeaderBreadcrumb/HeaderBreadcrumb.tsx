import * as React from 'react';
import { Breadcrumb } from 'antd';

export interface IHeaderBreadcrumbProps {
  onMenuSelected?: (value: string) => void;
}

export default function HeaderBreadcrumb(props: IHeaderBreadcrumbProps): JSX.Element {
  return (
    <div style={{ background: 'white' }}>
      <Breadcrumb separator="">
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
