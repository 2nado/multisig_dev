import { toNano } from '@ton/core';
import { Multisig } from '../wrappers/Multisig';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const multisig = provider.open(Multisig.createFromConfig({}, await compile('Multisig')));

    await multisig.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(multisig.address);

    // run methods on `multisig`
}
