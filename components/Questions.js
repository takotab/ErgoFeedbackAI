import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import Slider from '@react-native-community/slider';

export default class Question extends React.Component {
    constructor() {
        super();

        this.state = {
            answer: null
        };
    }
    renderBool = (question) => {
        return [
            <RadioButton value={"Ja"} key={question.id + 'Ja'}>
                <Text style={styles.radioText}>Ja</Text>
            </RadioButton>,

            <RadioButton value={"Nee"} key={question.id + 'Nee'}>
                <Text style={styles.radioText}>Nee</Text>
            </RadioButton>
        ];
    }
    renderOptions = question => {
        if (question.type === "boolean") {
            return [
                <RadioGroup
                    onSelect={(index, answer) => {
                        this.setState({ answer: answer })
                        this.props.onSelect(answer)
                    }}
                    selectedIndex={this.props.answer}
                    key={'radioBool' + question.id}
                >
                    {this.renderBool(question)}
                </RadioGroup >

            ];
        }
        else if (question.type == "slider") {
            console.log('render slider')
            return [
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={6 * 60}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    step={15}
                    value={this.props.answer}
                    onValueChange={(answer) => {
                        this.setState({ answer: answer })
                        this.props.onSelect(answer)
                    }}
                />
            ];
        }

    };
    renderDescription = () => {
        if ('description' in this.props.question) {
            return <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text style={{
                    fontSize: 14, color: "#5b6a75",
                    flexWrap: 'wrap'
                }}>
                    {'\t\t'}{this.props.question.description}
                </Text>
            </View >

        }
    }
    render() {
        return (
            //style={{ flex: 1, padding: 12 }}
            <View style={{
                flexDirection: 'column',
                flex: 0.8
            }}>
                <View style={styles.viewText}>

                    <Text style={{
                        fontSize: 16, fontWeight: "bold", color: "#3498db",
                    }}>
                        {this.props.index}) {this.props.question.question}
                    </Text>
                </View >

                {this.renderDescription()}
                {this.renderOptions(this.props.question)}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    radioText: {
        fontSize: 20
    },
    viewText: {
        flexDirection: "column",

    },
    textQuestion: {
        flexWrap: 'wrap'

    }

});