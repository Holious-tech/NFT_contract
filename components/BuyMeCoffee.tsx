"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import { contract } from "../utils/contract";
import { time, timeStamp } from "console";
import "./BuyMeCoffee.css";

export const BuyMeCoffee = () => {
  const account = useActiveAccount();

  const [tipAmount, setTipAmount] = useState(0);
  const [message, setMessage] = useState("");

  const { data: totalCoffee, refetch: refetchTotalCoffee } = useReadContract({
    contract: contract,
    method: "getTotalCoffee",
  });

  const { data: contractEvents, refetch: refetchContractEvents } =
    useContractEvents({
      contract: contract,
    });

  const truncatewalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const convertDate = (timeStamp: bigint) => {
    const timeStampNumber = Number(timeStamp);
    return new Date(timeStampNumber * 1000).toLocaleString();
  };

  if (account) {
    return (
      <div className="buymeacoffee-container">
        <div
          className="buymeacoffee-connect-button"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          {/* Apply the connect button class */}
          <ConnectButton client={client} chain={chain} />
        </div>

        <div className="buymeacoffee-inputs">
          <label>NFTs Value</label>
          <p className="buymeacoffee-input-hint">
            Must be greater than 0 & Must be in ETH.
          </p>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            step={0.01}
            className="buymeacoffee-input"
          />
          <label>VTN Code</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter VTN Ref Number"
            className="buymeacoffee-input"
          />
        </div>
        {message && tipAmount > 0 && (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: contract,
                method: "buyMeACoffee",
                params: [message],
                value: BigInt(toWei(tipAmount.toString())),
              })
            }
            onTransactionConfirmed={() => {
              alert("NFT Collection was successful!");
              setTipAmount(0);
              setMessage("");
              refetchTotalCoffee();
            }}
            className="buymeacoffee-transaction-button"
            style={{
              backgroundColor: "#BF40BF",
              color: "white",
              fontSize: "20px",
              marginBottom: "2rem",
              width: "100%",
              borderRadius: "10px",
              marginTop: "2rem",
            }}
          >
            Claim
          </TransactionButton>
        )}
        <div>
          <h3 className="buymeacoffee-total-coffees">
            Total NFTs: {totalCoffee?.toString()}
          </h3>
          <p className="buymeacoffee-recent-coffees">Recent NFTs:</p>
          {contractEvents &&
            contractEvents.length > 0 &&
            [...contractEvents].reverse().map((event, index) => (
              <div key={index} className="buymeacoffee-recent-coffee">
                <div className="buymeacoffee-recent-coffee-info">
                  <p className="buymeacoffee-recent-coffee-sender">
                    {/* @ts-ignore */}
                    {truncatewalletAddress(event.args.sender)}
                  </p>
                  <p className="buymeacoffee-recent-coffee-timestamp">
                    {/* @ts-ignore */}
                    {convertDate(event.args.timeStamp)}
                  </p>
                </div>
                <p className="buymeacoffee-recent-coffee-message">
                  {/* @ts-ignore */}
                  {event.args.message}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
};
