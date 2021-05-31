import * as React from 'react';
import { Divider, Tag } from 'antd';
import styles from './DetailItem.module.scss';

export interface IDetailItemProps {
  label: string;
  fieldValue?: string[];
  className?: string;
}

export default function DetailItem(props: IDetailItemProps): JSX.Element {
  return (
    <>
      <div className={styles.itemLabel}>{props.label}</div>
      {props.fieldValue && props.fieldValue.length > 1 ? (
        <div className={styles.tagContainer}>
          {props.fieldValue.map((value) => (
            <div key="tag" className={styles.tag}>
              <Tag>{value}</Tag>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.itemFieldValue}>{props.fieldValue ? props.fieldValue[0] : '-'}</div>
      )}
      <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
    </>
  );
}
