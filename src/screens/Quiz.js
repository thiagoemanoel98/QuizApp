/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SIZES} from '../constants';
import {data} from '../data/QuizData';

export function Quiz() {
  const {heightDevice, widthDevice} = useWindowDimensions();

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setcurrentOptionSelected] = useState(null);
  const [correctOption, setcorrectOption] = useState(null);
  const [isOptionsDisabled, setisOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setshowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex].correct_option;
    setcurrentOptionSelected(selectedOption);
    setcorrectOption(correct_option);
    setisOptionsDisabled(true);

    if (selectedOption === correct_option) {
      // set score
      setScore(score + 1);
    }
    // show Next Button
    setshowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 === allQuestions.length) {
      //last question
      // show score modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setcurrentOptionSelected(null);
      setcorrectOption(null);
      setisOptionsDisabled(false);
      setshowNextButton(false);
    }

    let percentProgress = (currentQuestionIndex + 1) / allQuestions.length;

    setProgress(percentProgress);
  };

  const renderQuestion = () => {
    return (
      <View style={{marginVertical: 40}}>
        {/* Question counter */}
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: RFValue(16),
              opacity: 0.6,
              marginRight: 2,
            }}>
            {currentQuestionIndex + 1}
          </Text>
          <Text
            style={{color: COLORS.white, fontSize: RFValue(14), opacity: 0.6}}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            fontSize: RFValue(26),
          }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setcurrentOptionSelected(null);
    setcorrectOption(null);
    setisOptionsDisabled(false);
    setshowNextButton(false);

    setProgress(0);
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
            disabled={isOptionsDisabled}
            onPress={() => validateAnswer(option)}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option === correctOption
                  ? COLORS.success
                  : option === currentOptionSelected
                  ? COLORS.error
                  : COLORS.secondary + '40',
              backgroundColor:
                option === correctOption
                  ? COLORS.success + '20'
                  : option === currentOptionSelected
                  ? COLORS.error + '20'
                  : COLORS.secondary + '20',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: RFValue(16), color: COLORS.white}}>
              {option}
            </Text>

            {/* show check or cross  */}

            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: COLORS.white,
                    fontSize: RFValue(18),
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: COLORS.white,
                    fontSize: RFValue(18),
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: COLORS.white,
              textAlign: 'center',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(0);
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#00000020',
        }}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={12}
          color={COLORS.accent}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}>
        {/** Progress bar */}
        {renderProgressBar()}

        {/** Question */}
        {renderQuestion()}

        {/** Options */}
        {renderOptions()}

        {/** Next button */}
        {renderNextButton()}

        {/** Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(26),
                  color: COLORS.black,
                  fontWeight: 'bold',
                }}>
                {score > allQuestions.length / 2 ? 'Parabéns!' : 'Oops!'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: RFValue(26),
                    color:
                      score > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  }}>
                  {score}
                </Text>
                <Text style={{color: COLORS.black, fontSize: RFValue(16)}}>
                  / {allQuestions.length}
                </Text>
              </View>
              {/* Retry quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontSize: RFValue(16),
                  }}>
                  Tentar novamente
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/** Background image */}

        <Image
          source={require('../assets/images/DottedBG.png')}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
