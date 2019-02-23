'use strict';

const fortune = require('fortune');

const users = [{
  type: 'user',
  id: 'myHash1',
  name: 'alice'
}, {
  type: 'user',
  id: 'myHash2',
  name: 'bob',
}, {
  type: 'user',
  id: 'myHash3',
  name: 'charlie'
}, {
  type: 'user',
  id: 'myHash4',
  name: 'diane',
  following: ['myHash1']
}, {
  type: 'user',
  id: 'myHash5',
  name: 'edward',
  following: ['myHash3']
}, {
  type: 'user',
  id: 'myHash6',
  name: 'franklin',
  following: ['myHash4', 'myHash2', 'myHash5']
}];

const store = fortune({
  user: {
    name: String,
    // Following and followers are inversely related (many-to-many).
    following: [ Array('user'), 'followers' ],
    followers: [ Array('user'), 'following' ],
  }
});

async function _run() {
  for(const user of users) {
    await store.create('user', user);
  }
  // find bob by id
  const f1 = await store.find('user', 'myHash2');
  console.log('Bob by ID', JSON.stringify(f1, null, 2));
  // find alice by id
  const f2 = await store.find('user', 'myHash1');
  console.log('Alice by ID', JSON.stringify(f2, null, 2));
  // bob by name
  const f3 = await store.find('user', null, {match: {name: 'bob'}});
  console.log('Bob by Name', JSON.stringify(f3, null, 2));
  // franklin by name
  const f4 = await store.find('user', null, {match: {name: 'franklin'}});
  console.log('Franklin by Name', JSON.stringify(f4, null, 2));
  // find edward by name
  const f5 = await store.find('user', null, {match: {name: 'edward'}});
  console.log('Edward by Name', JSON.stringify(f5, null, 2));
  // find edward and alice by name
  const f6 = await store.find(
    'user', null, {match: {name: ['alice', 'edward']}});
  console.log('Edward and Alice by Name', JSON.stringify(f6, null, 2));
}

_run();
