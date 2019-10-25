import React, { Component } from "react";
import netlify from '../../content/images/netlify.png'
import gatsby from '../../content/images/gatsby.png'
import github from '../../content/images/github.png'

class Footer extends Component {
  render() {
    const { config } = this.props;
    return (
      <footer className="footer">
        <div>
          <a href="https://github.com/nathanielchu" title="Open-source on GitHub">
            <img
              src={github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-img"
              alt="GitHub"
            />
          </a>
          <a href="https://www.netlify.com/" title="Hosted by Netlify">
            <img
              src={netlify}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-img"
              alt="GitHub"
            />
          </a>
          <a href="https://www.gatsbyjs.org/" title="Built with Gatsby">
            <img
              src={gatsby}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-img"
              alt="GitHub"
            />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
