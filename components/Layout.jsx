import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import TopBanner from './TopBanner';

const Layout = ({ children, topBannerData }) => {
  return (
    <div className="layout">
      <Head>
        <link rel="icon" href="/favicon.jpg" />
        <title>MENTALITA</title>
      </Head>
      <header>
        {topBannerData && <TopBanner text={topBannerData.text} discount={topBannerData.discount} />}
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;