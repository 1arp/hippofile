import prismaclient from "@prisma/client";
const { PrismaClient } = prismaclient
import { Prisma } from ".prisma/client";

class DbOperations {
  prisma = new PrismaClient();

  batchUpsertProduct = (batch: Prisma.ProductCreateInput[]) => {
    const values = batch.map(product => `('${product.name}','${product.sku}', '${(product.description).toString()}')`).join(", ")
    return this.prisma.$executeRawUnsafe(`INSERT INTO "public"."Product" ("name","sku","description") VALUES ${values} ON CONFLICT (sku) DO UPDATE SET name=excluded.name, description=excluded.description WHERE "Product".sku=excluded.sku;`)
  }

  populateAggregateTable = async() => {
    await this.prisma.productCount.deleteMany();
    return this.prisma.$executeRawUnsafe(`INSERT INTO "public"."ProductCount" ("name", "count") SELECT pc.name, pc.count FROM ( SELECT name, count(*) from "Product" GROUP BY name ORDER BY count DESC) pc ON CONFLICT(name) DO UPDATE SET count=excluded.count;`)
  }

}

export const DBOperations = new DbOperations()