import React from "react"
import { render } from "@testing-library/react"

import Footer from "../Footer"

describe("Footer", () => {
  it("Links correctly", () => {
    const footerComponent = render(<Footer />);
    const github = footerComponent.getByTitle("Open-source on GitHub")
    const netlify = footerComponent.getByTitle("Hosted by Netlify")
    const gatsby = footerComponent.getByTitle("Built with Gatsby")

    expect(github.href).toBe("https://github.com/nathanielchu")
    expect(netlify.href).toBe("https://www.netlify.com/")
    expect(gatsby.href).toBe("https://www.gatsbyjs.org/")
  })
})