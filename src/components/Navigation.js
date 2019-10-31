import React, { Component } from "react";
import { Link } from "gatsby";

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      scrolled: false
    };

  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  render() {
    const { scrolled } = this.state;
    const { menuLinks } = this.props;

    return (
      <nav className={scrolled ? "nav scroll" : "nav"}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <span className="text">Nathaniel Chu</span>
            </Link>
          </div>
          <div className="links">
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link} activeClassName="active">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}
