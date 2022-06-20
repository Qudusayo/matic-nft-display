import React from "react";
import styles from "./DisplayInput.module.scss";

import { NFTBalance } from "./../nftBalance.model";

interface DisplayInputProp {
  nftBalance: NFTBalance[] | undefined;
}

const DisplayInput: React.FC<DisplayInputProp> = (props) => {
  return (
    <div className={styles.Displays}>
      {!!props.nftBalance &&
        props.nftBalance
          .map((nftMetadata) => JSON.parse(nftMetadata.metadata!))
          .map((nftMetadata, index) => {
            if (nftMetadata.image_url) {
              nftMetadata.image = nftMetadata.image_url;
            }
            return (
              <div className={styles.DisplayInput} key={index}>
                <img
                  src={
                    !!nftMetadata
                      ? nftMetadata?.image.startsWith("ipfs://")
                        ? "https://gateway.pinata.cloud/ipfs/" +
                          nftMetadata.image.split("ipfs://")[1]
                        : nftMetadata.image
                      : "https://icodrops.com/wp-content/uploads/2021/11/TheEthereumNameService_logo.jpeg"
                  }
                  alt="Malevolent"
                />
                <div className={styles.DisplayInputName}>
                  <h2>{!!nftMetadata ? nftMetadata.name : "No Name"}</h2>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DisplayInput;
