// const findWord = require('../src/find-word');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
const {range} = require('ramda');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const MODULE_PATH = '../index';
describe.only('Run word find', ()=>{
        it('Loads puzzles from data folder', ()=>{
            const readFile = sinon.stub();
            proxyquire(MODULE_PATH,{
                fs:{
                    readFile
                }
            });
            expect(readFile.args).to.eql([[]])
        })
})