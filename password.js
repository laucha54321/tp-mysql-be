import bcrypt from 'bcrypt';

const password = 'password1';

const hash = await bcrypt.hash(password,10)

const isMatch = await bcrypt.compare('password11', hash)

console.log(isMatch)
console.log(password,hash)