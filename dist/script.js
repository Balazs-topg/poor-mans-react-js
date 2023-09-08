console.log("typescript is workingg");

const VDOM ={}
const React = {
    createElement: (tag, atributes, text) => { console.log(tag); }
};
function testingJSX() {
    return (React.createElement("div", { className: "bruh" },
        "testing",
        React.createElement("p", null, "paragraph"),
        "testing bruh"));
}
testingJSX();
