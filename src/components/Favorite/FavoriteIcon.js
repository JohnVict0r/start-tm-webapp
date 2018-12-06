import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './FavoriteIcon.less';

const FavoriteIcon = ({ favorited, className, ...restProps }) => (
  <Icon
    className={classNames(className, styles.star, { [styles.favorited]: favorited })}
    type="star"
    theme="filled"
    {...restProps}
  />
);

export default FavoriteIcon;
