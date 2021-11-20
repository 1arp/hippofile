
## Set up

```bash
docker-compose up
```

## Schema

```bash
Product{
  name        String
  sku         String @id
  description String
}

ProductCount {
  name  String @id
  count Int
}
```

### Recreate DB Tables ( schema )

```bash
(handled by migrations in docker)
```

## Interact with DB

```bash
docker exec -it <docker-db-id> psql -U prisma -d tests
```

## Completed Points To Achieve

- [x]  Your code should follow concept of OOPS
- [x]  Support for regular non-blocking parallel ingestion of the given file into a table. Consider thinking about the scale of what should happen if the file is to be processed in 2 mins.
- [x]  Support for updating existing products in the table based on `sku` as the primary key. (Yes, we know about the kind of data in the file. You need to find a workaround for it)
- [x]  All product details are to be ingested into a single table
- [x]  An aggregated table on above rows with `name` and `no. of products` as the columns

## Points To Achieve Not Complete

none

### Sample Rows

- Product Table

  count: 466693

```bash
tests=# select * from "Product";
-[ RECORD 1 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Ashley Hughes
sku         | page-church-simple
description | Court successful coach state. Every yourself along far.                
                                                                                     
                                           +
            | Should think item director. Particularly purpose nature article wide wh
ose.
-[ RECORD 2 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | George Norman
sku         | special-a-avoid
description | Four room watch candidate but. Outside source moment put under.        
                                                                                     
                                           +
            | President level seat federal. Determine politics here even able persona
l. Building let another always approach.
-[ RECORD 3 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Mr. Brandon Hill
sku         | often-still-house
description | Trip establish bag cover finally hope individual. Remain table read ris
e off yet word. Look once reveal style.
-[ RECORD 4 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Megan Craig
sku         | control-dream-very
description | But low little economy fly say conference.                             
                                                                                     
                                           +
            | Range without service moment behavior develop. Technology take produce 
door point agreement country.
-[ RECORD 5 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Brenda Dickerson
sku         | despite-sing-song
description | House loss from so Congress politics boy. Others summer mind push appea
r sit adult commercial. Not next on product.
-[ RECORD 6 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Tiffany Chapman
sku         | later-decide-day
description | Life finish manage administration recognize hit. Edge long certain dark
 address knowledge executive.                                                        
                                           +
            | Cut if kind image. Worker knowledge fund them care nice rest.
-[ RECORD 7 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Steven Martin
sku         | despite-actually
description | Wife blood interview head. Citizen human various stuff sometimes accoun
t summer.                                                                            
                                           +
            | Allow her democratic author technology score.                          
                                                                                     
                                           +
            | Pretty learn it bag part. Day better child section guy.
-[ RECORD 8 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Anthony Becker
sku         | traditional
description | Born simple ready by song responsibility yet. Skill far how stand patte
rn natural.                                                                          
                                           +
            | Page ask section run everybody subject. Fact painting performance still
 establish international.
-[ RECORD 9 ]------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | Melissa Quinn
sku         | animal-blood-minute
description | Western energy school east political position discussion. Compare treat
 after look site edge while.
-[ RECORD 10 ]-----------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------
name        | John Rose
sku         | subject-nor-run
description | Camera say player across politics issue attack. Opportunity factor even
 evidence. Her road easy house chair left dinner reduce.
--More--
```

- ProductCount Table

  count: 212751

```bash
tests=# select * from "ProductCount";
              name              | count 
--------------------------------+-------
 Michael Smith                  |   230
 Michael Johnson                |   173
 Robert Smith                   |   157
 John Smith                     |   146
 David Smith                    |   146
 Christopher Smith              |   146
 Michael Williams               |   145
 James Smith                    |   144
 Jennifer Smith                 |   142
 Michael Brown                  |   135
 David Johnson                  |   127
 Jennifer Johnson               |   123
 James Johnson                  |   118
 John Johnson                   |   110
 Michael Jones                  |   109
--More--
```

## Possible Improvements

Scalabilty:

Use producer-consumer architechture

- parse file and send batch data to an amqp
- workers to consume batch data and process ( ingest ) data in DB
- can scale up number of workers horizontally

Better Optimization:

Better benchmarking amd optimization

- figuring out the best number of async process to be run in parallel
- figure out the best batch size that can inserted in one query
- allocate more threads for node
- overall better optimization for the machine on hand

Bash Script to sanitize data instead of parsing data in memory

Better Variable Names:

- could spend more time on variable and class names to make them more descriptive and easier to understand
