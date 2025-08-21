// src/contexts/WalletProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: any[] | object;
      }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (
        event: string,
        handler: (...args: any[]) => void
      ) => void;
    };
  }
}

type WalletCtx = {
  isConnected: boolean;
  address?: string;
  chainId?: string;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const Ctx = createContext<WalletCtx | null>(null);
const AUTO_KEY = "wallet_autoconnect";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<string>();

  const isConnected = !!address;

  const connect = async () => {
    if (!window.ethereum?.isMetaMask) throw new Error("MetaMask not found");
    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const id: string = await window.ethereum.request({ method: "eth_chainId" });
    setAddress(accounts[0]);
    setChainId(id);
    localStorage.setItem(AUTO_KEY, "1");
  };

  const disconnect = () => {
    // MetaMask can’t be programmatically disconnected; clear local state instead.
    setAddress(undefined);
    setChainId(undefined);
    localStorage.removeItem(AUTO_KEY);
  };

  // Auto-connect on reload (without prompting) if user previously connected
  useEffect(() => {
    const autoconnect = localStorage.getItem(AUTO_KEY) === "1";
    (async () => {
      if (!window.ethereum || !autoconnect) return;
      const accounts: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setAddress(accounts[0]);
        const id: string = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(id);
      }
    })();
  }, []);

  // Keep in sync with wallet changes
  useEffect(() => {
    if (!window.ethereum) return;
    const onAccountsChanged = (accs: string[]) => {
      if (accs.length === 0) {
        setAddress(undefined);
        localStorage.removeItem(AUTO_KEY);
      } else {
        setAddress(accs[0]);
        localStorage.setItem(AUTO_KEY, "1");
      }
    };
    const onChainChanged = (id: string) => setChainId(id);
    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);
    return () => {
      window.ethereum?.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum?.removeListener("chainChanged", onChainChanged);
    };
  }, []);

  const value = useMemo(
    () => ({ isConnected, address, chainId, connect, disconnect }),
    [isConnected, address, chainId]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWallet() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
