import '../styles/globals.css'
import 'antd/dist/antd.css';

import React from 'react';

import MainLayout from '../components/MainLayout';

function MyApp({ Component, pageProps }) {

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
