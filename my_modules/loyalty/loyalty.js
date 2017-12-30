const users = require('./users.json').users;

const interrogator = (usersToFilter = users) => {
    return {
        withPointsOver(points) {
            return interrogator(usersToFilter.filter(u => u.points > points));
        },
        withGenderOf(gender) {
            return interrogator(matchingUsers.filter(u => u.gender === gender));
        },
        youngerThan(age) {
            return interrogator(usersToFilter.filter(u => u.age < age));
        },
        withStoreOf(store) {
            return interrogator(usersToFilter.filter(u => u.domestic_store === store));
        },
        execute() {
            return usersToFilter;
        }
    };
};

module.exports = interrogator;