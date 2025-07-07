// import fs from 'fs/promises';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import { fromPath } from 'pdf2pic';

// export async function GET(req: Request) {
//   console.log('API Route Hit:', {
//     method: 'GET',
//     url: req.url,
//   });

//   const { searchParams } = new URL(req.url);
//   const fileName = searchParams.get('fileName');
//   const pageNo = searchParams.get('pageNo');

//   if (!fileName || !pageNo) {
//     console.log('Invalid query parameters:', { fileName, pageNo });
//     return NextResponse.json({ error: 'Invalid fileName or pageNo' }, { status: 400 });
//   }

//   try {
//     const decodedFileName = decodeURIComponent(fileName);
//     const pdfPath = path.join(process.cwd(), 'public', 'pdfs', decodedFileName);
//     console.log('Attempting to access PDF:', pdfPath);

//     try {
//       await fs.access(pdfPath);
//     } catch (error) {
//       console.log('File not found:', pdfPath, error);
//       return NextResponse.json({ error: `PDF file not found: ${decodedFileName}` }, { status: 404 });
//     }

//     const output = fromPath(pdfPath, {
//       density: 100,
//       format: 'png',
//       width: 800,
//       height: 1132,
//     });

//     const pageNumber = parseInt(pageNo, 10);
//     if (isNaN(pageNumber) || pageNumber < 1) {
//       console.log('Invalid page number:', pageNo);
//       return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
//     }

//     console.log('Converting page:', pageNumber);
//     const result = await output.bulk([pageNumber]);
//     const imageBuffer = result[0].buffer;

//     return new NextResponse(imageBuffer, {
//       headers: {
//         'Content-Type': 'image/png',
//         'Cache-Control': 'no-store',
//       },
//     });
//   } catch (error) {
//     console.error('PDF conversion error:', error);
//     return NextResponse.json({ error: 'Failed to convert PDF page' }, { status: 500 });
//   }
// }