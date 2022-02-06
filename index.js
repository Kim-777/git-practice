// console.log("hi");

const testObj = {
  a: () => {},
  b: "string",
};

function test() {
  return console.log(createSomethingFromRemote());
}

const createSomethingFromRemote = () => {
  return true;
};

test();
