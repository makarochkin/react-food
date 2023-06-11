import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFilteredCategory } from "../api";
import { useState, useEffect } from "react";
import { SimplePreloader } from "./Preloader";
import { MealList } from "./MealList";

function Category() {
    const { name } = useParams();
    const [meals, setcategory] = useState([]);
    const { goBack } = useHistory();

    useEffect(() => {
        getFilteredCategory(name).then((data) => {
            setcategory(data.meals);
        });
    }, [name]);

    return (
        <>
            <button
                className="btn"
                onClick={goBack}
            >
                Go back
            </button>
            {!meals.length ? <SimplePreloader /> : <MealList meals={meals} />}
        </>
    );
}

export { Category };
