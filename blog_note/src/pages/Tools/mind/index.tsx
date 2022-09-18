import React, { Fragment } from 'react';
import GGEditor, { Mind } from 'gg-editor';
import { Col, Row } from 'antd';
import EditorMinimap from '../../../components/EditorMinimap';
import { MindContextMenu } from '../../../components/EditorContextMenu';
import { MindDetailPanel } from '../../../components/EditorDetailPanel';
import { MindToolbar } from '../../../components/EditorToolbar';
import data from './mock.json';
import styles from './index.less';

GGEditor.setTrackable(false);

const PlotMind = () => (
  <Fragment>
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <MindToolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={20} className={styles.editorContent}>
          <Mind data={data} className={styles.mind} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <MindDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <MindContextMenu />
    </GGEditor>
  </Fragment>
);

export default PlotMind;
