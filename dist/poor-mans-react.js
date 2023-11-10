//define where we want to render out app
const entryPoint = document.querySelector("reactEntryPoint");
//createElement logic
function createElement(tag, props = {}, ...children) {
    if (typeof tag === "function") {
        return tag(Object.assign(Object.assign({}, props), { children }));
    }
    let VDOMNode = { tag, props: Object.assign(Object.assign({}, props), { children }) };
    return VDOMNode;
}
//rendering logic
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
function reRender() {
    stateCursor = 0;
    effectsCursor = 0;
    entryPoint.innerHTML = "";
    render(createElement(App, null), entryPoint);
}
//state logic
let states = [];
let stateCursor = 0;
function useState(initialValue) {
    const frozenCursor = stateCursor;
    if (states[frozenCursor] === undefined) {
        states[frozenCursor] = initialValue;
    }
    const setValue = (newValue) => {
        states[frozenCursor] = newValue;
        reRender();
    };
    stateCursor++;
    return [states[frozenCursor], setValue];
}
//useEffect logic
let effects = [];
let effectsCursor = 0;
function useEffect(callback, dependencies) {
    const frozenCursor = effectsCursor;
    // If there's no effect stored at the current position, initialize it
    if (!effects[frozenCursor]) {
        effects[frozenCursor] = {
            dependencies: undefined,
        };
    }
    const hasNoDependencies = !dependencies;
    // Check if the dependencies have changed since the last render
    const dependenciesChanged = effects[frozenCursor].dependencies
        ? // If there were previous dependencies, compare each one to the current dependencies
            !dependencies.every((dep, i) => dep === effects[frozenCursor].dependencies[i])
        : // If there were no previous dependencies, consider them as changed
            true;
    // If there are no dependencies or if they have changed, run the effect callback
    if (hasNoDependencies || dependenciesChanged) {
        callback();
        // Store the current dependencies for comparison in the next render
        effects[frozenCursor].dependencies = dependencies;
    }
    // Move to the next position in the effects array for the next useEffect call
    effectsCursor++;
}
//comonents
function Counter({ initVal, color }) {
    const [counterValue, setCounterValue] = useState(initVal);
    useEffect(() => {
        console.log("Component did mount/update");
    }, []);
    return (createElement("div", { style: `color: ${color}` },
        "current count is: ",
        counterValue,
        createElement("button", { onclick: () => {
                setCounterValue(counterValue + 1);
            } }, "+"),
        createElement("button", { onclick: () => {
                setCounterValue(counterValue - 1);
            } }, "-")));
}
function App({}) {
    return (createElement("div", { class: "bruh", test: "yyett" },
        createElement("h1", null, "Counters"),
        createElement(Counter, { initVal: 3, color: "black" }),
        createElement(Counter, { initVal: 30, color: "green" }),
        createElement(Counter, { initVal: 3, color: "red" }),
        createElement(Counter, { initVal: 3, color: "blue" }),
        createElement(Counter, { initVal: 3, color: "black" }),
        createElement(Counter, { initVal: 3, color: "black" }),
        createElement(Counter, { initVal: 3, color: "black" })));
}
//init
render(createElement(App, null), entryPoint);
