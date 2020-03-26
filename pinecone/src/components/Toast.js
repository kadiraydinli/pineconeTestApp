import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Text } from '..';

const Toast = React.forwardRef((props, ref) => {
    const {
        text,
        textStyle,
        duration,
        backgroundColor,
        position,
        borderRadius,
        childRef,
        ...rest
    } = props;

    const durationValues = {
        short: 3000,
        long: 7000
    }

    const [animation] = useState(new Animated.Value(0));
    const [timer] = useState(new Animated.Value(0));

    function renderText(text) {
        alert(ref);
    }

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300
        }).start();
    }, [text])

    return (
        <Animated.View style={{ opacity: animation, marginLeft: 20, marginRight: 20, top: 0, alignItems: "center", 
            position: "absolute", backgroundColor: backgroundColor, borderRadius: borderRadius, padding: 12, paddingLeft: 20, paddingRight: 20}}>
            <Text style={textStyle}>{text}</Text>
        </Animated.View>
    )
});

Toast.propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.object,
    duration: PropTypes.oneOf(["short", "long"]),
    backgroundColor: PropTypes.string,
    position: PropTypes.oneOf(["top", "center", "bottom"]),
    borderRadius: PropTypes.number
};

Toast.defaultProps = {
    text: "",
    textStyle: {color: "#ffffffde"},
    duration: "short",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    position: "bottom",
    borderRadius: 70
};

export default Toast;