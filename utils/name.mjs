// name.js
import chalk from 'chalk';

export function printName() {
    console.log(chalk.blue(`
    +==============================================================+                                 
    |              ${chalk.yellow('Bot Transfer ETH to Random Address')}              |
    |                  ${chalk.green('Network: Unit Zero Testnet')}                  |
    |                   ${chalk.magenta('Author: Prastian Hidayat')}                   |
    +==============================================================+
    `));
}