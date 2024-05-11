import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { BuyMeCoffee } from "../../components/BuyMeCoffee";
import "../../components/BuyMeCoffee.css";

// Import your logo image
import "./favicon.ico";
import "./favicon.png";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        marginTop: "2rem",
      }}
    >
      <div
        className="mobileNav"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // Center vertically
          justifyContent: "space-between", // Add space between elements
          width: "100%",
          marginTop: "-170px",
        }}
      >
        {/* Logo */}
        <img
          src="favicon.ico"
          alt="Logo"
          style={{
            paddingLeft: "0px",
            margin: "10px",
            width: "150px",
            height: "auto",
          }}
        />

        <div
          style={{
            textAlign: "center",
            flex: 1, // Take remaining space
          }}
        >
          <h1 style={{ color: "#BF40BF" }}>
            Claim non-fungible NFTs & ERC20 Tokens
          </h1>
          <p style={{ fontSize: "12px", color: "grey", marginTop: "4px" }}>
            only eligible to United States veterans.
          </p>
        </div>
        <img
          src="favicon.ico"
          alt="Logo"
          style={{
            paddingRight: "0px",
            margin: "10px",
            width: "150px",
            height: "auto",
          }}
        />
      </div>
      <ConnectEmbed client={client} chain={chain} />
      <BuyMeCoffee />
      <div className="buymeacoffee-five-line-paragraph">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      {/* Footer */}
      <footer className="footer">
        <p style={{ fontSize: "1rem", color: "#888", marginBottom: "0.7rem" }}>
          By visiting this site, you agree to our{" "}
          <a
            href="https://www.binance.com/en/terms"
            style={{ color: "#333", textDecoration: "underline" }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://www.binance.us/privacy-policy"
            style={{ color: "#333", textDecoration: "underline" }}
          >
            Privacy Policy
          </a>
          .
        </p>
        <p style={{ fontSize: "1rem", color: "#888" }}>
          © 2024 Ojakpa Networks. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
