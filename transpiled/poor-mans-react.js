function createElement(tag, props = {}, ...children) {
    if (typeof tag === "function") {
        return tag(Object.assign(Object.assign({}, props), { children }));
    }
    let VDOMNode = { tag, props: Object.assign(Object.assign({}, props), { children }) };
    return VDOMNode;
}
function render(VDOMNode, container) {
    //create real dom node
    const realDomElement = document.createElement(VDOMNode.tag);
    //renders strings and numbers
    if (typeof VDOMNode === "string" || typeof VDOMNode === "number") {
        container.appendChild(document.createTextNode(String(VDOMNode)));
        return;
    }
    //renders the nodes' props
    if (VDOMNode.props) {
        Object.keys(VDOMNode.props)
            .filter((props) => props !== "children")
            .forEach((propKey) => {
            const propValue = VDOMNode.props[propKey];
            realDomElement.setAttribute(propKey, propValue);
        });
    }
    //this is where the recursion happens
    //renders the children of the current element
    if (VDOMNode.props.children) {
        VDOMNode.props.children.forEach((child) => {
            //if its an array, then render all of the elements of the array
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
function CounterComponent({}) {
    return (createElement("div", { class: "bruh", test: "yyett" },
        createElement("h1", null, "current count is: null"),
        createElement("button", null, "increment"),
        createElement("button", null, "decrement")));
}
render(createElement(CounterComponent, null,
    "childThing ",
    createElement("p", null, "nested"),
    " ",
    createElement("input", { type: "text", name: "", id: "" })), document.querySelector("reactContent"));
