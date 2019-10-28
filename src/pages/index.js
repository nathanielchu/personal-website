import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link, graphql } from 'gatsby'
import Layout from "../layout";
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from "../../data/SiteConfig";

class Index extends Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <div className="index-container">
          <Helmet title={`${config.siteTitle}`} />
          <SEO />
          <Link to={`/tags/`}><h1>tags</h1></Link>
          <Link to={`/categories/`}><h1>categories</h1></Link>
          <Link to={`/me`}><h1>me</h1></Link>
          <Link to={`/about`}><h1>about</h1></Link>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: {
        fields: {
          sourceName: {
            eq: "notes"
          }
        }
      },
      limit: 2000,
      sort: {
        fields: [fields___date],
        order: DESC
      }
      ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`