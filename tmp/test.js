function test() {
  return new Promise((resolve) => {
    for (let i = 100; i < 1000; i += 100) {
      setTimeout(() => {
        console.log("computing");
      }, 100);
    }

    setTimeout(() => {
      console.log("timeout completed");
      resolve(4);
    }, 1000);
  });
}

async function testA() {
  await test().then(console.log);
  console.log("End of functionA");
}

function testB() {
  testA();
  console.log("End of functionB");
}

testB();
