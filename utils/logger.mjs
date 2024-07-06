import chalk from 'chalk';

function log(status, message) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timestamp = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    switch (status) {
        case 'SUCCESS':
            console.log(`${timestamp} | ${chalk.green(status)}  | ${chalk.green(message)}`);
            break;
        case 'ERROR':
            console.log(`${timestamp} | ${chalk.red(status)}  | ${chalk.red(message)}`);
            break;
        case 'INFO':
            console.log(`${timestamp} | ${chalk.blue(status)}  | ${chalk.blue(message)}`);
            break;
        case 'DEBUG':
            console.log(`${timestamp} | ${chalk.yellow(status)}  | ${chalk.yellow(message)}`);
            break;
        default:
            console.log(`${timestamp} | ${status}  | ${message}`);
            break;
    }
}

export { log };
