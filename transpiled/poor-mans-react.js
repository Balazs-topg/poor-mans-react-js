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
            //for "onclick" and such
            if (propKey.startsWith("on")) {
                realDomElement[propKey] = propValue;
            }
            else {
                realDomElement.setAttribute(propKey, propValue);
            }
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
let states = [];
let stateCursor = 0;
function useState(initialValue) {
    const frozenCursor = stateCursor;
    if (states[frozenCursor] === undefined) {
        console.log("undefined g");
        states[frozenCursor] = initialValue;
    }
    const setValue = (newValue) => {
        console.log(newValue);
        states[frozenCursor] = newValue;
        reRender();
    };
    stateCursor++;
    return [states[frozenCursor], setValue];
}
function CounterComponent({}) {
    const [count, setCount] = useState(10);
    const [countB, setCountB] = useState(0);
    return (createElement("div", { class: "bruh", test: "yyett" },
        createElement("h1", null,
            "current count is: ",
            count),
        createElement("button", { onclick: () => {
                setCount(count - 1);
            } }, "decrement"),
        createElement("button", { onclick: () => {
                setCount(count + 1);
            } }, "increment"),
        createElement("h1", null,
            "current count is: ",
            countB),
        createElement("button", { onclick: () => {
                setCountB(countB - 1);
            } }, "decrement"),
        createElement("button", { onclick: () => {
                setCountB(countB + 1);
            } }, "increment")));
}
function reRender() {
    stateCursor = 0;
    document.querySelector("reactContent").innerHTML = "";
    render(createElement(CounterComponent, null), document.querySelector("reactContent"));
}
render(createElement(CounterComponent, null), document.querySelector("reactContent"));
