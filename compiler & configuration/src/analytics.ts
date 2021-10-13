console.log("Sending Data ....");
let logged;
const globalVal = 0;

function add(n1: number, n2: number) {
  const sum = n1 + n2;
  if (n1 + n2 < 0) {
    return sum;
  }
  return;
}

function analytics(data: string) {
  console.log(data);
  logged = true;
}

analytics("Data");
