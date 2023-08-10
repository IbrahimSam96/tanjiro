import * as React from 'react'
import { useWalletClient, usePublicClient } from 'wagmi'
import { providers } from 'ethers'


export function walletClientToSigner(walletClient) {
    const { account, chain, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport, network)
    const signer = provider.getSigner(account.address)
    return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId } = {}) {
    const { data: walletClient } = useWalletClient({ chainId })
    return React.useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient],
    )
}


// export function publicClientToProvider(publicClient) {
//     const { chain, transport } = publicClient
//     const network = {
//         chainId: chain.id,
//         name: chain.name,
//         ensAddress: chain.contracts?.ensRegistry?.address,
//     }
//     if (transport.type === 'fallback')
//         return new providers.FallbackProvider(
//             (transport.transport).map(
//                 ({ value }) => new providers.JsonRpcProvider(value?.url, network),
//             ),
//         )
//     return new providers.JsonRpcProvider(transport.url, network)
// }

// /** Hook to convert a viem Public Client to an ethers.js Provider. */
// export function useEthersProvider({ chainId } = {}) {
//     const publicClient = usePublicClient({ chainId })
//     return React.useMemo(() => publicClientToProvider(publicClient), [publicClient])
// }


export function publicClientToProvider(publicClient) {
    const { chain, transport } = publicClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address
    };
    if (transport.type === "fallback")
        return new providers.FallbackProvider(
            (transport.transports).map(
                ({ value }) => new providers.JsonRpcProvider(value?.url, network)
            )
        );
    return new providers.JsonRpcProvider(transport.url, network);
}
export function useProvider() {
    const publicClient = usePublicClient();

    const [provider, setProvider] = React.useState(undefined);
    React.useEffect(() => {
        async function getSigner() {
            if (!publicClient) return;

            const tmpProvider = publicClientToProvider(publicClient);

            setProvider(tmpProvider);
        }

        getSigner();

    }, [publicClient]);
    return provider;
}
