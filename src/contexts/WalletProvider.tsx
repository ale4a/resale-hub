// src/contexts/WalletProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

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
  chainId?: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
};

const Ctx = createContext<WalletCtx | null>(null);
const AUTO_KEY = "wallet_autoconnect";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<number>();

  const connect = async () => {
    if (!window.ethereum?.isMetaMask) {
      throw new Error("MetaMask not found");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAddress(account);
      setIsConnected(true);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      setChainId(parseInt(chainId, 16));

      localStorage.setItem(AUTO_KEY, "true");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(undefined);
    setChainId(undefined);
    localStorage.removeItem(AUTO_KEY);
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!window.ethereum || !address) {
      throw new Error("Wallet not connected");
    }

    try {
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });
      return signature;
    } catch (error) {
      console.error("Failed to sign message:", error);
      throw error;
    }
  };

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const shouldAutoConnect = localStorage.getItem(AUTO_KEY) === "true";
    if (shouldAutoConnect && window.ethereum?.isMetaMask) {
      connect().catch(console.error);
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(parseInt(chainId, 16));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <Ctx.Provider
      value={{
        isConnected,
        address,
        chainId,
        connect,
        disconnect,
        signMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
