import React from "react";
import {
    Text,
} from "react-native";


export class SingleQuestion extends React.Component {

    render() {
        console.log('render question key:' + this.props.keys)
        return [
            <Text key={this.props.keys}>{this.props.keys}</Text>
        ]
    };
}