import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    contianer: {
      height: '160px',
      overflowY: 'scroll',
    },
    table: {
      padding: '1px',
      'td, tr, th': { border: '1px solid #333', padding: '4px 8px' },
    },
    theader: {
      position: 'sticky',
      top: '0',
      backgroundColor: '#fff',
      border: '1px solid #333',
    },
    tfoot: {
      position: 'sticky',
      bottom: '0',
      backgroundColor: '#fff',
      border: '1px solid #333',
    },
  };
});
export default useStyles;
