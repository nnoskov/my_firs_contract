import { compile, NetworkProvider } from "@ton-community/blueprint";
import { MainContract } from "../wrappers/MainCotract";
import { address, toNano } from "ton-core";

export async function run(provider: NetworkProvider) {
  const codeCell = await compile("MainContract");
  const myContract = MainContract.createFromConfig(
    {
      number: 0, // initial value of counter
      address: address("0QD_oe-OXwJum1qQlTRYmxwEJS6jlil-giJ1BgxKZq7OFYYb"),
      owner_address: address(
        "0QD_oe-OXwJum1qQlTRYmxwEJS6jlil-giJ1BgxKZq7OFYYb"
      ),
    },
    codeCell
  );
  const openContract = provider.open(myContract);
  openContract.sendDeploy(provider.sender(), toNano("0.01"));

  await provider.waitForDeploy(myContract.address);
}
