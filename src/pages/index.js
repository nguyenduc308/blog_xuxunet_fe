import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { DefaultLayout } from '../components/layouts';
import { wrapper } from '../store';

const Index = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <h1 style={{'textAlign': 'center'}}>Wellcome to our platform!</h1>
    </>
  );
};

Index.Layout = DefaultLayout;

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  return {
    props: {}
  };
});

export default Index;
