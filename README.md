# Do you even TDD? :necktie:
A tutorial written in JS to get people thinking about Test Driven Development, and hopefully answering the all
important question - "do you even TDD?".

## Scenario
You work for a company named "Tietanic" (:necktie:), that sells ties in traditional brick-and-mortar stores. Market insiders have
predicted the company might be approaching turbulent times, and could hit a proverbial iceberg in coming months.

Therefore, the business want to launch a new loyalty scheme in order to better understand their customers, and
incentivize them to frequent the stores more often.

You are part of a software development team that has been assigned with helping to provide access to data pertaining
to an upcoming loyalty scheme.

The data is going to be stored in a database, which will be looked after by a separate team. Latest news indicates
they have not decided on a database yet, so there is no chance of spinning up a local copy for development. However, a
schema has been confirmed, meaning you know what the data will look like.

## Development
The aforementioned schema is as per below:
```json
{
  "users": [{
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
  }]
}
    
```

### Project set-up
Create a folder named `tietanic` or something similar.

Then go into that directory and set-up the project as follows.

    > npm init
    > npm install mocha chai --save-dev

Ensure your `package.json` look similar to the below:
```json
{
  "name": "do-you-even-tdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha my_modules/*/*"
  },
  "keywords": [],
  "author": "Sam Davies",
  "license": "ISC",
  "devDependencies": {
    "chai": "^4.1.2",
    "mocha": "^4.0.1"
  }
}
```

Now create an `index.js` file:

    > touch index.js

### Initial requirements
We have some initial requirements from our boss. He wants to be able to:
* find all customers with over 30000 points
* find all male customers with over 30000 points
* find all females under 25, where their domestic store is "Marble Arch"

Because we know the schema, we can start writing some tests for the above scenarios.

### Some more setup
Create a folder to house our hand-crafted modules:

    > mkdir my_modules
    
Also, create a module to house our code which will satisfy the above requirements:
    
    > cd my_modules
    > mkdir loyalty

Whilst we are there, let's create a test file:

    > touch test.js
    
Using the schema defined earlier, create a test file `users.json`, and place it in the same directory, add the
following to it:
```json
{
  "users": []
}
```

### Writing our first test
So this is it, we have arrived at the point you will write your first test. We have everything we need: a schema and
determination.

Go inside `test.js` and add the following imports and test code:
```js
const chai = require('chai');
const expect = chai.expect;
const users = require('./users.json').users;

describe('Loyalty tests', () => {
    it('Get all customers with over 30,000 points', () => {
        let actual = users.filter(u => u.points > 30000);
        let expected = [users[1], users[2], users[3]];

        expect(actual.length).to.be.equal(3);
        expect(actual).to.deep.equal(expected);
    });
});
```  

Now you might be wondering, how come we are not referencing an external file such as `loyalty.js`? Well, you will see
very soon.

Run `npm test` from your command line and see what happens. You should get a failing test, if so good! We like to see a
failing test first.

Okay, let's add some data to our `users.json`:
```json
{
  "users": [{
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
  }, {
    "name": "Person C",
    "age": 87,
    "points": 32000,
    "gender": "female",
    "domestic_store": "Grantham"
  }, {
    "name": "Person D",
    "age": 34,
    "points": 56000,
    "gender": "male",
    "domestic_store": "Cardiff"
  }, {
    "name": "Person E",
    "age": 23,
    "points": 12000,
    "gender": "female",
    "domestic_store": "Marble Arch"
  }]
}
```

Re-run the test, and you should se it go green!

Awesome, we have satisfied the first requirement.

### Writing some more tests
Now we have written our first test, we can go ahead and add the other ones:

```js
it('Get all customers with over 30,000 points who are male', () => {
    let actual = users.filter(u => u.points > 30000 && u.gender == 'male');
    
    expect(actual.length).to.be.equal(1);
    expect(actual).to.deep.equal([users[3]]);
});
it('Get all female customers under the age of 25, where there domestic store is Marble Arch', () => {
    let actual = users.filter(u => u.gender == 'female' && u.age < 25 && u.domestic_store == 'Marble Arch');
    let expected = [users[1], users[4]];

    expect(actual.length).to.be.equal(2);
    expect(actual).to.deep.equal(expected);
});
```
So you are probably wondering to yourself "does this guy even TDD?". They have added two tests that will most likely
go green, without seeing them fail first. Don't worry, there is some reasoning to this...

By not adding production code initially, we can test our logic within the test, meaning we can test our logic
faster.

Furthermore, we can start to see some common functionality being utilised across tests, such as the logic for
filtering users by points and gender.

### Extracting logic into production code
The time has finally come, let's extract out our functionality into a relevant module, so we actually have some
production code.

Let's create a file named `loyalty.js` in the same directory as our tests.

We can see from the tests that there is some distinct functionality:
* filter by points
* filter by gender
* filter by age
* filter by store

Add the below to that file:
```js
const users = require('./users.json').users;

module.exports = () => {
    let matchingUsers = users;
    return {
        withPointsOver(points) {
            return this;
        },
        withGenderOf(gender) {
            return this;
        },
        youngerThan(age) {
            return this;
        },
        withStoreOf(store) {
            return this;
        },
        execute() {
            return matchingUsers;
        }

    };
};
```

Alter your first test, so it reads as follows:
```js
//...
describe('Loyalty tests', () => {
    const interrogator = require('./loyalty');
    it('Get all customers with over 30,000 points', () => {
        let actual = interrogator
            .withPointsOver(30000)
            .execute();
        let expected = [users[1], users[2], users[3]];

        expect(actual.length).to.be.equal(3);
        expect(actual).to.deep.equal(expected);
    });
    //...
});
```

Run `npm test` and watch it fail. Now go into that file and amend the function `withPointsOver` to have the following
implementation:
```js
withPointsOver(points) {
    matchingUsers = matchingUsers.filter(u => u.points > points);
    return this;
}
```

Run the failing test again, and it should now pass. Repeat for all of the tests, until you have something that resembles
the following in `loyalty.js`:
```js
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
```
And in `test.js`:
```js
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
```
You should now have all tests passing, and any logic extracted out.

### An update from your boss
Your boss has just informed you of two things:
* you won't be calling a DB directly anymore, it will now be in the form of an API.
* the format the users of this application wish to have.

In response to the first point, it is fine, we know the schema, no sweat.   

Your boss has specified they want the following output:

    QUERY: Customers with over 30,000 points
    ----------
    RESULTS:
      {name}
      {points}
    --
      {name}
      {points}
      
In true TDD style, let's write some tests.

### Results formatting
Let's create a folder entitled `results-formatter`, and create two files:
* `test.js`
* `formatter.js`

In `test.js` add the following:
```js
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
```

In `formatter.js`:
```js
module.exports = (title, results) => {
    return "";
};
```

Run `npm test` and watch it fail.

We can fix this, we know the format of how the user wants it formatted, so something like the following should make the
test go green:
```js
module.exports = (title, results) => {
    let formattedResults = results
        .map(r => `\n\t${r.name} \n\t${r.points} \n--`);
    return `\n\nQUERY: ${title} \n----------`
        .concat(formattedResults)
        .toString()
        .replace(/,/g, "");
};
```

You should now have it passing, brilliant!

We wrote a failing test, then added the implementation to get it passing.

### Getting our production code working
So until now, we just have tests, and some unused production code. We can solve that! Because we have tested our code,
we can be fairly confident it will work when we piece it together in `index.js`.

Without further ado, let's crack on and write up of `index.js`:
```js
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
```

After running `node index.js` you should see something like the below in the output:

    QUERY: All females under the age of 25 where store is "Marble Arch" 
    ----------
    	Person B 
    	40000 
    --
    	Person E 
    	12000 
    --
    
    
    QUERY: All with more than 30000 points 
    ----------
    	Person B 
    	40000 
    --
    	Person C 
    	32000 
    --
    	Person D 
    	56000 
    --
    
    
    QUERY: All males with more than 30000 points 
    ----------
    	Person D 
    	56000 
    --

Congratulations, you now have a working program that was developed using TDD. Make note of the different styles of TDD:
* writing logic in tests first
* writing minimal logic in production code

I hope you found this useful :muscle: