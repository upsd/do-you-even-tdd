const users = require('./users.json').users;

module.exports = () => {
    let matchingUsers = users;
    return {
        withPointsOver(points) {
            matchingUsers = matchingUsers.filter(u => u.points > points);
            return this;
        },
        withGenderOf(gender) {
            matchingUsers = matchingUsers.filter(u => u.gender === gender);
            return this;
        },
        youngerThan(age) {
            matchingUsers = matchingUsers.filter(u => u.age < age);
            return this;
        },
        withStoreOf(store) {
            matchingUsers = matchingUsers.filter(u => u.domestic_store === store);
            return this;
        },
        execute() {
            return matchingUsers;
        }

    };
};