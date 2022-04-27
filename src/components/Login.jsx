import React from "react";
import Web3 from "web3";

import ExobitsABI from '../contract/ReExoBits.json';
import contract_address_list from '../contract/contract-address.json';

export default function Login(props) {

	//const contractAddress = "0xE7046373c0D9e74529362B0A98F9F7784bF46B4D";
	//const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	const contractAddress = contract_address_list.ReExobits;
	
	const DoConnect = async () => {

		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			// Request account access if needed
			await window.ethereum.request({ method: 'eth_requestAccounts' })
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get an instance of the contract sop we can call our contract functions
			const instance = new web3.eth.Contract(
				ExobitsABI.abi, 
				contractAddress
			);
			props.callback({ web3, accounts, contract: instance });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

	// If not connected, display the connect button.
	if(!props.connected) return <button className="login" onClick={DoConnect}>Connect Wallet</button>;

	// Display the wallet address. Truncate it to save space.
	return <>[{props.address.slice(0,6)}]</>;
}