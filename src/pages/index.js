import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container">
          <Helmet title={`Home | ${config.siteTitle}`} />
            <div className="home">
              <h1>
                Home page
              </h1>
            </div>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
