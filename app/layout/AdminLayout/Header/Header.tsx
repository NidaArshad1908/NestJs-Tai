'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'react-bootstrap';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import HeaderFeaturedNav from '../Header/HeaderFeaturedNav';
import HeaderNotificationNav from '../Header/HeaderNotificationNav';
import HeaderProfileNav from '../Header/HeaderProfileNav';
import { useSession } from 'next-auth/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Layout from '../../Layout';

import React from 'react';
import { useStore } from 'zustand';
import { getSession } from 'next-auth/react';
import HeaderUsername from './HeaderUsername';

type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
};

export default function Header(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props;
  const { data: session } = useSession();
  const { user, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(true);

  return (
    <Layout>
      <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
        <Container fluid className="header-navbar d-flex align-items-center">
          <Button
            variant="link"
            className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
            type="button"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Button
            variant="link"
            className="header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
            type="button"
            onClick={toggleSidebarMd}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <div className="header-nav d-none d-md-flex">
            <HeaderFeaturedNav />
          </div>
          <div className="header-nav ms-auto">
            <HeaderNotificationNav />
          </div>
          <div className="header-nav ms-2">
            <HeaderProfileNav />
          </div>
          <div>
            <HeaderUsername />
          </div>
        </Container>
        <div className="header-divider border-top my-2 mx-sm-n2" />
        <Container fluid>
          <Breadcrumb />
        </Container>
      </header>
    </Layout>
  );
}
