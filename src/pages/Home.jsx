import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getAllCategories } from "../api";
import { SimplePreloader } from "./Preloader";
import { CategoryList } from "./CategoryList";
import { Search } from "../components/Search";

function Home() {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    const { pathname, search } = useLocation();
    const { push } = useHistory();

    const handleSearch = (str) => {
        setFilteredCatalog(
            catalog.filter((item) =>
                item.strCategory.toLowerCase().includes(str.toLowerCase())
            )
        );
        // в момент запуска поиска меняем строку поиска
        push({
            pathname,
            search: `?search=${str}`,
        });
    };
    console.log(search);
    useEffect(() => {
        getAllCategories().then((data) => {
            setCatalog(data.categories);
            setFilteredCatalog(
                search
                    ? data.categories.filter((item) =>
                          item.strCategory
                              .toLowerCase()
                              .includes(search.split("=")[1].toLowerCase())
                      )
                    : data.categories
            );
        });
    }, [search]);

    return (
        <>
            <Search cb={handleSearch} />
            {!catalog.length ? (
                <SimplePreloader />
            ) : (
                <CategoryList catalog={filteredCatalog} />
            )}
        </>
    );
}

export { Home };
