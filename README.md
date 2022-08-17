

# ACCROLLUP
> ACCROLLUP is in progress project as a "Layer Two" system for scalable EVM token transfers



## Summary
**ACCROLLUP** is a framework for performing EVM token transfers at a fraction of the cost of a standard transfer.

It accomplishes this by aggregating transactions and committing them into blocks. It includes a merkle root of the new account state along with the transaction data for each block. If some part of a block is invalid, anyone can submit a proof to that effect within a challenge period. Should they do so, they earn a reward and trigger a roll-back of the state.

ACCROLLUP is a member of the group of **"fraud proof rollup"** _(or "optimistic rollup")_ Layer Two technologies. That being said, ACCROLLUP  designates a single block producer, and the only permitted operations are deposits, transfers, withdrawals, and authorization of additional signing keys.

These operations are broken down into two high-level categories:

- **Hard transactions**, including deposits and direct withdrawals or signing key additions, can only be initiated from a corresponding account on mainnet. These are placed in a queue as soon as the ACCROLLUP contract is called, and must be processed by the block producer in the order they are received.
- **Soft transactions**, including transfers and standard withdrawals or signing key modifications, require a signature from a designated signer, and the block producer can choose whether or not to include a given soft transaction in a block.



⚠️ **Warning**: the project is **in progress** 



### Author

   - Dr. Mohammadreza Ashouri
   - https://ashoury.net
   - 2022 - ashourics@protonmail.com
   