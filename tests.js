const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pw, salt)
    //console.log(hash)
    return hash
}

const comparePassword = async (myPlaintextPassword, hash) => {
    const result = await bcrypt.compare(myPlaintextPassword, hash)
    console.log(result)
}



async function print() {
    let hashed = await hashPassword('monkey')
    comparePassword('monkey', hashed)
}
print()

/* async function getCoordinates () {
const apiKey = 'dd22c32b5de7aac4b24ecb8d57cc5b2d'
const request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Lisbon&limit=1&appid=dd22c32b5de7aac4b24ecb8d57cc5b2d`)
const coordinates = await request.json();
console.log(coordinates[0].lat)
console.log(coordinates[0].lon)
} */


async function getCoordinates() {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Benedita,Portugal.json?access_token=pk.eyJ1IjoiZ29uY2Fsb2JsIiwiYSI6ImNsdWE3bXE2dzBmbXYyam1rODI3enMzc2sifQ.S1f75RYj9FgOc6wWmAvUiQ`)
    const coordinates = await response.json();
    console.log(coordinates.features[0].center)
}

getCoordinates()