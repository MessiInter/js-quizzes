#!/usr/bin/env node
import { setTimeout as sleep } from 'node:timers/promises';

import * as prompt from '@clack/prompts';
import boxen from 'boxen';
import chalk from 'chalk';

import createBox from './utils/createBox.js';
import calculateStatus from './utils/calculateStatus.js';

let playerName;
let solved = 0;
let status;

async function handleAnswer(isCorrect = true) {
    const spinner = prompt.spinner();

    spinner.start('Checking answer');
    await sleep(1999);

    if (isCorrect) {
        spinner.stop(chalk.bgGreen(`Nice work ${playerName}! That's a legit answer!`));
        solved++;
    } else {
        spinner.stop(chalk.bgRed(`Game over! You lose ${playerName}.`));

        await sleep(1000);
        prompt.outro(chalk.bgRed(`Try again ${playerName}! Better luck next time!\n`));

        await sleep(1000);
        status = calculateStatus(solved);
        createBox(chalk.bgBlue(chalk.white(`${solved}/5 questions solved.`)));

        await sleep(1000)
        createBox(chalk.white(status));

        await sleep(1000);
        throw `${chalk.bgRed('EINCORRECT')} Incorrect answer.\n`;
    }
}

console.clear();
await sleep(1000);

prompt.intro(`${chalk.bgYellow(chalk.black(' Welcome to JavaScript Quizzes! '))}\n`);
await sleep(1000);

const turtorial = chalk.white(`
  I'm a process on your device.
  If you get any question wrong I will be ${chalk.bgRed('killed')}.
  So get all the questions right.
`);
console.log(boxen(turtorial, {
    title: chalk.bgBlue(chalk.white(' HOW TO PLAY ')),
    titleAlignment: 'left',
    padding: 1,
    borderColor: 'gray'
}));
await sleep(2000);

await prompt.group({
    name: async () => await prompt.text({
        message: "What's your name?",
        placeholder: 'Player',
        validate: (name) => {
            playerName = !name ? 'Player' : name;
            if (playerName.length < 2) return 'Name needs to be two or more chracters!';
        }
    }),

    question1: async () => {
        const answer = await prompt.select({
            message: 'What year did JavaScript first appear?',
            initialValue: 1955,
            options: [
                {
                    value: 1955,
                    label: 1955
                },

                {
                    value: 1995,
                    label: 1995, // correct answer.
                },

                {
                    value: 1952,
                    label: 1952
                },

                {
                    value: 1992,
                    label: 1992
                }
            ]
        });

        await handleAnswer(answer === 1995);
    },

    question2: async () => {
        const answer = await prompt.multiselect({
            message: 'JavaScript is a __________ language with a ____________ event loop.',
            options: [
                {
                    value: 'low-level',
                    label: 'low-level'
                },

                {
                    value: 'high-level',
                    label: 'high-level' // correct answer.
                },

                {
                    value: 'non-blocking',
                    label: 'non-blocking' // correct answer.
                },

                {
                    value: 'blocking',
                    label: 'blocking'
                }
            ]
        });

        await handleAnswer(answer.length === 2 && answer.includes('high-level') && answer.includes('non-blocking'));
    },

    question3: async () => {
        const answer = await prompt.multiselect({
            message: "What's keywords that uses to declare a variable that can be reassign in JavaScript?",
            options: [
                {
                    value: 'const',
                    label: 'const'
                },

                {
                    value: 'let',
                    label: 'let' // correct answer.
                },

                {
                    value: 'var',
                    label: 'var' // correct answer.
                }
            ]
        });

        await handleAnswer(answer.length === 2 && answer.includes('let') && answer.includes('var'));
    },

    question4: async () => {
        const answer = await prompt.confirm({
            message: 'Is JavaScript case-sensitive?',
        }); // yes = correct answer.

        await handleAnswer(answer);
    },

    question5: async () => {
        const answer = await prompt.select({
            message: "What's type of NaN (not a number) in JavaScript?",
            options: [
                {
                    value: 'boolean',
                    label: 'boolean'
                },

                {
                    value: 'string',
                    label: 'string'
                },

                {
                    value: 'number',
                    label: 'number'
                },

                {
                    value: 'object',
                    label: 'object'
                }
            ]
        });

        await handleAnswer(answer === 'number');
    }
}).catch(err => {
    throw new Error(err);
});

await sleep(1000);
prompt.outro(chalk.bgGreen(`Congrats ${playerName}! You're a winner!`));

await sleep(1000);
status = calculateStatus(solved);
createBox(chalk.bgBlue(chalk.white(`${solved}/5 questions solved!`)));

await sleep(1000);
createBox(chalk.white(status));

await sleep(1000);