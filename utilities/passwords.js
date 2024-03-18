const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pw, salt)
    return hash
}

const comparePassword = async (myPlaintextPassword, hash) => {
    const result = await bcrypt.compare(myPlaintextPassword, hash)
    return result
}



/* async function  print()  {
let hashed = await hashPassword('monkey')
comparePassword('monke', hashed)
}
print() */

module.exports = {hashPassword, comparePassword}