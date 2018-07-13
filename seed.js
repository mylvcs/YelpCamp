const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');

const data = [
    {
        name: "Campground-1",
        author: {},
        image: "http://i.imgur.com/K3mPv14.jpg",
        price: '50.05',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        comments: []
    },
    {
        name: "Campground-2",
        author: {},
        image: "http://i.imgur.com/SBEmFpv.jpg",
        price: '100.09',
        description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!",
        comments: []
    },
    {
        name: "Campground-3",
        author: {},
        image: "http://i.imgur.com/emvhOnb.jpg",
        price: '213.7',
        description: "Good!",
        comments: []
    },
    {
        name: "Campground-4",
        author: {},
        image: "http://i.imgur.com/2LSMCmJ.jpg",
        price: '4999.99',
        description: "WoW~XD",
        comments: []
    },
    {
        name: "Campground-5",
        author: {},
        image: "http://i.imgur.com/TVGe0Ef.jpg",
        price: '1.36',
        description: "Cool^^",
        comments: []
    },
];

const ray = new User({username: 'ray'});
const a = new User({username: 'a'});

const comment = new Comment({
    author: {
        id: ray._id,
        username: ray.username
    },
    text: 'This is a good campground.'
});

function seedDB() {
    data[0].comments.push(comment);
    for (let i = 0; i < data.length; i++){
        data[i].author.id = ray._id;
        data[i].author.username = ray.username;
    }
    Promise.all([User.remove(), Campground.remove(), Comment.remove()])
        .then(() => console.log('remove all user, campground and comment'))
        .then(() => {
          
            return Promise.all([Campground.create(data),comment.save()]);
        })
        .then((result) => {
            // console.log(result);
            console.log('Data is finished');
        });
}

module.exports = seedDB;