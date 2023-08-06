import PageComponent from "./pageComponent"

export default function Home() {

  return (

    < div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,1fr] bg-[black] `}>
      <div className={`row-start-2 col-start-1 col-span-8`}> 
      <PageComponent />
      </div>
    </div>
  )
}
