import React from 'react';
import { connect } from 'dva';
import { loggedInUserSelector } from '@/selectors/global';
import PageWrapper from '@/components/PageWrapper';

const AccountSettings = ({ currentUser, children }) => {
  const menuData = [
    {
      key: '/basic',
      name: 'Informações básicas',
      icon: 'user',
    },
    {
      key: '/password',
      name: 'Alterar senha',
      icon: 'key',
    },
  ];

  return (
    <PageWrapper
      title={currentUser.name}
      subtitle={currentUser.email}
      menuData={menuData}
      avatar={{ src: currentUser.avatar, alt: currentUser.name }}
    >
      {children}
    </PageWrapper>
  );
};

export default connect(state => ({
  currentUser: loggedInUserSelector(state),
}))(AccountSettings);
