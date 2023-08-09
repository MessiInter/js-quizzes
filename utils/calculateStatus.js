import chalk from 'chalk';

function calculateStatus(solved = 0) {
    if (!solved) return chalk.bgRed('Super bad');
    if (solved <= 2) return chalk.red('Bad');
    if (solved === 3 || solved === 4) return chalk.green('Good');
    if (solved > 4) return chalk.bgGreen('Super good');
}

export default calculateStatus;