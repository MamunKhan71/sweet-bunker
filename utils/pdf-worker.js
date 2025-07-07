import * as pdfjsLib from "pdfjs-dist/build/pdf";
import worker from "pdfjs-dist/build/pdf.worker.min";

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;