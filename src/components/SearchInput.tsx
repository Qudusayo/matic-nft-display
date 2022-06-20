import React from "react";
import styles from "./SearchInput.module.scss";

interface SearchInputProp {
  changeAddress: (address: string) => void;
  submitAddress: () => void;
}

const SearchInput: React.FC<SearchInputProp> = (props) => {
  const addressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeAddress(event.target.value);
  };

  const submitAddress = (event: React.FormEvent) => {
    event.preventDefault();
    props.submitAddress();
  };

  return (
    <>
      <h2 className={styles.title}>Get User NFT</h2>
      <form onSubmit={submitAddress} className={styles.SearchInput}>
        <input
          type="text"
          id="address-input"
          autoComplete={"off"}
          onChange={addressChangeHandler}
          placeholder={"0x000000000000000000000000000000000000dead"}
        />
        <button type="submit">Get Polygon NFTs</button>
      </form>
    </>
  );
};

export default SearchInput;
