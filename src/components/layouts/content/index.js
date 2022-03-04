import Header from '../default/header';
import Footer from '../default/footer';

function ContentLayout({ children }) {
  return (
    <div className='wrapper content-wrapper'>
        <Header></Header>
            <main>
              <div className='content'>
                {children}
              </div>
            </main>
        <Footer></Footer>
    </div>
  );
}

export default ContentLayout;
