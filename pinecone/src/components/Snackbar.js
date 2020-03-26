import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing, Platform } from 'react-native';
import { Text, Button } from '..';

const Snackbar = (props) => {
    const {
        visible,
        text,
        textStyle,
        backgroundColor,
        position,
        actionOnPress,
        actionText,
        actionTextStyle,
        actionStyle
    } = props;

    const [animation] = useState(new Animated.Value(-50));

    const durationValues = {
        visible: 225,
        inVisible: 195 
    }

    const positionValue = (
        position == "bottom" ? { marginBottom: animation, bottom: 0} : 
        position == "top" ? {marginTop: animation, top: 0} : null
    );

    useEffect(() => {
            Animated.timing(animation, {
                toValue: visible ? (Platform.OS === "android" ? 20 : 0) : -100,
                duration: visible ? durationValues.visible : durationValues.inVisible,
                easing: Easing.linear
            }).start();
    }, [visible]);

    return (
        <Animated.View style={[styles.Snackbar, positionValue]}>
            <View style={[styles.View, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.Text, textStyle]}>{text}</Text>
                <Button opacity={0.5} onPress={actionOnPress} title={actionText}
                    type="transparent" style={actionStyle} titleStyle={actionTextStyle} />
            </View>
        </Animated.View>
    )
};

Snackbar.propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.object,
    position: PropTypes.oneOf(["top", "bottom"]),
    actionOnPress: PropTypes.func,
    actionText: PropTypes.string,
    actionTextStyle: PropTypes.object,
    actionStyle: PropTypes.object,
};

Snackbar.defaultProps = {
    text: "",
    textStyle: {color: "#ffffffde", fontSize: 14},
    backgroundColor: "#000000dd",
    position: "bottom",
    actionOnPress: () => {},
    actionText: "ACTION",
    actionTextStyle: { color: "#BB86FC", fontSize: 14},
    actionStyle: {},
};

const styles = StyleSheet.create({
    Snackbar: {
        ...Platform.select({
            android: {
                width: "95%",
                alignSelf: "center"
            },
            default: { width: "100%" }
        }),
        position: "absolute"
    },
    View: {
        ...Platform.select({
            android: {
                borderRadius: 4,
                elevation: 3
            }
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
    },
    Text: {
        flex: 2,
        flexWrap: "wrap",
        alignContent: "stretch"
    }
});

export default Snackbar;