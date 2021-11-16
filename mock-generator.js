const fs = require('fs')

const namesArr = ['fifi', 'mochi', 'archie', 'lulu']

const emailsArr = [
    'user_sample@doggo.com',
    'fifi@ismycat.com',
    'mochi@issomeothercat.com',
    'ar_cat@hires.com',
    'totallylegit@pets.com',
]

const responseValues = [
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
        this.user_name
        this.user_email
        this.is_admin
        this.is_poster
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

// Main for loop that generates the majority of the mock
for (let i = 1; i < n; i++) {
    // Generates our new User first
    const newUser = new User(i + 1)
    newUser.user_name = namesArr[randomNumber(namesArr.length)]
    newUser.user_email = emailsArr[randomNumber(emailsArr.length)]
    newUser.is_admin = Math.random() < 0.2
    newUser.is_poster = Math.random() < 0.7

    // Then generate a new profile
    const newProfile = new Profile(i + 1)
    newProfile.user_id = newUser.user_id

    // Then generate a response key
    const newResponseKey = new ResponseKey(i)
    newResponseKey.response_key_category =
        responseKeyCategories[randomNumber(responseKeyCategories.length)]
    newResponseKey.response_key_prompt =
        responseKeyPrompts[randomNumber(responseKeyPrompts.length)]

    // Then generate a new Response
    const newResponse = new Response(i)
    newResponse.profile_id = newProfile.profile_id
    newResponse.response_key_id = newResponseKey.response_key_id
    newResponse.val = responseValues[randomNumber(responseValues.length)]

    // Finally we push it all to our mock object
    mock.users.push(newUser)
    mock.profiles.push(newProfile)
    mock.response_keys.push(newResponseKey)
    mock.responses.push(newResponse)
}

// for loop that goes over the finished mock.users[] array and checks to see if the is_poster flag is true or false
for (let i = 0; i < mock.users.length; i++) {
    if (mock.users[i].is_poster) {
        // if the user is_poster, create another profile for that user, there is a 70% chance user is poster (see user.is_poster in previous for loop)
        const newProfile = new Profile(i + 1)
        newProfile.user_id = mock.users[i].user_id
        mock.profiles.push(newProfile)
    }
}

const mockData = JSON.stringify(mock, null, 2)
fs.writeFileSync('mock.json', mockData)
