// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// interface PDFPageViewerProps {
//     fileName: string;
//     pageNo: number;
// }

// export default function PDFPageViewer({ fileName, pageNo }: PDFPageViewerProps) {
//     const [imageUrl, setImageUrl] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     useEffect(() => {
//         async function fetchPDFPageImage() {
//             try {
//                 const response = await fetch(`/api/pdf-to-image?fileName=${encodeURIComponent(fileName)}&pageNo=${pageNo}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to convert PDF page to image');
//                 }
//                 const blob = await response.blob();
//                 const url = URL.createObjectURL(blob);
//                 setImageUrl(url);
//             } catch (err) {
//                 setError('Error loading PDF page');
//                 console.error(err);
//             }
//         }

//         fetchPDFPageImage();

//         return () => {
//             if (imageUrl) {
//                 URL.revokeObjectURL(imageUrl);
//             }
//         };
//     }, [fileName, pageNo]);

//     if (error) {
//         return <div className="text-red-500">{error}</div>;
//     }

//     if (!imageUrl) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="relative w-full max-w-2xl">
//             <Image
//                 src={imageUrl}
//                 alt={`PDF page ${pageNo}`}
//                 width={800}
//                 height={1132}
//                 className="object-contain"
//             />
//         </div>
//     );
// }