import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMealById } from "../api";
import { SimplePreloader } from "./Preloader";

import React from "react";

function Recipe() {
    const { id } = useParams();
    const [recipe, setMeal] = useState({});
    const { goBack } = useHistory();

    useEffect(() => {
        getMealById(id).then((data) => {
            setMeal(data.meals[0]);
        });
    }, [id]);

    return (
        <>
            {!recipe.idMeal ? (
                SimplePreloader
            ) : (
                <div className="recipe">
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                    />
                    <h1 className="card-title">{recipe.strMeal}</h1>
                    <h6 className="card-title">
                        Category: {recipe.strCategory}
                    </h6>
                    {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
                    <p> {recipe.strInstructions}</p>

                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Object.keys(recipe).map((key) => {
                                if (key.includes("Ingredient") && recipe[key]) {
                                    return (
                                        <tr key={key}>
                                            <td>{recipe[key]}</td>
                                            <td>
                                                {
                                                    recipe[
                                                        `strMeasure${key.slice(
                                                            13
                                                        )}`
                                                    ]
                                                }
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>

                    {recipe.strYoutube ? (
                        <div className="row">
                            <h5 style={{ margin: "2rem 0 1.5rem" }}>
                                Video recipe
                            </h5>

                            <iframe
                                title={id}
                                src={`https://youtube.com/embed/${recipe.strYoutube.slice(
                                    -11
                                )}`}
                                allowFullScreen
                            />
                        </div>
                    ) : null}
                </div>
            )}
            <button
                className="btn"
                onClick={goBack}
            >
                Go back
            </button>
        </>
    );
}

export { Recipe };
