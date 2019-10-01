import React, { Component } from 'react'

export class ListItem extends Component {
    render() {
        return (
            <div className="ListItem">
                <li key={this.props.key}>
                    <p className="listName">{this.props.name}</p>
                    <p className="listFood">{this.props.food}</p>
                    <button className="removeButton" onClick={() => this.props.removeItem(this.props.id)}>
                        Remove
                    </button>
                </li> 

            </div>
        )
    }
}

export default ListItem
