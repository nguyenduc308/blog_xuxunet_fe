import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { AdminLayout } from '../../../components/layouts';
import { wrapper } from '../../../store';

const Dashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <h1 style={{'textAlign': 'center'}}>Blog list</h1>
    </>
  );
};

Dashboard.Layout = AdminLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  return {
    props: {}
  };
});

export default Dashboard;
