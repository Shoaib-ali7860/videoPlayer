import React from 'react';
import {View, TouchableOpacity, StyleSheet,Text} from 'react-native';
import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  VideoNext,
  VideoSkipForward,
} from '../assets/icons';

interface Props {
  playing: boolean;
  showPreviousAndNext: boolean;
  showSkip: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onPlay: () => void;
  onPause: () => void;
  skipForwards?: () => void;
  skipBackwards?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const PlayerControls: React.FC<Props> = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}>
        <VideoPrevious />
      </TouchableOpacity>
    )}

    {showSkip && (
      <TouchableOpacity style={[styles.touchable,{backgroundColor:'rgba(255,255,255,0.5)'}]} onPress={skipBackwards}>
     <Text>Back</Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={[styles.touchable,{backgroundColor:'rgba(255,255,255,0.5)'}]}
      onPress={playing ? onPause : onPlay}>
      {playing ?<Text>Pause</Text>: <Text>Play</Text>}
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity style={[styles.touchable,{backgroundColor:'rgba(255,255,255,0.5)'}]} onPress={skipForwards}>
      <Text>Skip</Text>
      </TouchableOpacity>
    )} 

     {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled,{backgroundColor:'rgba(255,255,255,0.5)'}]}
        onPress={onNext}
        disabled={nextDisabled}>
       <Text >Next</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});
