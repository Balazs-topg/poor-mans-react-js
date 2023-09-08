console.log("typescript is workingg")

const React = {
    createElement: (tag, atributes, ...props) => {console.log(props)}
}

function testingJSX(): any{
    return (
        <div className = "bruh">
            testing
            <p>paragraph</p>
            testing bruh
        </div>)
}
testingJSX()
