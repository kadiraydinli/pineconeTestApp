import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import { Text, IconButton } from '..';

const Input = (props) => {
    const {
        type,
        label,
        labelColor,
        labelStyle,
        value,
        onChangeText,
        placeholder,
        selectionColor,
        backgroundColor,
        helperText,
        helperTextStyle,
        errorText,
        errorTextStyle,
        characterCounter,
        maxLength,
        disabled,
        disabledColor,
        iconLeft, //{name, color, size, type, onPress}
        iconRight, //{name, color, size, type, onPress}
        ...rest
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const [animation] = useState(new Animated.Value(0));

    const editedLabel = label.length >= 40 ? label.substring(0, 39) + "...   " : label

    const editedColor = !disabled ? (errorText ? "#b00020ff" : labelColor) : disabledColor

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isFocused || value != '' ? 1 : 0,
            duration: 200
        }).start();
    }, [isFocused]);

    handleFocus = () => {
        if (disabled || !props.editable) return;
        setIsFocused(true)
    };
    handleBlur = () => {
        if (disabled || !props.editable) return;
        setIsFocused(false)
    };

    const labelPosition = {
        position: "absolute",
        left: iconLeft ? (type === "outlined" && isFocused ? 12 : 36) : 12,
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [13, type === "outlined" ? -12 : 0]
        })
    };

    const outlinedStyle = {
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14]
        }),
        color: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["#aaa", editedColor]
        }),
    };

    const selectionType = (
        type === "outlined" ? {
            borderRadius: 4,
            borderWidth: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2]
            }),
            borderColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['#7F7F7F', editedColor]
            })
        } : {
                borderBottomWidth: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2]
                }),
                borderBottomColor: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#7F7F7F', editedColor]
                })
            }
    )

    return (
        <View style={[styles.Container]}>
            <Animated.View style={[selectionType, { paddingTop: 5, backgroundColor: backgroundColor }]}>
                <Animated.View style={labelPosition}>
                    {(type === "outlined" && (isFocused || value.length != 0) && label.length != 0) &&
                        <View style={[styles.labelBackground, { backgroundColor: backgroundColor == "transparent" ? "white" : backgroundColor }]} />
                    }
                    <Animated.Text style={[outlinedStyle, labelStyle]}>
                        {editedLabel}
                    </Animated.Text>
                </Animated.View>
                <View style={styles.body}>
                    {iconLeft && <IconButton name={iconLeft.name} color={!disabled ? (errorText ? editedColor : iconLeft.color) : disabledColor} privateSize={24} size={24}
                        type={iconLeft.type} onPress={iconLeft.onPress} />}
                    <TextInput
                        {...rest}
                        placeholder={!isFocused ? "" : placeholder}
                        backgroundColor="transparent"
                        style={[styles.input, disabled && { color: disabledColor }]}
                        value={(!disabled || props.editable) && value}
                        onChangeText={(!disabled || props.editable) && onChangeText}
                        editable={!disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        maxLength={maxLength}
                        blurOnSubmit
                    />
                    {iconRight && <IconButton name={iconRight.name} color={!disabled ? (errorText ? editedColor : iconRight.color) : disabledColor} privateSize={24} size={24}
                        type={iconRight.type} onPress={iconRight.onPress} />}
                </View>
            </Animated.View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 12, paddingRight: 8 }}>
                <Text style={[{ color: !disabled ? (errorText ? "#b00020ff" : "#000") : disabledColor }, helperTextStyle, errorTextStyle]}>{helperText || errorText}</Text>
                {characterCounter && <Text>{value.length} / {maxLength}</Text>}
            </View>
        </View>
    )
};

Input.propTypes = {
    type: PropTypes.oneOf(["filled", "outlined"]),
    label: PropTypes.string,
    labelColor: PropTypes.string,
    labelStyle: PropTypes.object,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    selectionColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    helperText: PropTypes.string,
    helperTextStyle: PropTypes.object,
    errorText: PropTypes.string,
    errorTextStyle: PropTypes.object,
    characterCounter: PropTypes.bool,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    disabledColor: PropTypes.string,
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
};

Input.defaultProps = {
    type: "filled",
    label: "",
    labelColor: "blue",
    selectionColor: "blue",
    backgroundColor: "transparent",
    characterCounter: false,
    disabled: false,
    disabledColor: "#B3B3B3",
    editable: true
};

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        padding: 5,
    },
    body: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 12
    },
    input: {
        flex: 1,
        minHeight: 40,
        fontSize: 18,
        color: '#000'
    },
    labelBackground: {
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom: 0
    }
});

export default Input;