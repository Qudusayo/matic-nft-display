import { useState } from "react";
import axios from "axios";
import { useMoralisWeb3Api } from "react-moralis";
import SearchInput from "./components/SearchInput";
import DisplayInput from "./components/DisplayInput";

import { NFTBalance } from "./nftBalance.model";

function App() {
  const [address, setAddress] = useState<string>("");
  const [nftBalances, setNftBalances] = useState<NFTBalance[] | undefined>([]);
  const Web3Api = useMoralisWeb3Api();

  const addressChangeHandler = (address: string) => setAddress(address);

  const fetchNftBalances = async () => {
    // get polygon NFTs for address
    const polygonNFTs = await Web3Api.account.getNFTs({
      chain: "polygon",
      address,
    });
    let nftBalance = polygonNFTs.result;
    console.log(nftBalance);

    await Promise.all(
      nftBalance!.map(async (nft, index) => {
        // No Metadata, but token URI
        if (!!!nft.metadata && !!nft.token_uri) {
          try {
            const metadataReq = await axios.get(nft.token_uri);
            nft.metadata = JSON.stringify(metadataReq.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          if (typeof nft.metadata === "object") {
            nft.metadata = JSON.stringify(nft.metadata);
          }
        }
      })
    );
    let filteredNFTs = nftBalance?.filter(
      (nftMetadata) =>
        nftMetadata.metadata !== null && nftMetadata.metadata !== "null"
    );
    setNftBalances(filteredNFTs);
  };

  return (
    <div className="App">
      <SearchInput
        changeAddress={addressChangeHandler}
        submitAddress={fetchNftBalances}
      />
      {!!nftBalances && !!nftBalances.length && (
        <DisplayInput nftBalance={nftBalances} />
      )}
    </div>
  );
}

export default App;
