const PostListing = require("./PostListing")
// @ponicode
describe("getPostList", () => {
    let inst

    beforeEach(() => {
        inst = new PostListing.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getPostList()
        }
    
        expect(callFunction).not.toThrow()
    })
})
