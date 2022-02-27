const width = 1200,
  height = 3600,
  cellZh = height / 12,
  cellEn = height / 8,
  fontStyleEn = 'bold 200px italic Georgia, serif',
  fontStyleZh = 'bold 250px STKaiti';
export default {
  width,
  height,
  texts: {
    zh: [
      {
        text: '万',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 2,
      },
      {
        text: '物',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 3,
      },
      {
        text: '皆',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 4,
      },
      {
        text: '虚',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 5,
      },
      {
        text: '万',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 7,
      },
      {
        text: '事',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 8,
      },
      {
        text: '皆',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 9,
      },
      {
        text: '允',
        font: fontStyleZh,
        width: width,
        x: width / 2,
        y: cellZh * 10,
      }
    ],
    en:[
        {
          text: 'Nothing',
          font: fontStyleEn,
          width: width,
          x: width / 2,
          y: cellEn * 1,
        },
        {
          text: 'Is',
          font: fontStyleEn,
          width: width,
          x: width / 2,
          y: cellEn * 2,
        },
        {
          text: 'True',
          font: fontStyleEn,
          width: width,
          x: width / 2,
          y: cellEn * 3,
        },
        
        {
            text: 'Everything',
            font: fontStyleEn,
            width: width,
            x: width / 2,
            y: cellEn * 5,
          },
          {
            text: 'Is',
            font: fontStyleEn,
            width: width,
            x: width / 2,
            y: cellEn * 6,
          },
          {
            text: 'Promised',
            font: fontStyleEn,
            width: width,
            x: width / 2,
            y: cellEn * 7,
          },
    ]
  },
};
