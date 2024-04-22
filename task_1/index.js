import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeData(encodedData, translations) {
    return encodedData.map(obj => {
        const decodedObj = {};

        for (let key in obj) {
            if (key !== 'groupId' && key.endsWith('Id')) {
                decodedObj[key] = translations[obj[key]] ?? obj[key]
                continue
            }
            decodedObj[key] = obj[key]
        }

        return decodedObj;
    })
}

function findUniqueIds(encodedData) {
    const uniqueIds = {};

    encodedData.forEach(obj => {
        for (let key in obj) {
            if (obj[key] !== null && key !== 'groupId' && key.endsWith('Id')) {
                uniqueIds[obj[key]] = !uniqueIds.hasOwnProperty(obj[key]);
            }
        }
    });

    for (let key in uniqueIds) {
        if (!uniqueIds[key]) delete uniqueIds[key]
    }

    return Object.keys(uniqueIds);
}

const decoded = decodeData(encoded, translations)
const uniqueIds = findUniqueIds(encoded)
console.log(decoded)
console.log(uniqueIds)
