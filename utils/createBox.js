import boxen from 'boxen';

function createBox(message) {
    console.log(`${boxen(message, {
        padding: 1,
        borderColor: 'gray'
    })}\n`);
}

export default createBox;