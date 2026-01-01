import fs from 'fs';
import * as XLSX from 'xlsx';

export async function extractTextFromPDF(filePathOrBuffer: string | Buffer): Promise<string> {
    // 1️⃣ Import dynamic để gọi pdf-parse (CommonJS) trong ESM
    const pdfParsePkg = await import('pdf-parse'); 
    // @ts-ignore
    const pdfParse = pdfParsePkg.default ?? pdfParsePkg; // lấy function thật

    let buffer: Buffer;
    if (typeof filePathOrBuffer === 'string') {
        buffer = await fs.promises.readFile(filePathOrBuffer);
    } else {
        buffer = filePathOrBuffer;
    }

    const data = await pdfParse(buffer); // ✅ chạy được
    return data.text;
}

export async function readExcelAsText(filePath: string): Promise<string> {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    let text = '';
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        text += XLSX.utils.sheet_to_csv(sheet);
    });
    return text;
}
