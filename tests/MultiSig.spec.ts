import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MultiSig } from '../wrappers/MultiSig';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MultiSig', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MultiSig');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let multiSig: SandboxContract<MultiSig>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        multiSig = blockchain.openContract(MultiSig.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await multiSig.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: multiSig.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and multiSig are ready to use
    });
});
