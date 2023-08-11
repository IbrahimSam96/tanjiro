import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RegisterSchema } from "./components/RegisterNewSchema";
import PageComponent from "./pageComponent"
import { MintERC721 } from './components/MintERC721';
// import { MintERC721 } from './components/MintERC721';

export default function Home() {

  return (

    < div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,1fr] bg-[black] `}>

      <span className={`col-start-1 col-end-8 row-start-1 m-4 justify-self-end `}>
        {/* <ConnectButton /> */}
      </span>
      <span className={`col-start-1 col-end-8 row-start-1 m-4 justify-self-start `}>
        {/* <MintERC721 /> */}
      </span>
      <PageComponent />
    </div>
  )
}
