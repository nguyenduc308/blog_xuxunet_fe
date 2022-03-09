import {wrapper} from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from 'antd';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Head from "next/head";

import 'antd/dist/antd.variable.min.css';
import "../styles/index.scss";
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { getMe } from '../store/auth/actions';
import http from '../libs/http';

ConfigProvider.config({
  theme: {
    // primaryColor: '#7aa93c',
  },
});

const NoopLayout = ({children}) => <>{children}</>;

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : NoopLayout;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [user])

  useEffect(() => {
    const code = router.query.t;
    const campaign = localStorage.getItem('campaign');

    if (code && !campaign) {
      http.get(`/tracking/${code}`)
        .then(() => {
          localStorage.setItem('campaign', JSON.stringify({
            code,
            date: Date.now()
          }))
        });
    }
  }, [router.isReady, router.query])


  return <ReactReduxContext.Consumer>
      {({store}) => (
        <>
          <Head>
            <title>Xuxunet.Com</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta name="description" content="Tạo kế hoạch tiết kiệm, đầu tư tích lũy tài sản, làm giàu, kiến thức đầu tư chứng khoán, tiền điện tử" />
            <meta property="og:title" content={`Kế hoạch làm giàu | ${process.env.SITE_DOMAIN}`} />
            <meta
                property="og:description"
                content="Tạo kế hoạch tiết kiệm, đầu tư tích lũy tài sản, làm giàu, kiến thức đầu tư chứng khoán, tiền điện tử"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:image" content={`${process.env.SITE_URL || ''}/logo.jpg`} />
            <meta property="og:image:secure_url" content={`${process.env.SITE_URL || ''}/logo.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <PersistGate persistor={store.__PERSISTOR} loading={<div>Loading</div>}>
            <ConfigProvider>
              <Layout>
                  <Component {...pageProps}/>
              </Layout>
            </ConfigProvider>
          </PersistGate>
        </>
      )}
    </ReactReduxContext.Consumer>
  ;
}

export default wrapper.withRedux(App);
