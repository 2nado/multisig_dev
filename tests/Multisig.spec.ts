import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Multisig } from '../wrappers/Multisig';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Multisig', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Multisig');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let multisig: SandboxContract<Multisig>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        multisig = blockchain.openContract(Multisig.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await multisig.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: multisig.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and multisig are ready to use
    });
});
