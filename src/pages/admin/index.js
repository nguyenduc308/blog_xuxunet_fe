import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { AdminLayout } from '../../components/layouts';
import { wrapper } from '../../store';

const Dashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Admin dashboard</title>
      </Head>
      <h1 style={{'textAlign': 'center'}}>My Dashboard!</h1>
    </>
  );
};

Dashboard.Layout = AdminLayout;

export const getServerSideProps = wrapper.getServerSideProps(({ store, res, req }) => {
  // const token = checkServerSideCookie(req, store);

  // if (token) {
  //   return serverSideRedirect(res, '/');
  // }
});


export default Dashboard;
