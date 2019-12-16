import React from 'react';
import { PageHeader } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'umi-plugin-react/locale';
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from '@/components/PageHeaderWrapper/breadcrumb';
import styles from './index.less';

const HeaderWrapper = ({ home, fluid, className, hiddenBreadcrumb, ...restProps }) => (
  <MenuContext.Consumer>
    {value =>
      !hiddenBreadcrumb && (
        <PageHeader
          {...restProps}
          breadcrumb={conversionBreadcrumbList({
            ...value,
            ...restProps,
            ...(home !== null && {
              home: <FormattedMessage id="menu.home" defaultMessage="Home" />,
            }),
          })}
          className={classNames(styles.header, className, {
            [styles.fluid]: fluid,
          })}
        />
      )
    }
  </MenuContext.Consumer>
);

export default HeaderWrapper;
