import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";


export class SingleQuestion extends React.Component {
    constructor() {
        super();

        this.state = {
            answer: null
        };
    }
    renderBool = (key) => {
        return [
            <RadioButton value={"Ja"} key={key + 'Ja'}>
                <Text style={styles.radioText}
                    key='ja'
                >Ja</Text>
            </RadioButton>,

            <RadioButton value={"Nee"} key={key + 'Nee'}>
                <Text style={styles.radioText} key='nee'>Nee</Text>
            </RadioButton>
        ];
    }
    renderOptions = (question, key) => {
        if (question.type === "boolean") {
            return [
                <RadioGroup
                    key={'radioBool-' + key}
                    onSelect={(index, answer) => {
                        this.setState({ answer: answer })
                        this.props.onSelect(index)
                    }}
                    selectedIndex={this.props.answer}
                >
                    {this.renderBool(key)}
                </RadioGroup >

            ];
        }
        else if (question.type == "slider") {
            return [
                <View style={{ padding: 10 }}>
                    {/* TODO: add HH:MM */}
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: .5, justifyContent: 'center' }}
                        onChangeText={(answer) => {
                            this.setState({ answer: answer })
                            this.props.onSelect(answer)
                        }}
                        defaultValue={this.props.answer}
                        keyboardType='numeric'
                    />
                </View>
            ];
        }
        else if (question.type == "mail") {
            return [
                <View style={{ padding: 10 }}>
                    {/* TODO: add HH:MM */}
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: .5, justifyContent: 'center' }}
                        onChangeText={(answer) => {
                            this.setState({ answer: answer })
                            this.props.onSelect(answer)
                        }}
                        defaultValue={this.props.answer}
                        keyboardType='email-address'
                    />
                </View>
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
                    {this.props.question.description}
                </Text>
            </View >

        }
    }
    render() {
        return (
            //style={{ flex: 1, padding: 12 }}
            <View key={this.props.keys.toString() + 'Question-view'} style={{
                flexDirection: 'column',
                flex: 0.8
            }}>
                <View key={this.props.keys + 'viewin'} style={styles.viewText}>

                    <Text style={{
                        fontSize: 16, fontWeight: "bold", color: "#3498db",
                    }}>
                        {this.props.question.question}
                    </Text>

                    {this.renderDescription()}
                    {this.renderOptions(this.props.question, this.props.keys)}
                </View >

            </View>
        );
    }
}

const styles = StyleSheet.create({
    radioText: {
        fontSize: 20
    },
    viewText: {
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
        flexShrink: 1,
    },
});