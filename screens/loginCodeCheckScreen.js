import React, { Component } from "react";
import {
  // Button,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FileSystem,
  Image,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";

import { UploadLoginCode } from "../components/uploadJson";
import { SingleQuestion } from "../components/Questions";

export default class loginCodeCheckScreen extends Component {
  static navigationOptions = () => {
    return {
      title: "Bedrijfs code",
      headerBackTitle: null,
      headerTitleStyle: { width: Dimensions.get("window").width },
    };
  };
  state = {
    Q1: null,
    wait: false,
  };

  _prepForAnswer = (key, index, questions) => {
    var answer = null;
    if (!key in this.state) {
      this.setState((state, props) => ({
        [key]: null,
      }));
      console.log("added " + key);
    } else {
      answer = this.state[key];
    }
    return answer;
  };
  _renderSingleQ = (key, index, questions) => {
    console.log("render single question key:" + key);
    let answer = this._prepForAnswer(key, index, questions);
    return [
      <View key={"view-" + key.toString() + "-" + index.toString()}>
        <SingleQuestion
          key={"sq-" + key.toString() + "-" + index.toString()}
          keys={key + "-" + index}
          onSelect={answer => {
            this.onSelect(key, answer);
          }}
          index={index}
          question={questions[key]}
          answer={answer}
        />
      </View>,
    ];
  };
  _loadQuestions = () => {
    return {
      logincode: {
        question: "Wat is de login code van uw bedrijf?",
        description: "Geen inlog codes? Mail naar ergofeedbackai@gmail.com.",
        // TODO email link
        type: "text",
      },
    };
  };
  renderQuestions = () => {
    questions = this._loadQuestions();
    const result = [];
    var i = 1;
    Object.keys(questions).forEach(key => {
      result.push(this._renderSingleQ(key, i, questions));
      i++;
    });
    return result;
  };
  onSelect = async (key, answer) => {
    console.log("selected " + answer + " for " + key);
    this.setState({
      [key]: answer,
    });
  };
  _get_req = question => {
    let r = true;
    if ("req" in question) {
      r = question.req;
    }
    console.log("get_req", r == true);
    return r == true;
  };
  onSubmit = async () => {
    this.setState({
      wait: true,
    });
    console.log("submit");
    questions = this._loadQuestions();
    let allGood = true;
    var i = 1;
    let _quest = [];
    let answers = [];
    let keys = [];

    Object.keys(questions).forEach(key => {
      if (this._get_req(questions[key]) && this.state[key] == null && allGood) {
        console.log(
          this._get_req(questions[key]),
          this.state[key] == null,
          allGood,
        );
        Alert.alert(
          "Vraag " + i + " vergeten",
          "Vult u alstublieft nog vraag " + i + " in.",
        );
        allGood = false;
        return;
      } else if (allGood) {
        answers.push(this.state[key]);
        _quest.push(questions[key]);
        keys.push(key);
      }
      i++;
    });
    if (allGood) {
      await this._nextScreen(answers, _quest, keys);
    }
    this.setState({
      wait: false,
    });
  };

  _nextScreen = async (answers, _quest, keys) => {
    await UploadLoginCode(answers[0]);
    console.log("toward new screen: q_1");
    this.props.navigation.navigate("q_1");
  };

  renderbutton = () => {
    if (this.state.wait) {
      return <Button title="Volgende" loading />;
    } else {
      return (
        <Button
          title="Volgende"
          onPress={() => {
            this.onSubmit();
          }}
        />
      );
    }
  };
  render() {
    console.log("--- QuestionsScreenPage ---");
    console.log("render");
    return [
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View>{this.renderQuestions()}</View>
          {this.renderbutton()}
          <View
            style={{
              padding: 15,
              backgroundColor: "white",
              margin: 5,
            }}
          />
        </ScrollView>
      </View>,
    ];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  navigationFilename: {
    marginTop: 5,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
});
