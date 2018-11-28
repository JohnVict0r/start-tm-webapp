import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'facebook',
          title: <Icon type="facebook" />,
          href: 'https://www.facebook.com/LAIS.HUOL/',
          blankTarget: true,
        },
        {
          key: 'youtube',
          title: <Icon type="youtube" />,
          href: 'https://www.youtube.com/channel/UCZnAdBsMJq3YuepLjc5N7ZA',
          blankTarget: true,
        },
        {
          key: 'instagram',
          title: <Icon type="instagram" />,
          href: 'https://www.instagram.com/laishuol/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          <a href="http://lais.huol.ufrn.br/" target="_blank" rel="noopener noreferrer">
            Copyright <Icon type="copyright" /> 2018 LAIS
          </a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
