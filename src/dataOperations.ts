import { Prisma } from ".prisma/client";
import PQueue from 'p-queue';
import { DBOperations } from "./dbOperations.js";

class DataOperations {
  data: { [key: string]: Prisma.ProductCreateInput };
  queue: PQueue;
  constructor() {
    this.data = {};
    this.queue = new PQueue({ concurrency: 50 });
  }

  addProduct = (product: Prisma.ProductCreateInput) => {
    this.data[product.sku] = product;
  }

  ingestData = async() => {
    let batch: Array<Prisma.ProductCreateInput> = []
    let batches: Array<Prisma.ProductCreateInput[]> = []
    Object.values(this.data).map((product) => {
      if (batch.length < 30) {
        batch.push(product);
      } else {
        batches.push(batch)
        batch = [];
        batch.push(product)
      }
    })
    batches.push(batch)

    batches.map(async (batch) => {
      await this.queue.add(() => DBOperations.batchUpsertProduct(batch))
    })


    await this.queue.onIdle()
    DBOperations.populateAggregateTable()
  }

}
export const DataOp = new DataOperations()