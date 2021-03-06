const findWord = require('../src/find-word');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
const {range} = require('ramda');
const noPalindrome = (word) => word === word.split('').reverse().join('') ? noPalindrome(word+chance.word()) : word;
describe('find a word', ()=>{
    range(0,1).forEach(()=>{
        it('basic search horizontally', ()=>{
            const word = chance.word();
            const grid = [word];
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},0)`).join(',')
    
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('basic search horizontally reversed', ()=>{
            const word = noPalindrome(chance.word());
            const reversedWord = word.split('').reverse().join('');
            const grid = [reversedWord];
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},0)`).reverse().join(',');
    
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('basic search vertically', ()=>{
            const word = chance.word();
            const grid = word.split('');
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(0,${index})`).join(',');
    
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('basic search vertically reversed', ()=>{
            const word = noPalindrome(chance.word());
            const grid = word.split('').reverse();
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(0,${index})`).reverse().join(',');
    
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })

        it('basic search diagonally ascending reversed', ()=>{
            const word = noPalindrome(chance.word({length:8}));
            const grid = word.split('').map((character, yIndex)=>range(0, word.length).map((_,xIndex)=>((xIndex+yIndex)===word.length-1)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${word.length-1-index})`).reverse().join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('offset basic search diagonally ascending reversed', ()=>{
            const word = noPalindrome(chance.word({length:8}));
            const grid = [...word.split(''),'.']
                .map((character, yIndex)=>range(0, word.length+1)
                .map((_,xIndex)=>((xIndex+yIndex)===word.length-1)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${word.length-1-index})`).reverse().join(',');
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('opposite offset basic search diagonally ascending reversed', ()=>{
            const word = noPalindrome(chance.word({length:8}));
            const grid = ['.',...word.split('')]
                .map((character, yIndex)=>range(0, word.length+1)
                .map((_,xIndex)=>((xIndex+yIndex)===word.length+1)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index+1},${word.length-index})`).reverse().join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('basic search diagonally descending', ()=>{
            const word = chance.word();
            const grid = word.split('').map((character, yIndex)=>range(0, word.length).map((_,xIndex)=>(xIndex===yIndex)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${index})`).join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('basic search diagonally descending reversed', ()=>{
            const word = noPalindrome(chance.word());
            const grid = word.split('').reverse().map((character, yIndex)=>range(0, word.length).map((_,xIndex)=>(xIndex===yIndex)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${index})`).reverse().join(',');
    
            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('offset search diagonally descending', ()=>{
            const word = chance.word();
            const grid = ['.',...word.split('')].map((character, yIndex)=>range(0, word.length+1).map((_,xIndex)=>(xIndex===yIndex-1)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${index+1})`).join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('more offset search diagonally descending', ()=>{
            const word = chance.word();
            const grid = ['.','.',...word.split('')].map((character, yIndex)=>range(0, word.length+2).map((_,xIndex)=>(xIndex===yIndex-2)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${index+2})`).join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('even more offset search diagonally descending', ()=>{
            const word = chance.word();
            const grid = ['.','.','.',...word.split('')].map((character, yIndex)=>range(0, word.length+3).map((_,xIndex)=>(xIndex===yIndex-3)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index},${index+3})`).join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('offset search diagonally descending reversed', ()=>{
            const word = noPalindrome(chance.word());
            const grid = ['.',...word.split('')].reverse().map((character, yIndex)=>range(0, word.length+1).map((_,xIndex)=>(xIndex-1===yIndex)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index+1},${index})`).reverse().join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
        it('more offset search diagonally descending reversed', ()=>{
            const word = noPalindrome(chance.word());
            const grid = ['.','.',...word.split('')].reverse().map((character, yIndex)=>range(0, word.length+2).map((_,xIndex)=>(xIndex-2===yIndex)?character:`.`).join(''));
            const coordinates = findWord(grid)(word);
            const expectedCoordinates = word.split('').map((_,index)=>`(${index+2},${index})`).reverse().join(',');

            expect(coordinates).to.eql(`${word}: ${expectedCoordinates}`);
        })
    })
})