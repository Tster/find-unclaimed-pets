import { ethers } from "ethers"

const provider = new ethers.providers.InfuraProvider()

const contractAddress = "0x86C10D10ECa1Fca9DAF87a279ABCcabe0063F247"

const contractABI = [
    "function ownerOf(uint256) view returns (address)"
]

const petsContract = new ethers.Contract(contractAddress,contractABI,provider)
    
async function isPetMinted(petId: number) {
    
    try {
        await petsContract.ownerOf(petId)
    } catch {
        console.log("Pet not minted: " + petId)

        //Call OpenSea API to check if corresponding cat is listed
        //If listed, console.log price and tokenId
    }

}
async function main(){
    for (let i = 1; i <= 10001; i++) {
        await isPetMinted(i)
    }
}

main()
