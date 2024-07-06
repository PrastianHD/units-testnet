require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
    const { log } = await import('./utils/logger.mjs');
    const { printName } = await import('./utils/name.mjs');

    printName();

    // Load private key and RPC URL from environment variables
    const privateKey = process.env.PRIVATE_KEY;
    const rpcUrl = process.env.RPC_URL;

    // Create a provider and wallet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Function to wait for a specified number of milliseconds
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to generate a random EVM address
    function generateRandomAddress() {
        const randomWallet = ethers.Wallet.createRandom();
        return randomWallet.address;
    }

    // Function to generate multiple random addresses
    function generateMultipleRandomAddresses(count) {
        return Array.from({ length: count }, generateRandomAddress);
    }

    // Generate random addresses
    log('INFO', 'Generating random address... ');
    log('INFO', 'Please wait...... ');
    const randomAddresses = generateMultipleRandomAddresses(100000);
    log('INFO', 'Starting ETH transfers...');
    await delay(2000);

    // Define the amount to send (in ether)
    const amountInEther = '0.00000001'; // Amount to send in ETH

    // Function to send transactions with retries
    async function sendTransactions() {
        let successCount = 0; // Counter for successful transactions

        for (const recipient of randomAddresses) {
            let retryCount = 0;
            const maxRetries = 3; // Maximum number of retries per transaction

            while (retryCount < maxRetries) {
                // log('DEBUG', `Preparing to send transaction ${retryCount + 1}`);

                try {
                    // Create and send the transaction
                    const gas = await provider.getFeeData();
                    let gasPrice = gas.gasPrice?.toString();
                    if (gasPrice) {
                        gasPrice = ethers.parseUnits((parseFloat(gasPrice) * 2).toString(), "wei").toString();
                    }

                    const tx = {
                        to: recipient,
                        value: ethers.parseEther(amountInEther),
                        gasLimit: 21000, // Explicitly set gas limit
                        gasPrice: gasPrice,
                    };

                    await wallet.sendTransaction(tx);
                    successCount++;
                    log('SUCCESS', `Transaction ${successCount} sent to ${recipient}`);
                    break; // Exit retry loop on success
                } catch (error) {
                    retryCount++;
                    // log('ERROR', `Error sending transaction to ${recipient}`);
                    await delay(1000); // Wait before retrying
                }
            }

            await delay(500); // Delay between transactions
        }
    }

    await sendTransactions();
}

main().catch(console.error);
