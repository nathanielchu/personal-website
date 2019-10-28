import React from "react";
import Helmet from "react-helmet";
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from "../../data/SiteConfig";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout-container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    );
  }
}
