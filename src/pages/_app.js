import {wrapper} from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxContext } from "react-redux";
import { ConfigProvider } from 'antd';

import 'antd/dist/antd.variable.min.css';
import "../styles/index.scss";

ConfigProvider.config({
  theme: {
    primaryColor: '#7aa93c',
  },
});

const NoopLayout = ({children}) => <>{children}</>;

function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : NoopLayout;

  return <ReactReduxContext.Consumer>
    {({store}) => (
      <PersistGate persistor={store.__PERSISTOR} loading={<div>Loading</div>}>
        <ConfigProvider>
          <Layout>
              <Component {...pageProps}/>
          </Layout>
        </ConfigProvider>
      </PersistGate>
    )}
  
  </ReactReduxContext.Consumer>;
}

export default wrapper.withRedux(App);
