function createElement(tag, props = {}, ...children) {
    if (typeof tag === "function") {
        return tag(Object.assign(Object.assign({}, props), { children }));
    }
    let element = { tag, props: Object.assign(Object.assign({}, props), { children }) };
    return element;
}
function render(reactElementOrStringOrNumber, container) {
    //create real dom node
    const realDomElement = document.createElement(reactElementOrStringOrNumber.tag);
    //renders strings and numbers
    if (typeof reactElementOrStringOrNumber === "string" ||
        typeof reactElementOrStringOrNumber === "number") {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
        return;
    }
    //renders the elements props
    if (reactElementOrStringOrNumber.props) {
        Object.keys(reactElementOrStringOrNumber.props)
            .filter((props) => props !== "children")
            .forEach((propKey) => {
            const propValue = reactElementOrStringOrNumber.props[propKey];
            realDomElement.setAttribute(propKey, propValue);
        });
    }
    //renders the children of the current element
    if (reactElementOrStringOrNumber.props.children) {
        reactElementOrStringOrNumber.props.children.forEach((child) => {
            if (child instanceof Array) {
                child.forEach((itemInTheArray) => {
                    render(itemInTheArray, realDomElement);
                });
            }
            else {
                render(child, realDomElement);
            }
        });
    }
    container.appendChild(realDomElement);
}
function TestingJSX({ title, children = "none" }) {
    return (createElement("div", { class: "exempel" },
        createElement("h1", null, title),
        createElement("h2", null, children),
        createElement("p", null, "Text ")));
}
render(createElement(TestingJSX, { title: "helloooo" },
    "childThing ",
    createElement("p", null, "nested"),
    " ",
    createElement("input", { type: "text", name: "", id: "" })), document.querySelector("reactContent"));
