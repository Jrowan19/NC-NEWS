const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe.only('formatDates', () => {
  it('when passed an empty array, should return an empty array', () => {
    const input = [];
    const actual = formatDates(input);
    expect(actual).to.be.an('Array');
    expect(actual).to.not.equal(input);
  });
  it('checks that the original array object is not being mutated', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const copyInput = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    formatDates(input);
    expect(copyInput).to.eql(input);
  });
  it('when passed an object containing a timestamp, a new timestamp should be created', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const actual = formatDates(input);
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(1542284514171),
        votes: 100,
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('Should return new timestamps for multiple array objects', () => {
    const input = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171,
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171,
      },
    ];
    const actual = formatDates(input);
    const expected = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: new Date(1416140514171),
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: new Date(1289996514171),
      },
    ];
    expect(actual).to.eql(expected);
  });
});

describe('makeRefObj', () => {
  it('should return an empty object, when passed an empty array', () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it('should return a lookup object when passed a single array of properties', () => {
    const input = [{ description: 'Not dogs', slug: 'cats' }];
    const actual = makeRefObj(input, 'description', 'slug');
    const expected = { 'Not dogs': 'cats' };
    expect(actual).to.eql(expected);
  });
  it('given multiple objects within an array, a lookup object should be returned', () => {
    const input = [
      { name: 'john', age: 35 },
      { name: 'julie', age: 34 },
      { name: 'paul', age: 33 },
    ];
    const actual = makeRefObj(input, 'name', 'age');
    const expected = { john: 35, julie: 34, paul: 33 };
    expect(actual).to.eql(expected);
  });
});

describe('formatComments', () => {
  it('should return a new empty array when passed an empty array, whilst checking for mutation', () => {
    const input = [];
    const actual = formatComments(input);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it('should rename the created_by key to author', () => {
    const input = [
      {
        created_by: 'butter_bridge',
        created_at: 1479818163389,
        belongs_to: 'Living in the shadow of a great man',
      },
    ];
    const lookup = { 'Living in the shadow of a great man': 2 };
    const actual = formatComments(input, lookup);
    expect(actual[0].author).to.equal('butter_bridge');
    expect(actual[0]).to.not.have.keys('created_by');
  });
  it('should rename the belong_to key to article_id', () => {
    const input = [
      {
        created_by: 'butter_bridge',
        created_at: 1479818163389,
        belongs_to: 'Living in the shadow of a great man',
      },
    ];
    const lookup = { 'Living in the shadow of a great man': 2 };
    const actual = formatComments(input, lookup);
    expect(actual[0].article_id).to.equal(2);
    expect(actual[0]).to.not.have.keys('belongs_to');
  });
  it('array must have its timestamp converted into a Javascript date object', () => {
    const input = [
      {
        created_by: 'butter_bridge',
        created_at: 1479818163389,
        belongs_to: 'Living in the shadow of a great man',
      },
    ];
    const lookup = { 'Living in the shadow of a great man': 2 };
    const actual = formatComments(input, lookup);
    expect(actual[0].created_at).to.eql(new Date(1479818163389));
  });
  it('converts the keys for multiple array objects passed', () => {
    const input = [
      {
        body: 'I hate streaming noses',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1385210163389,
      },
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'john',
        created_by: 'paul',
        votes: 0,
        created_at: 1353674163389,
      },
    ];
    const lookup = { 'Living in the shadow of a great man': 1, john: 2 };
    const actual = formatComments(input, lookup);
    const expected = [
      {
        author: 'icellusedkars',
        created_at: new Date(1385210163389),
        article_id: 1,
        body: 'I hate streaming noses',
        votes: 0,
      },
      {
        author: 'paul',
        created_at: new Date(1353674163389),
        article_id: 2,
        body: 'I hate streaming eyes even more',
        votes: 0,
      },
    ];
    expect(actual).to.eql(expected);
  });
});
