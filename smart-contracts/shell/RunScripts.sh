echo -n "Please enter rpc-url: ";
read;
RPC_URL=${REPLY};

echo -n "Please enter private key for transaction to deploy services: ";
read;
PRIVATE_KEY=${REPLY};

echo -n "Please enter your etherscan api key for verification: ";
read;
ETHERSCAN_API_KEY=${REPLY}
forge script script/DeployServices.s.sol:DeployServices --rpc-url ${RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} --chain 5 -vvvv

