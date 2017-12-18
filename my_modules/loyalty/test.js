const chai = require('chai');
const expect = chai.expect;
const users = require('./users.json').users;

describe('Loyalty tests', () => {
    const interrogator = require('./loyalty');
    it('Get all customers with over 30,000 points', () => {
        let actual = interrogator()
            .withPointsOver(30000)
            .execute();
        let expected = [users[1], users[2], users[3]];

        expect(actual.length).to.be.equal(3);
        expect(actual).to.deep.equal(expected);
    });
    it('Get all customers with over 30,000 points who are male', () => {
        let actual = interrogator()
            .withPointsOver(30000)
            .withGenderOf('male')
            .execute();

        expect(actual.length).to.be.equal(1);
        expect(actual).to.deep.equal([users[3]]);
    });
    it('Get all female customers under the age of 25, where there domestic store is Marble Arch', () => {
        let actual = interrogator()
            .withGenderOf('female')
            .youngerThan(25)
            .withStoreOf('Marble Arch')
            .execute();
        let expected = [users[1], users[4]];

        expect(actual.length).to.be.equal(2);
        expect(actual).to.deep.equal(expected);
    });
});