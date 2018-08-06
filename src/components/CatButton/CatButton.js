import React from "react";

class CatButton extends React.Component {
   
    state = {
        id: this.props.id,
        clicked: false
    };

    render() {
        return (
            <div className="cat-button float-left" key={this.props.id} >
                <img className="cat-image" id={this.props.id} alt={"cat" + this.props.id} src={"assets/img/cat" + this.props.id + ".jpg"} onClick={this.props.clickCat}/>
            </div>
        );
    }
};

export default CatButton;