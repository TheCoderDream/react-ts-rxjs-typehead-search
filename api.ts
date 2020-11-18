import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { data } from "./data.ts";
import { Product } from "./models/Product";

export function searchProducts(query: string): Observable<Array<Product>> {
  query = query.trim().toLocaleLowerCase();
  const filteredProducts = data.filter((p: Product) => {
    return (
      p.title.toLocaleLowerCase().includes(query) ||
      p.description.toLocaleLowerCase().includes(query) ||
      p.category.toLocaleLowerCase().includes(query)
    );
  });

  return of(filteredProducts).pipe(delay(500));
}
