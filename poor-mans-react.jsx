function createElement(tag, props = {}, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  let VDOMNode = { tag, props: { ...props, children } };
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
        } else {
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
      } else {
        render(child, realDomElement);
      }
    });
  }
  container.appendChild(realDomElement);
}

let stateValue;

function useState(initialValue) {
  if (stateValue === undefined) {
    stateValue = initialValue;
  }

  const setValue = (newValue) => {
    stateValue = newValue;
    console.log("newValue", newValue);
  };

  return [stateValue, setValue];
}

function CounterComponent({}) {
  const [count, setCount] = useState(10);
  console.log(count);
  return (
    <div class="bruh" test="yyett">
      <h1>current count is: {count}</h1>
      <button
        onclick={() => {
          setCount(count + 1);
        }}
      >
        increment
      </button>
      <button
        onclick={() => {
          setCount(count - 1);
        }}
      >
        decrement
      </button>
    </div>
  );
}

render(
  <CounterComponent></CounterComponent>,
  document.querySelector("reactContent")
);
