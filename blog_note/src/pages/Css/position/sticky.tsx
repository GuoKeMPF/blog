import React from 'react';
import { Divider } from 'antd';
import styles from './sticky.less';

const useCallbackConponent = () => {
  return (
    <div className={styles.contianer}>
      <Divider orientation="left">sticky 定位</Divider>
      <table className={styles.table}>
        <thead className={styles.theader}>
          <tr>
            <th>th1</th>
            <th>th2</th>
            <th>th3</th>
            <th>th4</th>
            <th>th5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>td1-1</td>
            <td>td1-2</td>
            <td>td1-3</td>
            <td>td1-4</td>
            <td>td1-5</td>
          </tr>

          <tr>
            <td>td2-1</td>
            <td>td2-2</td>
            <td>td3-3</td>
            <td>td4-4</td>
            <td>td5-5</td>
          </tr>

          <tr>
            <td>td3-1</td>
            <td>td3-2</td>
            <td>td3-3</td>
            <td>td3-4</td>
            <td>td3-5</td>
          </tr>

          <tr>
            <td>td4-1</td>
            <td>td4-2</td>
            <td>td4-3</td>
            <td>td4-4</td>
            <td>td4-5</td>
          </tr>

          <tr>
            <td>td5-1</td>
            <td>td5-2</td>
            <td>td5-3</td>
            <td>td5-4</td>
            <td>td5-5</td>
          </tr>
        </tbody>

        <tfoot className={styles.tfoot}>
          <tr>
            <td>tf1</td>
            <td>tf2</td>
            <td>tf3</td>
            <td>tf4</td>
            <td>tf5</td>
          </tr>
        </tfoot>
      </table>

      <footer></footer>
    </div>
  );
};

export default useCallbackConponent;
