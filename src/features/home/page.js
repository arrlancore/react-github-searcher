import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { searchGithub } from "./search-slice";
import Spinner from "components/spinner";
import ErrorMessage from "components/error-message";
import debounce from "lodash.debounce";
import { renderComponentIf } from "lib/render";
import Pagination from "./components/pagination";
import Search from "./components/search";
import { GridContent, GridItem } from "./components/grid";
import { Item } from "./components/item";

const Container = styled.div`
  padding: 16px;
`;

const EmptyContent = styled.div`
  padding: 20px 8px;
  font-size: 14px;
  color: #888;
`;

const Home = () => {
  const defaultType = "users";
  const pageSize = 9;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(defaultType);
  const dispatch = useDispatch();

  const key = `${query}_${type}_${page}_${pageSize}`;
  const data = useSelector((state) => state.search.data[key]);
  const totalPages = useSelector((state) => state.search.totalPages);
  const loadingStatus = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  const isLoading = loadingStatus === "loading";

  const params = { page, pageSize, type, query };

  const debouncedSearch = debounce((value) => {
    dispatch(searchGithub({ ...params, query: value }));
  }, 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset page
    if (e.target.value.trim()) {
      debouncedSearch(e.target.value);
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1); // Reset page
    dispatch(searchGithub({ ...params, type: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(searchGithub({ ...params, page: newPage }));
  };

  return (
    <Container>
      <Search
        query={query}
        type={type}
        handleInputChange={handleInputChange}
        handleTypeChange={handleTypeChange}
        defaultType={defaultType}
      />

      {renderComponentIf(isLoading)(<Spinner />)}
      {renderComponentIf(error && query && !isLoading)(
        <ErrorMessage message={error} />
      )}

      <GridContent>
        {data?.items?.map((item) => (
          <GridItem key={item.id}>
            <Item type={type} data={item} />
          </GridItem>
        ))}
      </GridContent>

      {renderComponentIf(data?.items.length === 0)(
        <EmptyContent>{`There are no result for keyword "${query}"`}</EmptyContent>
      )}
      {renderComponentIf(!query)(
        <EmptyContent>Type some keywords on search input</EmptyContent>
      )}
      {renderComponentIf(data?.items.length && !error)(
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => handlePageChange(newPage)}
        />
      )}
    </Container>
  );
};

export default Home;
