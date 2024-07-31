// import type { NextApiRequest, NextApiResponse } from 'next';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { imageUrl } = req.body;

//       const uploadResult = await cloudinary.uploader.upload(imageUrl, {
//         public_id: 'bag_model',
//         categorization: 'google_tagging',
//         auto_tagging: 0.75,
//       });

//       const url = cloudinary.url('bag_model', {
//         transformation: [
//           { effect: 'background_removal' },
//           { underlay: 'buildings_bg', flags: 'relative', width: '1.0', height: '1.0', crop: 'fill' },
//           { gravity: 'auto', crop: 'auto', aspect_ratio: 0.5 }
//         ]
//       });

//       res.status(200).json({ url });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to upload and transform image' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }