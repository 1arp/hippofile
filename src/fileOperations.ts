import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import parse from 'csv-parse';
import { DataOp } from "./dataOperations.js";

export class FileOperations {
  __filename: string;
  __dirname: string;
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(this.__filename);
  }

  fileRead() {
    let flag = false;
    let x = 0;
    let readStream = createReadStream(join(this.__dirname, 'products.csv'))
      .pipe(parse())
      .on('data', function (csvrow) {
        if (flag) {
          x++
          DataOp.addProduct({ name: csvrow[0], sku: csvrow[1], description: csvrow[2] })
          console.log(x);
        }
        flag = true;
      })
      .on('end', function () {
        console.log("end");
        DataOp.ingestData();
      })
  }
}
export const File = new FileOperations()