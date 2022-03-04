import Header from './header';
import Footer from './footer';

function DefaultLayout({ children }) {
  return (
    <div className='wrapper'>
        <Header></Header>
            <main>
              <div>
                {children}
              </div>
            </main>
        <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
