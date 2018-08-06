import React from "react";
import CatButton from "../CatButton";

const GameGrid = (props) => (

<div id="game-grid" className="container justify-content-center">
    {props.cats.map((cat) => (
        <CatButton key={cat.id} id={cat.id} clickCat={props.clickCat}></CatButton>
    ))}
</div>
);

export default GameGrid;