import {wrapper} from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from 'antd';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Head } from 'next/head';

import 'antd/dist/antd.variable.min.css';
import "../styles/index.scss";
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { getMe } from '../store/auth/actions';

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

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [user])

  return <ReactReduxContext.Consumer>
      {({store}) => (
        <PersistGate persistor={store.__PERSISTOR} loading={<div>Loading</div>}>
          <ConfigProvider>
            <Layout>
                {/* <Head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head> */}
                <Component {...pageProps}/>
            </Layout>
          </ConfigProvider>
        </PersistGate>
      )}
    </ReactReduxContext.Consumer>
  ;
}

export default wrapper.withRedux(App);
