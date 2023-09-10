function createElement(tag, props = {}, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  let VDOMNode = { tag, props: { ...props, children } };
  return VDOMNode;
}

function render(VDOMNode, container) {
  //create real dom nodee
  const realDomElement = document.createElement(VDOMNode.tag);

  //renders strings and numbers
  if (typeof VDOMNode === "string" || typeof VDOMNode === "number") {
    container.appendChild(document.createTextNode(String(VDOMNode)));
    return;
  }

  //renders the elements props
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
      } else {
        render(child, realDomElement);
      }
    });
  }
  container.appendChild(realDomElement);
}

function CounterComponent({}) {
  return (
    <div class="bruh" test="yyett">
      <h1>current count is: null</h1>
      <button>increment</button>
      <button>decrement</button>
    </div>
  );
}

render(
  <CounterComponent>
    childThing <p>nested</p> <input type="text" name="" id="" />
  </CounterComponent>,
  document.querySelector("reactContent")
);
