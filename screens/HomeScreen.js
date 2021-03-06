import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Question from '../components/Questions';

var questions = require('../questionData/questions1.json');

export default class HomeScreen extends React.Component {
  state = {
    questions: questions,
    currentQuestion: ["Q1"],
    answers: { "Q1": null },
    required: ["Q1"]
  }

  static navigationOptions = {
    header: null,
  };
  _renderSingleQ = (key, index) => {
    console.log('render single question key:' + key)
    console.log('type = ' + this.state.questions[key].type)
    return [
      <Question
        key={key + index}
        onSelect={answer => {
          this.onSelect(key, answer);
        }}
        index={index + 1}
        question={this.state.questions[key]}
        answer={this.state.answers[key]}
      />
    ];
  }
  checkIfAlreadyExist = (key) => {
    let result = true
    this.state.currentQuestion.forEach((item, index) => {
      if (key === item) {
        console.log(key + ' already in currentQuestions')
        result = false
      }
    });
    return result
  }
  addQuestionToState = (key) => {
    if (this.checkIfAlreadyExist(key)) {
      this.setState({
        required: [...this.state.required, key]
      });
      this.setState({
        currentQuestion: [...this.state.currentQuestion, key]
      });
      this.setState({
        answers:
        {
          ...this.answers,
          key: null
        }
      });
      console.log('added ' + key)
    }
  };

  _renderQuestions = () => {
    const result = [];
    console.log(this.state.currentQuestion)
    this.state.currentQuestion.forEach((key, index) => {
      result.push(this._renderSingleQ(key, index))
    })
    return result
  }

  onSelect = (index, answer) => {
    const question = questions[index];
    const id = question.id
    this.setState({
      ...this.answers,
      id: answer
    })

    // if ('Callback' in question) {
    //   if (answer in question.Callback) {
    //     let callbacks = question.Callback[answer]

    //     const delay = 50
    //     callbacks.forEach((key, index) => {
    //       if (index == 0) {
    //         this.addQuestionToState(key);
    //       }
    //       else {
    //         setTimeout(() => {
    //           this.addQuestionToState(key);
    //         }
    //           , delay * index)
    //         console.log('added ' + key + ' to futher changes w delay:' + delay * index)
    //       }
    //     })
    //   }
    // }

  };
  onSubmit = () => {
    let allGood = true
    this.state.required.forEach((item, index) => {
      console.log(item)
      if (this.state.answers[item] == null) {
        _index = index + 1
        Alert.alert('Vraag ' + _index + ' vergeten', 'Vult u alstublieft nog vraag ' + _index + ' in.')
        allGood = false
      }
    });
    if (allGood) {
      const { navigate } = this.props.navigation;
      navigate('Questions', {
        name: 'Jane',
        uri: this.state.uri,
      })
    }
  }

  render() {
    console.log('render')
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <Text style={{ fontSize: 16, color: "#666", textAlign: "right" }}>
            {this.props.progress * 100}%
        </Text>
          {this._renderQuestions()}


          <Button
            title="Submit Answser"
            onPress={() => {
              this.onSubmit();
            }}
          />
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
