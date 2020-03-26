import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Text } from '..';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION =
    INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

const ProgressBar = (props) => {
    const {
        value,
        maxValue,
        width,
        height,
        filledColor,
        unfilledColor,
        animated,
        indeterminate,
        text,
        showText,
        textStyle,
        textProps,
        borderStyle,
        containerStyle,
        onComplete,
        ...rest
    } = props;

    const [widthValue, setWidth] = useState(0);
    const [progressValue] = useState(new Animated.Value(indeterminate ? INDETERMINATE_WIDTH_FACTOR : value));
    const [indeterminateValue] = useState(new Animated.Value(BAR_WIDTH_ZERO_POSITION));

    function handledOnLayout({ nativeEvent }) {
        setWidth(nativeEvent.layout.width);
    };

    /*function indeterminateAnimation() {
        Animated.timing(indeterminateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(x => {
            if(x.finished) {
                indeterminateAnimation();
            }
        });
    }*/

    useEffect(() => {
        if(indeterminate) {
            indeterminateAnimation();
        }
        else {
            const percentage = value / maxValue;
            //const percentage = indeterminate ? 0.3 : Math.min(Math.max(value, 0), 1)
            //setPercent(new Animated.Value(percentage))
            const rowWidth = Math.max(0, Math.floor(widthValue * percentage - borderStyle.borderWidth));
            //progressV = rowWidth
            if (animated) {
                Animated.timing(progressValue, {
                    toValue: rowWidth,
                    //duration: 1000
                }).start();
            }
            else {
                progressValue(rowWidth);
            }
            if (value >= maxValue) {
                onComplete();
            }
        }
    }, [value]);

    const ProgressBarStyle = {
        width: width,
        height: height,
        backgroundColor: unfilledColor,
        borderWidth: borderStyle.borderWidth,
        borderColor: borderStyle.borderColor,
        borderRadius: borderStyle.borderRadius,
        overflow: "hidden",
        justifyContent: "center"
    }

    return (
        <View onLayout={handledOnLayout} style={[ProgressBarStyle, containerStyle]} {...rest}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: filledColor, width: progressValue}]} />
            {showText ? 
                <Text style={[{textAlign: "center", color: "gray"}, textStyle]} {...textProps}>
                    {text ? text : value / maxValue *100 + "%"}
                </Text> 
            : null}
        </View>
    )
};

ProgressBar.propTypes = {
    value: PropTypes.number,
    maxValue: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    filledColor: PropTypes.string,
    unfilledColor: PropTypes.string,
    animated: PropTypes.bool,
    indeterminate: PropTypes.bool,
    text: PropTypes.string,
    showText: PropTypes.bool,
    textStyle: PropTypes.object,
    textProps: PropTypes.object,
    borderStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    onComplete: PropTypes.func
};

ProgressBar.defaultProps = {
    value: 0,
    maxValue: 100,
    width: 200,
    height: 20,
    filledColor: "blue",
    unfilledColor: "transparent",
    animated: true,
    indeterminate: false,
    text: "",
    showText: false,
    textStyle: {},
    borderStyle: { borderWidth: 1, borderColor: "blue", borderRadius: 30 },
    containerStyle: {},
    onComplete: () => {}
};

export default ProgressBar;