/* eslint "no-console": "off" */

const path = require("path");
const kebabCase = require("lodash.kebabcase");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.js");
  const pagePage = path.resolve("src/templates/page.js");
  const tagPage = path.resolve("src/templates/tag.js");
  const categoryPage = path.resolve("src/templates/category.js");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              sourceName
            }
            frontmatter {
              title
              tags
              category
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  postsEdges.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    if (edge.node.fields.sourceName === "notes") {
      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug
        }
      });
    }

    if (edge.node.fields.sourceName === "pages") {
      createPage({
        path: edge.node.fields.slug,
        component: pagePage,
        context: {
          slug: edge.node.fields.slug
        }
      });
    }
  });

  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagPage,
      context: { tag }
    });
  });

  categorySet.forEach(category => {
    createPage({
      path: `/categories/${kebabCase(category)}/`,
      component: categoryPage,
      context: { category }
    });
  });
};
