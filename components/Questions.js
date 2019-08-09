import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  findNodeHandle,
} from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

var RCTUIManager = require("NativeModules").UIManager;

export class SingleQuestion extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null,
    };
  }
  renderBool = key => {
    return [
      <RadioButton value={"Ja"} key={key + "Ja"}>
        <Text style={styles.radioText} key="ja">
          Ja
        </Text>
      </RadioButton>,

      <RadioButton value={"Nee"} key={key + "Nee"}>
        <Text style={styles.radioText} key="nee">
          Nee
        </Text>
      </RadioButton>,
    ];
  };
  onInputFocus(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        20, // additionalOffset
        true,
      );
    }, 100);
  }

  resetWindowHeight() {
    let scrollView = this.refs.scrollView;
    let screenHeight = Dimensions.get("window").height;
    setTimeout(() => {
      RCTUIManager.measure(scrollView.getInnerViewNode(), (...data) => {
        // data[3] is the height of the ScrollView component with content.
        scrollView.scrollTo({ y: data[3] - screenHeight, animated: true });
      });
    }, 100);
  }
  renderOptions = (question, key) => {
    if (question.type === "boolean") {
      return [
        <RadioGroup
          key={"radioBool-" + key}
          onSelect={(index, answer) => {
            this.setState({ answer: answer });
            this.props.onSelect(index);
          }}
          selectedIndex={this.props.answer}
        >
          {this.renderBool(key)}
        </RadioGroup>,
      ];
    } else if (question.type == "slider") {
      return [
        <View style={{ padding: 10 }}>
          {/* TODO: add HH:MM */}
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 0.5,
              justifyContent: "center",
            }}
            ref="num_input"
            onFocus={this.onInputFocus.bind(this, "num_input")}
            onBlur={this.resetWindowHeight.bind(this)}
            onChangeText={answer => {
              this.setState({ answer: answer });
              this.props.onSelect(answer);
            }}
            defaultValue={this.props.answer}
            keyboardType="numeric"
          />
        </View>,
      ];
    } else if (question.type == "mail") {
      return [
        <View style={{ padding: 10 }}>
          {/* TODO: add HH:MM */}
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 0.5,
              justifyContent: "center",
            }}
            onChangeText={answer => {
              this.setState({ answer: answer });
              this.props.onSelect(answer);
            }}
            defaultValue={this.props.answer}
            keyboardType="email-address"
          />
        </View>,
      ];
    } else if (question.type == "text") {
      return [
        <View style={{ padding: 10 }}>
          {/* TODO: add HH:MM */}
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 0.5,
              justifyContent: "center",
            }}
            ref="text_input"
            onFocus={this.onInputFocus.bind(this, "text_input")}
            onBlur={this.resetWindowHeight.bind(this)}
            onChangeText={answer => {
              this.setState({ answer: answer });
              this.props.onSelect(answer);
            }}
            defaultValue={this.props.answer}
            // keyboardType="email-address"
          />
        </View>,
      ];
    }
  };
  renderDescription = () => {
    if ("description" in this.props.question) {
      return (
        <View
          key={"description-" + this.props.key}
          style={{ flexDirection: "row", flex: 1, paddingHorizontal: 10 }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#5b6a75",
              flexWrap: "wrap",
            }}
          >
            {this.props.question.description}
          </Text>
        </View>
      );
    }
  };
  render() {
    return (
      <View key={this.props.keys.toString() + "Question-view"}>
        <ScrollView keyboardDismissMode="on-drag" ref="scrollView">
          <View key={this.props.keys + "viewin"} style={styles.viewText}>
            <Text style={styles.questionText}>
              {this.props.question.question}
            </Text>
          </View>
          <View>
            {this.renderDescription()}
            {this.renderOptions(this.props.question, this.props.keys)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioText: {
    fontSize: 20,
  },
  viewText: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 10,
    // flexShrink: 1,
    // flexShrink: 1,
  },
  questionText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#3498db",
    // flexShrink: 1,
    flexWrap: "wrap",
  },
});
