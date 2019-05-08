import React from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'antd';
import styles from './FavoriteButton.less';

const FavoriteButton = ({ favorited, loading, className, onClick, ...restProps }) => (
  <Button onClick={onClick}>
    {loading ? (
      <Icon type="loading" />
    ) : (
      <Icon
        className={classNames(className, styles.star, { [styles.favorited]: favorited })}
        type="star"
        theme="filled"
        {...restProps}
      />
    )}
    {favorited ? 'Desfavoritar' : 'Favoritar'}
  </Button>
);

export default FavoriteButton;
