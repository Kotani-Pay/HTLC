# hashed-timelock-contract

[![NPM Package](https://img.shields.io/npm/v/ethereum-htlc.svg?style=flat-square)](https://www.npmjs.org/package/ethereum-htlc)
[![Build Status](https://travis-ci.com/chatch/hashed-timelock-contract-ethereum.svg?branch=master)](https://travis-ci.com/chatch/hashed-timelock-contract-ethereum)

[HashedTimelockERC20.sol](contracts/HashedTimelockERC20.sol) - HTLC for ERC20 tokens

Use these contracts for creating HTLCs on the Ethereum side of a cross chain atomic swap (for example the [xcat](https://github.com/chatch/xcat) project).

## Run Tests
* Install dependencies
* Start [Ganache](https://www.trufflesuite.com/ganache) with network ID `4447`
* Run the [Truffle](https://www.trufflesuite.com/truffle) tests

```
$ npm install
$ npm run ganache-start
$ npm run test
Using network 'test'.

Compiling ./test/helper/ASEANToken.sol...
Compiling ./test/helper/EUToken.sol...


  Contract: HashedTimelockERC20
    ✓ newContract() should create new contract and store correct details (214ms)
    ✓ newContract() should fail when no token transfer approved (107ms)
    ✓ newContract() should fail when token amount is 0 (166ms)
    ✓ newContract() should fail when tokens approved for some random account (214ms)
    ✓ newContract() should fail when the timelock is in the past (136ms)
    ✓ newContract() should reject a duplicate contract request (282ms)
    ✓ withdraw() should send receiver funds when given the correct secret preimage (363ms)
    ✓ withdraw() should fail if preimage does not hash to hashX (227ms)
    ✓ withdraw() should fail if caller is not the receiver  (307ms)
    ✓ withdraw() should fail after timelock expiry (2257ms)
    ✓ refund() should pass after timelock expiry (2407ms)
    ✓ refund() should fail before the timelock expiry (283ms)
    ✓ getContract() returns empty record when contract doesn't exist (55ms)

  Contract: HashedTimelock swap between two ERC20 tokens
    ✓ Step 1: Alice sets up a swap with Bob in the AliceERC20 contract (233ms)
    ✓ Step 2: Bob sets up a swap with Alice in the BobERC20 contract (239ms)
    ✓ Step 3: Alice as the initiator withdraws from the BobERC20 with the secret (97ms)
    ✓ Step 4: Bob as the counterparty withdraws from the AliceERC20 with the secret learned from Alice's withdrawal (144ms)
    Test the refund scenario:
      ✓ the swap is set up with 5sec timeout on both sides (3613ms)


  39 passing (27s)
```

## Protocol - ERC20

### Main flow

![](docs/sequence-diagram-htlc-erc20-success.png?raw=true)

### Timelock expires

![](docs/sequence-diagram-htlc-erc20-refund.png?raw=true)

## Interface

### HashedTimelockERC20

1.  `newContract(receiverAddress, hashlock, timelock, tokenContract, amount)` create new HTLC with given receiver, hashlock, expiry, ERC20 token contract address and amount of tokens
2.  `withdraw(contractId, preimage)` claim funds revealing the preimage
3.  `refund(contractId)` if withdraw was not called the contract creator can get a refund by calling this some time after the time lock has expired.

See [test/htlcERC20.js](test/htlcERC20.js) for examples of interacting with the contract from javascript.
