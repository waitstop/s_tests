import {encoded as encodedData, translations as translationsData} from './data.js'

function decodeFields(encoded, translations) {
    const decoded = []
    const uniqueIds = new Set()

    encoded.forEach(item => {
        const decodedItem = {}

        for (const key in item) {
            if (key.endsWith("Id") && !["groupId", "service", "formatSize", "ca"].includes(key)) {
                const value = item[key]
                decodedItem[key] = translations[value] || value
            } else {
                decodedItem[key] = item[key]
            }
            if (key.endsWith("Id")) uniqueIds.add(item[key])
        }

        decoded.push(decodedItem)
    })


    return {decoded, uniqueIds};
}

console.log(decodeFields(encodedData, translationsData))
