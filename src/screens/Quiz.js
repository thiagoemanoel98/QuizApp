/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SIZES} from '../constants';
import {data} from '../data/QuizData';

export function Quiz() {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setcurrentOptionSelected] = useState(null);
  const [correctOption, setcorrectOption] = useState(null);
  const [isOptionsDisabled, setisOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setcurrentOptionSelected(selectedOption);
    setcorrectOption(correct_option);
    setisOptionsDisabled(true);

    if (selectedOption === correctOption) {
      // set score
      setScore(score + 1);
    }
    // show Next Button
  };

  const renderQuestion = () => {
    return (
      <View>
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

        {/** Question */}
        {renderQuestion()}

        {/** Options */}
        {renderOptions()}

        {/** Next button */}

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
