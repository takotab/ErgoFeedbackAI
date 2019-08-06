import React from "react";
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
} from "react-native";
import { Button } from "react-native-elements";

import { UploadAnswersAsync } from "../components/uploadJson";
import { SingleQuestion } from "../components/Questions";

export default class QuestionsScreenPage extends React.Component {
  static navigationOptions = {
    // headerTitleStyle: { alignSelf: "center", fontSize: 20 },
    headerTitle: "Vragen",
  };
  state = {
    Q1: null,
    wait: false,
  };
  _page = () => {
    const { navigation } = this.props;
    return navigation.getParam("page", "");
  };
  _loadQuestionsJson = () => {
    let questions = Object();
    all_questions = require("../assets/questions/questions.json");
    Object.keys(all_questions).forEach(key => {
      if (all_questions[key].page == this._page()) {
        // console.log(key, all_questions[key]);
        questions[key] = all_questions[key];
        // this.setState((state, props) => ({
        // [key]: all_questions[key],
        // }));
      }
    });
    return questions;
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
    // if (this.state[key] == null && !questions[key].req) {
    //   this.setState((state, props) => ({
    //     [key]: null,
    //   }));
    //   answer = questions[key].answer;
    //   console.log("added default " + key + "  " + answer);
    // }
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

  renderQuestions = () => {
    questions = this._loadQuestionsJson();
    const result = [];
    var i = 1;
    Object.keys(questions).forEach(key => {
      result.push(this._renderSingleQ(key, i, questions));

      i++;
    });
    // console.log("result", result);
    return result;
  };
  onSelect = async (key, answer) => {
    console.log("selected " + answer + " for " + key);
    this.setState({
      [key]: answer,
    });
  };

  onSubmit = async () => {
    this.setState({
      wait: true,
    });
    questions = this._loadQuestionsJson();
    let allGood = true;
    var i = 1;
    let _quest = [];
    let answers = [];
    console.log(questions);
    while (i < 50) {
      if ("Q" + i in questions) {
        if (this.state["Q" + i] == null && !questions["Q" + i].req) {
          Alert.alert(
            "Vraag " + i + " vergeten",
            "Vult u alstublieft nog vraag " + i + " in.",
          );
          allGood = false;
          i = 101;
        } else {
          answers.push(this.state["Q" + i]);
          _quest.push(questions["Q" + i]);
        }
        i++;
      } else {
        i = 101;
      }
    }
    if (allGood) {
      var page = parseInt(this._page());
      await UploadAnswersAsync(answers, _quest, page, (temp = false));
      page = page + 1;
      console.log("toward new screen: " + page);
      this.props.navigation.navigate("q_" + page.toString());
      
    }
    this.setState({
      wait: false,
    });
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
    console.log(this._page());
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
