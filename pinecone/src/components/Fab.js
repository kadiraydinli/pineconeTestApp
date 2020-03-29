import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text, Icon } from '..';

const Fab = (props) => {
    const {
        size,
        active,
        position,
        label,
        backgroundAnimation,
        backgroundAnimationColor,
        backgroundColor,
        offset, //{x: 60, y: 60}
        text,
        textStyle,
        icon, //{name, color, size, type, props}
        onPress,
        actions /*actions=[{icon: "home", iconColor, iconSize, iconType, iconProps, backgroundColor, label, text, textStyle, onPress }]*/
    } = props;

    const [animation] = useState(new Animated.Value(0));
    const [activeAnimation] = useState(new Animated.Value(0));
    const [toValue, setToValue] = useState(false);

    const STYLES = {
        button: {
            ...styles.button, width: size,
            height: size, borderRadius: size / 2, backgroundColor: backgroundColor
        },
        other: {
            backgroundColor: "#fff",
            width: size / 1.25,
            height: size / 1.25,
            borderRadius: size / 2,
        },
        background: {
            backgroundColor: backgroundAnimationColor,
            flex: 1,
            position: "absolute",
            width: size,
            height: size,
            borderRadius: 30,
            transform: [{
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30]
                })
            }]
        }
    }

    const positionValues = (
        position === "left" ? { bottom: offset.y, left: offset.x } :
            position === "center" ? { bottom: offset.y } :
                position === "right" ? { bottom: offset.y, right: offset.x } : { bottom: offset.y, right: offset.x }
    )

    const activeStyle = {
        opacity: activeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    }

    useEffect(() => {
        if (!active) {
            setToValue(false)
        }
        /*Animated.timing(activeAnimation, {
            toValue: active,
            duration: 200,
            useNativeDriver: false
        }).start();*/
    }, [active]);

    const labelStyle = {
        textAlign: position === "left" ? "left" : "right",
        opacity: animation.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0, 1]
        }),
        transform: [{
            translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-0, (position === "left" ? 1 : -1) * 110]
            })
        }]
    };

    function toggleOpen() {
        const value = toValue ? 0 : 1;
        //alert(JSON.stringify(icon))
        Animated.timing(animation, {
            toValue: value,
            duration: 400,
            useNativeDriver: true
        }).start();

        setToValue(!toValue);
    }

    return (
        active ? <View style={[styles.Fab, positionValues]}>
            {backgroundAnimation ? <Animated.View style={[STYLES.background]} /> : null}
            {!onPress ? actions.map((value, i) => (
                <TouchableWithoutFeedback key={i} onPress={value.onPress}>
                    <Animated.View style={[STYLES.button, STYLES.other, {
                        transform: [{ scale: animation },
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -size * 75 / 60 + (-size * i++)]
                            })
                        }]
                    },
                    { backgroundColor: !value.backgroundColor ? "white" : value.backgroundColor }]}>
                        <Animated.Text style={[styles.label, labelStyle]}>{value.label}</Animated.Text>
                        {value.text ? (
                            <Text style={value.textStyle}>{value.text}</Text>
                        ) : (<Icon name={value.icon} color={value.iconColor} size={value.iconSize}
                            type={value.iconType} {...value.iconProps} />)}
                    </Animated.View>
                </TouchableWithoutFeedback>
            )) : null}
            <TouchableWithoutFeedback onPress={onPress ? onPress : toggleOpen}>
                <View style={[STYLES.button]}>
                    <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
                    {text ? (
                        <Text style={textStyle}>{text}</Text>
                    ) : icon ? (<Icon name={icon.name} color={icon.color}
                        size={icon.size} type={icon.type} {...icon.props} />) : null}
                </View>
            </TouchableWithoutFeedback>
        </View> : null
    )
};

Fab.propTypes = {
    size: PropTypes.number,
    active: PropTypes.bool,
    position: PropTypes.oneOf(["left", "center", "right"]),
    label: PropTypes.string,
    backgroundAnimation: PropTypes.bool,
    backgroundAnimationColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    offset: PropTypes.object,
    text: PropTypes.string,
    textStyle: PropTypes.object,
    icon: PropTypes.object,
    onPress: PropTypes.func,
    actions: PropTypes.array
};

Fab.defaultProps = {
    size: 60,
    active: true,
    position: "right",
    backgroundAnimation: true,
    backgroundAnimationColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    offset: { x: 60, y: 60 }
};

const styles = StyleSheet.create({
    Fab: {
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        ...Platform.select({
            android: { elevation: 2 },
            default: {
                shadowColor: "#333",
                shadowOpacity: 0.1,
                shadowOffset: { x: 2, y: 0 },
                shadowRadius: 2
            }
        }),
    },
    label: {
        width: 130,
        color: "#fff",
        position: "absolute",
        fontSize: 18,
        backgroundColor: "transparent"
    }
});

export default Fab;