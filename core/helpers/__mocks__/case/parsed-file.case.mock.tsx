// Vendors
import React from "react";

const FOO_BAR = "fooBar";

// foo bar, foobar
const FooBar = () => {
  const foo_bar = () => {};

  return (
    <div className="foo-bar" onClick={foo_bar}>
      {FOO_BAR}
    </div>
  );
};

export default FooBar;
