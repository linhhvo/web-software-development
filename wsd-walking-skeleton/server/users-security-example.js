import { hash, verify } from "scrypt";

const hashedPassword = hash("saippuakivikauppias");
console.log(hashedPassword);


const isCorrectPassword = (password) => {
  return verify(password, hashedPassword);
};