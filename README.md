#  FindAll

For SQL DB you can make a search criteria, that complies 
with the following scheme:

``` text
   {
    "where": {
         // Entity attributes and relations
    },
    "skip": 0, // Pagination
    "take": 10 // Pagination
  }  
```

## Example:

The `product entity` has a relation `many to one` with `category entity` , so lets make 
the following search: 
Products that have a price `greater than or equal` to `10` or `less than` 2 and that the name of the product category 
can be `snacks` , `drinks` or that the same name of the category includes `"sna"` .

`Find-Query` : 

``` typescript
import { findFull } from 'ez-findall/lib';



 const query =  {
    where: {
        price: [
          {
            $gte: 10.00
          },
          {
            $lt: 2.00 
          } 
        ],
        category: {
          $join: "inner",
          name: [
            {
               $like: "%25sna%25"
            },
            {
                $in: ["snacks", "drinks"]
            }            
          ] 
        }
    }
  }
  const results =  await findFull(ProductEntity, query, 'default');

```

> On `like` operator with the wildcar `%` , you should use `%25` instead of `%`
> cause some problems with browsers and `http clients`
> as `Postman` .


> If you are working on backend side you could use the widlcard `%` without problems.
> Also you could use any [wildcard](https://www.w3schools.com/sql/sql_wildcards.asp) on `like` operator according your 
> data base.

``` typescript
const query = {
    where: {
        id: { $like: '%chocho%' },
        category: {
            name: 'candy',
        },
        supermaket: { // inner join with `supermarket` entity.
            id: 25,
            address: '',
            city: {  // inner join with `city` entity.
                name: {$like: 'c[^u]'},
                state: {  // inner join with `state` entity.
                   id: {$in: [4, 5, 6, 7]},
                },   
            },
        },         
    },
    skip: 0,
    take: 30,  // Pagination  
};
const results =  await findFull(ProductEntity, query);
const filterProducts: ProductEntity[]  = results[0];
const totalFecthed: number = results[1]; // All filtered records in the Data Base
```

## Or operator

You can make a query with `OR` operator using the keyword `"$or"` as `"true"`
For example: Get products with a price of `7` or name includes `"choco"`

``` typescript
 const query  =  {
    where: {
        price: {$eq: 7, $or: true},
        name: {$like: %25choco%25, $or:  true}
    }
  };

 const results =  await findFull(ProductEntity, query);

```


## Operators

| Operator |   keyword  |  Example |
|  ------  |  -----  | --- |
| Like  | `$like` | "$like": "%sns%"    |
| iLike  | `$ilike` (PostgreSQL) | "$ilike": "%sns%"    |
| `> ` | `$gt` | "$gt": 20 |
| `>=` | `$gte` |  "$gte": 20 |
| `<` | `$lt` |  "$lt": 20 |
| `<=` | `$lte` |  "$lte": 20 |
| `=` | `$eq` |  "$eq": 20 |
| `!=` | `$ne` |   "$ne": 20 |
| Between | `$btw` | "$btw": [A, B]  |
| In | `$in` | "$in": [A, B, ...] |
| Not In | `$nin` | "$nin": [A, B, ...]"
| Not Between | `$nbtw` |  "$nbtw": [A, B, ...]"

> if your are using MongoDB, you must use the query operators for mongo, check the [documentation](https://docs.mongodb.com/manual/reference/operator/query/)

### Join Relations

The join relations could be many levels as you want, you need to write the 
`ManyToOne` , `OneToMany` , `OneToOne` , relationship name in your `Find Query Object` like the previous example.
 

If the join is of the `inner` type it is not necessary to put the keyword `"$join": "inner"` , only if you want to use a join of the type "left" ( `" $join ":" left"` )

### Pagination

The pagination by default is `skip: 0` and `take: 10` .

### Order By

The order by criteria by default with respect the entity `id` is `DESC` : 
 

``` typescript
 const query =  {
    where: {
         
    },
    orderBy: {
        // Order by criteria
    }
  }  
```


### Select columns

In order to get records with an specific set of columns, you could make use of `$sel` operator:

For example: Get products with a bigger than `7` and only retrieves the name of the filtered products.

``` json
   {
    "where": {
        "$sel": ["name"],
        "price": {"$gt": 7}
    }
  }  
```

Also, you could use the `$sel` operator on queries with joins.


> All columns that are retrieved will always include the id column


For example: the following query retrieves products with name and its supermarket with only name and address.

``` typescript
const query = {
    where: {
        $sel: ["name"],
        category: {
            name: 'candy',
        },
        supermaket: { // Select address and name
            $sel: ["name", "address"], 
        },         
    },
    skip: 0,
    take: 30, 
}

```
