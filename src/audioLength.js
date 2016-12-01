const foo = () => {
  console.log('hello world');
  clearInterval(myVar);
};

var myVar = setInterval(foo, 1000);
