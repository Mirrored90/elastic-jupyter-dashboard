import * as React from 'react';
import { Divider, Tag } from 'antd';
import styles from './DetailItem.module.scss';

export interface IDetailItemProps {
  label: string;
  fieldValue?: string;
  fieldValues?: string[];
  className?: string;
}

export default function DetailItem(props: IDetailItemProps): JSX.Element {
  return (
    <>
      <div className={styles.itemLabel}>{props.label}</div>
      {props.fieldValues && (
        <div className={styles.tagContainer}>
          {props.fieldValues.map((value) => (
            <div key="tag" className={styles.tag}>
              <Tag>{value}</Tag>
            </div>
          ))}
        </div>
      )}
      {!props.fieldValues && <div className={styles.itemFieldValue}>{props.fieldValue ? props.fieldValue : '-'}</div>}
      <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
    </>
  );
}
