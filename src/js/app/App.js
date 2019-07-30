import React from 'react';
import Header from './header/HeaderContainer';
import Footer from './footer/Footer';

const App = () =>
  <main className="d-flex flex-column" role="main">
    <Header/>
    <div className="flex-auto"></div>
    <Footer/>
  </main>

export default App;
