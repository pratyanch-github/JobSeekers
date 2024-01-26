export default function Shimmer({count}) {

   let generateShimmer=(count)=>{
     
     let comp =[];
     let singleComp = (<div className="flex flex-col w-[100%] m-2 p-4 rounded-lg bg-gray-700 border-2 border-gray-600">
                       <p className="m-3 text-2xl">Fetching ...........</p>
                       </div>)

      for(let i=0; i<count; i++)
      {
        comp.push(singleComp);
      }
      return comp;
   } 

  return (
    <div>
        <div className="shimmer-container flex flex-wrap gap-3">
            {
                generateShimmer(count)
            }
        </div>
    </div>
  )
};
