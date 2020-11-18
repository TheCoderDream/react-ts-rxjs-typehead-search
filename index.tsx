import React, { Component } from "react";
import { render } from "react-dom";
import { Subject, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
  map
} from "rxjs/operators";
import { searchProducts } from "./api";
import Loader from "./components/Loader";
import Product from "./components/Product";
import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import { Product as ProductModel } from "./models/Product";
import "./style.css";

interface AppProps {}
interface AppState {
  searchTerm: string;
  loading: boolean;
  notFound: boolean;
  searchResult: Array<ProductModel>;
  slicedResult: Array<ProductModel>;
}

class App extends Component<AppProps, AppState> {
  state = {
    searchTerm: "",
    loading: false,
    notFound: false,
    searchResult: [],
    slicedResult: []
  };

  changes$ = new Subject();
  subscription: Subscription;
  slicedCount = 4;

  get noResult() {
    const { loading, searchTerm, notFound } = this.state;
    return !loading && this.isQueryValid() && notFound;
  }

  componentDidMount(): void {
    this.subscription = this.changes$
      .pipe(
        debounceTime(200),
        map((val: string) => val.trim().toLocaleLowerCase()),
        distinctUntilChanged(),
        filter(value => {
          if (!this.isQueryValid(value)) {
            this.setState({
              searchResult: [],
              slicedResult: []
            });
            return false;
          }
          return true;
        }),
        tap(() => {
          this.setState({
            loading: true,
            notFound: false
          });
        }),
        switchMap((query: string) => searchProducts(query))
      )
      .subscribe(data => {
        this.setState({
          loading: false,
          notFound: !data.length,
          searchResult: data,
          slicedResult: data.slice(0, this.slicedCount)
        });
      });
  }

  componentWillUnmount(): void {
    this.subscription.unsubscribe();
  }

  handleChange = (value: string): void => {
    this.changes$.next(value);
    this.setState({
      searchTerm: value
    });
  };

  isQueryValid(query = this.state.searchTerm): boolean {
    return query.trim() && query.length >= 2;
  }

  render() {
    const { searchTerm, loading, searchResult, slicedResult } = this.state;
    return (
      <div>
        <SearchBar value={searchTerm} onChange={this.handleChange} />
        <Loader show={loading} />
        <Result
          noResult={this.noResult}
          count={slicedResult.length}
          total={searchResult.length}
        />
        <div className="products">
          {slicedResult.map(p => (
            <Product product={p} key={p.id} />
          ))}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
