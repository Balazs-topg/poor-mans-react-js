function createElement(tag, props = {}, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  let element = { tag, props: { ...props, children } };
  return element;
}

function render(reactElementOrStringOrNumber, container) {
  //create real dom node
  const realDomElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );

  //renders strings and numbers
  if (
    typeof reactElementOrStringOrNumber === "string" ||
    typeof reactElementOrStringOrNumber === "number"
  ) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
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
      } else {
        render(child, realDomElement);
      }
    });
  }

  container.appendChild(realDomElement);
}

function TestingJSX({ title, children = "none" }) {
  return (
    <div class="exempel">
      <h1>{title}</h1>
      <h2>{children}</h2>
      <p>Text </p>
    </div>
  );
}

render(
  <TestingJSX title="helloooo">
    childThing <p>nested</p> <input type="text" name="" id="" />
  </TestingJSX>,
  document.querySelector("reactContent")
);
