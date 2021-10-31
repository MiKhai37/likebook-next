import '../styles/globals.css'
import 'antd/dist/antd.css';

import React from 'react';
import useSWR, { SWRConfig } from 'swr'

import MainLayout from '../components/MainLayout';

function MyApp({ Component, pageProps }) {

  return (
    <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SWRConfig>
  )
}

export default MyApp
