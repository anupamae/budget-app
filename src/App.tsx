import React from 'react';

import './App.scss';

const App = () => {
  return (
    <React.Fragment>
      <Header />

      <Footer />
    </React.Fragment>
  );
}

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header header__h1'>Budget App</h1>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer footer__p'>&copy; { new Date().getUTCFullYear() } Anupama Ellath</p>
    </footer>
  );
}

export default App;
