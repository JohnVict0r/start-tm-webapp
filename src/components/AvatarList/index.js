import React from 'react';
import { Tooltip, Avatar } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

const avatarSizeToClassName = size =>
  classNames(styles.avatarItem, {
    [styles.avatarItemLarge]: size === 'large',
    [styles.avatarItemSmall]: size === 'small',
    [styles.avatarItemMini]: size === 'mini',
  });

const AvatarList = ({ children, size, overlap = 8, maxLength, excessItemsStyle, ...other }) => {
  const numOfChildren = React.Children.count(children);
  const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;

  const childrenWithProps = React.Children.toArray(children)
    .slice(0, numToShow)
    .map(child =>
      React.cloneElement(child, {
        size,
        overlap,
      })
    );

  if (numToShow < numOfChildren) {
    const cls = avatarSizeToClassName(size);

    childrenWithProps.push(
      <li key="exceed" className={cls} style={{ marginLeft: -overlap }}>
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>
    );
  }

  return (
    <div {...other} className={styles.avatarList}>
      <ul style={{ marginLeft: overlap }}> {childrenWithProps} </ul>
    </div>
  );
};

const Item = ({ src, size, overlap, tips, style, onClick = () => {} }) => {
  const cls = avatarSizeToClassName(size);

  return (
    <li className={cls} style={{ marginLeft: -overlap, ...style }} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

AvatarList.Item = Item;

export default AvatarList;
