import { expect } from 'chai';
import { State, StateMachine, Account, HardCreate, toHex } from '../../../app';
import { randomAccount } from '../../utils';

const test = () => describe("Hard Create", () => {
  let state, account, initialAccount, initialStateSize;

  before(async () => {
    // SET UP INITIAL STATE
    state = await State.create();
    const stateMachine = new StateMachine(state);

    const firstAccountContract = randomAccount();
    const firstAccountSigner = randomAccount();
    const firstAccountBalance = 100;
    const firstAccount = new Account({
      address: firstAccountContract.address,
      nonce: 0,
      balance: firstAccountBalance,
      signers: [firstAccountSigner.address]
    });
    const accountIndex = await state.putAccount(firstAccount);

    initialStateSize = state.size;

    // EXECUTE TRANSACTION
    const contract = randomAccount();
    const signer = randomAccount();
    const initialAccountBalance = 50;
    initialAccount = new Account({
      address: contract.address,
      nonce: 0,
      balance: initialAccountBalance,
      signers: [signer.address]
    });

    const hardCreate = new HardCreate({
      hardTransactionIndex: 0,
      accountAddress: initialAccount.address,
      initialSigningKey: signer.address,
      value: initialAccount.balance
    });

    const transactions = {
      hardCreates: [hardCreate]
    };

    await stateMachine.execute(transactions);

    account = await state.getAccount(initialStateSize);
  });

  it("Should create an account with the expected address", async () => {
    expect(account.address).to.eql(initialAccount.address);
  });

  it("Should have created an account with nonce zero", async () => {
    expect(account.nonce).to.eql(0);
  });

  it("Should have created an account with expected balance", async () => {
    expect(account.balance).to.eql(initialAccount.balance);
  });

  it("Should have created an account with one signer with expected address", async () => {
    expect(account.signers.length).to.eql(initialAccount.signers.length);
    expect(account.hasSigner(toHex(initialAccount.signers[0]))).to.be.true;
  });

  it("Should have updated the state size", async () => {
    expect(state.size).to.eql(initialStateSize + 1);
  });

  describe("Encode and decode", () => {
    let bytes: Buffer;
    it('Should encode a transaction without the prefix', () => {
      const initialAccount = randomAccount();
      const hardCreate = new HardCreate({
        accountIndex: 0,
        hardTransactionIndex: 0,
        value: 20,
        accountAddress: initialAccount.address,
        initialSigningKey: initialAccount.address
      });
      bytes = hardCreate.encode();
    });

    it('Should decode the transaction', () => {
      const hardCreate = HardCreate.decode(bytes);
      expect(hardCreate.encode().equals(bytes)).to.be.true;
    });
  });
});

export default test;
if (process.env.NODE_ENV != 'all' && process.env.NODE_ENV != 'coverage') test();
