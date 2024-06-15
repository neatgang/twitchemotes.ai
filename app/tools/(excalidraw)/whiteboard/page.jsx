// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import * as fal from "@fal-ai/serverless-client";
// import { Input } from "@/components/ui/input";

// // import { exportToBlob, serializeAsJSON } from "@excalidraw/excalidraw";

// fal.config({
//   proxyUrl: "/api/fal/proxy",
// });

// const seed = Math.floor(Math.random() * 100000);
// const baseArgs = {
//   sync_mode: true,
//   strength: 0.99,
//   seed,
// };

// // const Excalidraw = dynamic(
// //   () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
// //   {
// //     ssr: false,
// //   }
// // );

// export default function Home() {
//   const [input, setInput] = useState(
//     "masterpiece, best quality, a cinematic shot of a baby raccoon wearing an intricate italian priest robe"
//   );
//   const [image, setImage] = useState(null);
//   const [sceneData, setSceneDate] = useState(null);
//   const [excalidrawAPI, setExcalidrawAPI] = useState(null);
//   const [_appState, setAppState] = useState(null);

//   const { send } = fal.realtime.connect("110602490-sdxl-turbo-realtime", {
//     connectionKey: "realtime-nextjs-app-10",
//     onResult(result) {
//       if (result.error) return;
//       setImage(result.images[0].url);
//     },
//   });

//   async function getDataUrl(appState = _appState) {
//     const elements = excalidrawAPI.getSceneElements();
//     if (!elements || !elements.length) return;
//     const blob = await exportToBlob({
//       elements,
//       exportPadding: 0,
//       appState,
//       quality: 0.5,
//       files: excalidrawAPI.getFiles(),
//       getDimensions: () => {
//         return {
//           width: 450,
//           height: 450,
//         };
//       },
//     });
//     return await new Promise((r) => {
//       let a = new FileReader();
//       a.onload = r;
//       a.readAsDataURL;
//       then((e) => e.target.result);
//     });
//   }

//   const handleChange = (elements, appState) => {
//     console.log(elements, appState);
//   };

//   return (
//     <main className="p-10">
//       {/* <p>Fal SDXL Turbo</p>
//       <input
//         className="border rounded-lg p-2 w-full mb-2"
//         value={input}
//         onChange={async (e) => {
//           setInput(e.target.value);
//           let dataUrl = await getDataUrl();
//           send({
//             ...baseArgs,
//             prompt: e.target.value,
//             image_url: dataUrl,
//           });
//         }}
//       /> */}
//       <div className="flex">
//         <div className="w-full h-[500px]">
//           {/* <Excalidraw
//             excalidrawAPI={(api) => setExcalidrawAPI(api)}
//             onChange={handleChange} // Updated to use the new handleChange function
//           /> */}
//         </div>
//         {image && (
//           <Image src={image} width={550} height={550} alt="fal-image" />
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import bubbleLibrary from "!!raw-loader!../../../public/excalidraw-assets/libraries/bubbles.excalidrawlib";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
  {
    ssr: false,
  }
);

export default function Home() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const handleChange = (elements, appState) => {
    // Access elements and app state here
    console.log(elements, appState);
  };

  return (
    <div style={{ height: "1000px", width: "200" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={handleChange}
        initialData={{
          libraryItems: [JSON.parse(bubbleLibrary)],
        }}
      />
    </div>
  );
}
