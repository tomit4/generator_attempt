const fs = require('fs')

const namesArr = ['fifi', 'mochi', 'archie', 'lulu']

const emailsArr = [
    'user_sample@doggo.com',
    'fifi@ismycat.com',
    'mochi@issomeothercat.com',
    'ar_cat@hires.com',
    'totallylegit@pets.com',
]

const responsePrompts = [
    'I am actually a very experienced cat',
    'I am not a person but I need a job',
    'This job posting is awful',
    '30',
    '50',
    '70',
    '80',
    '100',
]

const responseKeyCategories = ['grit', 'openness', 'empath']

const responseKeyPrompts = [
    'what is your name',
    'what is your favorite color',
    'what is your quest',
    'what is the average flight speed of an unladen swallow',
]

const randomNumber = max => {
    return Math.floor(Math.random() * max) < 1
        ? 1
        : Math.floor(Math.random() * max)
}

// n is the amount of users to create
const n = 10

class User {
    constructor(id) {
        this.user_id = id
        this.user_name = namesArr[randomNumber(namesArr, 0)]
        this.user_email = emailsArr[randomNumber(emailsArr, 0)]
        this.is_admin = Math.random() < 0.2
        this.is_poster = Math.random() < 0.9 // If user is poster, generate 2 profiles
    }
}

class Profile {
    constructor(id) {
        this.profile_id = id
        this.user_id
    }
}

class ResponseKey {
    constructor(id) {
        this.response_key_id = id
        this.response_key_category
        this.response_key_prompt
        this.response_key_description = null
    }
}

class Response {
    constructor(id) {
        this.response_id = id
        this.profile_id
        this.response_key_id = 0
        this.val
    }
}

const mock = {
    users: [],
    profiles: [],
    response_keys: [],
    responses: [],
}

for (let i = 0; i < n; i++) {
    const newUser = new User(i + 1)
    mock.users.push(newUser)
    const newProfile = new Profile(i + 1)
    newProfile.user_id = newUser.user_id
    mock.profiles.push(newProfile)
}

for (let i = 0; i < mock.users.length; i++) {
    if (mock.users[i].is_poster) {
        const newProfile = new Profile(i + 1)
        newProfile.user_id = mock.users[i].user_id
        mock.profiles.push(newProfile)
    }
}

console.log(mock)
console.log(mock.users.length)
console.log(mock.profiles.length)

// create a for loop that creates n number of users, n number of profiles, n number of response_ keys, and 12 responses each.
// if the users is_poster value is equal to 1, then generate a second profile for that user

// consider how to generate the mock object, you can just instiate it as below like we did before, but there might be a better way
// of accomplishing this task.

// mock is the final object to be written, a series of users, profiles, response_keys, and responses with arrays as values

const mockData = JSON.stringify(mock, null, 2)
fs.writeFileSync('mock.json', mockData)
