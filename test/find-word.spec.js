const findWord = require('../src/find-word');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
describe('find words', ()=>{
    it('basic search horizontally', ()=>{
        const word = chance.word();
        const grid = [word];
        const coordinates = findWord(grid)(word);
        const expectedCoordinates = word.split('').map((_,index)=>`(${index},0)`).join()

        expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
    })
    it('basic search horizontally reversed', ()=>{
        const word = chance.word();
        const reversedWord = word.split('').reverse().join();
        const grid = [reversedWord];
        const coordinates = findWord(grid)(word);
        const expectedCoordinates = word.split('').map((_,index)=>`(${index},0)`).reverse().join()

        expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
    })
})