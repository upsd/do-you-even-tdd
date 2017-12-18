const formatter = require('./my_modules/results-formatter/formatter');
const interrogator = require('./my_modules/loyalty/loyalty');


// - all females, under the age of 25, where their domestic store is "Marble Arch"
let allFemalesUnder25AndStoreIsMarbleArch = interrogator()
    .withGenderOf('female')
    .withStoreOf('Marble Arch')
    .execute();

// - want to be able to get a list of all customers with more than 30000 points
let moreThan30000Points = interrogator()
    .withPointsOver(30000)
    .execute();

// - want to be able to get a list of all customers who are male with more than 30000 points
let allMalesWithOver30000Points = interrogator()
    .withPointsOver(30000)
    .withGenderOf('male')
    .execute();

console.log(formatter('All females under the age of 25, where store is "Marble Arch"',
    allFemalesUnder25AndStoreIsMarbleArch));
console.log(formatter('All with more than 30000 points', moreThan30000Points));
console.log(formatter('All males with more than 30000 points', allMalesWithOver30000Points));

