const formatter = require('./formatter');
const chai = require('chai');
const expect = chai.expect;

// when provided with array of users, will it format correctly
describe('Results Formatting', () => {
    it('Formats result of query', () => {
        const results = [{
            "name": "Person A",
            "age": 52,
            "points": 3200,
            "gender": "male",
            "domestic_store": "Rotherham"
        }, {
            "name": "Person B",
            "age": 23,
            "points": 40000,
            "gender": "female",
            "domestic_store": "Marble Arch"
        }];

        const actual = formatter('An important query', results);
        const expected = '\n\nQUERY: An important query \n----------\n\tPerson A \n\t3200 \n--\n\tPerson B \n\t40000 \n--';

        expect(actual).to.be.equal(expected);
    });
});