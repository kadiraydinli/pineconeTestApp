import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, Platform } from 'react-native';
import { Text, Icon } from '..';
import Colors from '../config/Colors';

const Button = (props) => {
    const {
        title,
        titleStyle,
        type,
        loading,
        loadingStyle,
        disabled,
        leftIcon, //{name, color, size, type, onPress}
        rightIcon, //{name, color, size, type, onPress}
        onPress,
        onLongPress,
        onLongPressIn,
        onLongPressOut,
        shadow,
        opacity,
        Component = onLongPress ? TouchableHighlight : TouchableOpacity,
        color,
        underlayColor,
        size,
        primary,
        success,
        info,
        warning,
        danger,
        style
    } = props;

    const selected = (
        StyleSheet.flatten([primary && { backgroundColor: Colors.primary }, success && { backgroundColor: Colors.success },
        info && { backgroundColor: Colors.info }, warning && { backgroundColor: Colors.warning },
        danger && { backgroundColor: Colors.danger }])
    );

    const shadowValue = (
        typeof shadow === 'number' ? {
            ...Platform.select({
                android: { elevation: shadow },
                default: { shadowOffSet: { 1: 1 } }
            })
        } : typeof shadow === 'boolean' ? styles.shadow : null
    )

    let STYLES = {
        button: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
            backgroundColor: color
        },
        outline: {
            backgroundColor: "transparent",
            borderColor: color,
            borderWidth: 1
        },
    }

    return (
        <Component disabled={disabled} style={StyleSheet.flatten([STYLES.button,
        type == "default" && styles.default, type == "transparent" && styles.transparent,
        type == "outline" && STYLES.outline, type == "rounded" && styles.rounded,
        size == "small" && styles.small, size == "medium" && styles.medium,
        size == "large" && styles.large, shadowValue, selected, style
        ])} onPress={!loading ? onPress : null}
            onLongPress={!loading ? onLongPress : null} onShowUnderlay={onLongPressIn}
            onHideUnderlay={onLongPressOut} activeOpacity={opacity} underlayColor={underlayColor}>
            {loading ? (
                <ActivityIndicator {...loadingStyle} animating={true} />
            ) : (
                    <>
                        {leftIcon &&
                            <Icon name={leftIcon.name} color={leftIcon.color ? leftIcon.color : "white"} size={leftIcon.size}
                                type={leftIcon.type} style={{ right: 5 }} />}
                        <Text style={StyleSheet.flatten([{ color: "white" },
                        size == "small" && styles.smallText,
                        size == "medium" && styles.mediumText,
                        size == "large" && styles.largeText,
                        type == "outline" && { color: color },
                        type == "transparent" && { color: color }, titleStyle])}>{title}</Text>
                        {rightIcon && <Icon name={rightIcon.name} color={rightIcon.color ? rightIcon.color : "white"} size={rightIcon.size}
                            type={rightIcon.type} style={{ left: 5 }} />}
                    </>
                )}
        </Component>
    )
};

Button.propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    type: PropTypes.oneOf(["default", "transparent", "outline", "rounded"]),
    loading: PropTypes.bool,
    loadingStyle: PropTypes.object,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onLongPressIn: PropTypes.func,
    onLongPressOut: PropTypes.func,
    shadow: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    opacity: PropTypes.number,
    color: PropTypes.string,
    underlayColor: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    primary: PropTypes.bool,
    success: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    style: PropTypes.object
};

Button.defaultProps = {
    title: '',
    titleStyle: {},
    type: "default",
    loading: false,
    loadingStyle: {},
    disabled: false,
    shadow: 0,
    opacity: 0.8,
    color: "blue",
    underlayColor: "#DCDCDC",
    size: "medium",
    primary: false,
    success: false,
    info: false,
    warning: false,
    danger: false,
    style: {}
};

const styles = StyleSheet.create({
    shadow: {
        ...Platform.select({
            android: {
                elevation: 1
            },
            default: {
                shadowOffSet: { 1: 1 }
            }
        })
    },
    default: {
    },
    transparent: {
        backgroundColor: "transparent"
    },
    /*outline: {
        backgroundColor: "transparent",
        borderColor: "blue",
        borderWidth: 1
    },*/
    rounded: {
        borderRadius: 30,
        padding: 15
    },
    small: { padding: 8 },
    smallText: { fontSize: 14 },
    medium: { padding: 10 },
    mediumText: { fontSize: 16 },
    large: { padding: 15 },
    largeText: { fontSize: 20 }
});

export default Button;