// src/MetaMaskMinimal.tsx
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MetaMaskMinimal() {
  const [address, setAddress] = useState<string>("");

  const connect = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  };

  const signMessage = async () => {
    if (!window.ethereum || !address) return;
    const message = "Demo signature from Vite";
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, address],
    });
    console.log({ signature });
    alert("Signed! Check console.");
  };

  return (
    <div>
      <button onClick={connect}>Connect MetaMask</button>
      <div>{address ? `Connected: ${address}` : "Not connected"}</div>
      <button onClick={signMessage} disabled={!address}>
        Sign test message
      </button>
    </div>
  );
}
