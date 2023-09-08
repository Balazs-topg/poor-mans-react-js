const reactContentNode = document.querySelector("reactContent");
function createElement(tag, props, ...children) {
    if (typeof tag === "function") {
        return tag(props);
    }
    let element = { tag, props: Object.assign(Object.assign({}, props), { children }) };
    return element;
}
function render(reactElementOrStringOrNumber, container) {
    if (typeof reactElementOrStringOrNumber === "string" ||
        typeof reactElementOrStringOrNumber === "number") {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
        return;
    }
    const realDomElement = document.createElement(reactElementOrStringOrNumber.tag);
    if (reactElementOrStringOrNumber.props) {
        Object.keys(reactElementOrStringOrNumber.props)
            .filter((props) => props !== "children")
            .forEach((propKey) => {
            console.log(propKey);
            const propValue = reactElementOrStringOrNumber.props[propKey];
            realDomElement.setAttribute(propKey, propValue);
        });
    }
    if (reactElementOrStringOrNumber.props.children) {
        reactElementOrStringOrNumber.props.children.forEach((child) => {
            render(child, realDomElement);
        });
    }
    container.appendChild(realDomElement);
}
function TestingJSX() {
    return (createElement("div", { class: "bruh", bruh: "yeet", testing: "yeet" },
        createElement("h1", null, "testing"),
        createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sunt, et odit magnam amet, qui quidem aut reiciendis sapiente mollitia molestiae illum sint vitae, tempora veritatis rem. Quo, debitis voluptas.")));
}
//console.log(<TestingJSX />);
render(createElement(TestingJSX, null), document.querySelector("reactContent"));
