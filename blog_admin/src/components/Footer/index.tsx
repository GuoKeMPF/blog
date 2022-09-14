import { DefaultFooter } from '@ant-design/pro-layout';
import beian from '@/assets/images/beian.png';
import { Fragment } from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '小巷阴雨夜微凉，孤舟江海寄余生';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '主页',
          title: '主页',
          href: 'https://mapanfeng.com',
          blankTarget: true,
        },
        {
          key: '过客的后台管理',
          title: '过客的后台管理',
          href: '/',
          blankTarget: true,
        },
        {
          key: '皖ICP备2021018570号',
          title: (
            <Fragment>
              <img src={beian} />
              备案号：皖ICP备2021018570号
            </Fragment>
          ),
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
