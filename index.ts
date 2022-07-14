import { ethers } from "ethers"

const provider = new ethers.providers.InfuraProvider()

const contractAddress = "0x86C10D10ECa1Fca9DAF87a279ABCcabe0063F247"

const contractABI = [
    "function ownerOf(uint256) view returns (address)"
]

const petsContract = new ethers.Contract(contractAddress,contractABI,provider)
    
async function isPetMinted(petId: number) {
    
    //Crude V1 logic for checking if a pet has been minted
    //Try to get the pet's owner; if an error is thrown because the token does not exist return the pet ID
    //For an upcoming version, add logic to qualify the error and prevent false positives due to "real" errors e.g. rate-limiting
        
    try {
        await petsContract.ownerOf(petId)
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("ERC721: owner query for nonexistent token")) {
            console.log(petId)
        } else {
            console.log(error)
        }
    }

}
async function main(){
    for (let i = 1; i <= 10001; i++) {
        await isPetMinted(i)
    }
}

main()
