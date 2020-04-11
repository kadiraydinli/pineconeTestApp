import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from "..";

const CheckBox = (props) => {
    const {
        iconType,
        iconSize,
        iconProps,
        checked,
        text,
        textLeft,
        textColor,
        textStyle,
        textProps,
        onPress,
        color,
        checkedColor,
        uncheckedColor,
        checkedIcon,
        uncheckedIcon,
        disabled
    } = props;

    const CONTAINER = {
        flexDirection: textLeft ? "row-reverse" : "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? .3 : 1,
        padding: 5
    };

    const ICON_STYLE = {
        width: iconSize * 1.5,
        height: iconSize * 1.5,
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <TouchableOpacity disabled={disabled} onPress={() => onPress(!checked)} style={CONTAINER}>
            <Icon {...iconProps}
                name={checked ? (checkedIcon ? checkedIcon : "check-square") :
                    (uncheckedIcon ? uncheckedIcon : "square-o")}
                type={iconType}
                color={disabled ? "#000" : (color ? color : (checked ? checkedColor : uncheckedColor))}
                size={iconSize}
                style={ICON_STYLE} />
            <Text style={[{ color: disabled ? "#000" : textColor }, textStyle]} {...textProps}>{text}</Text>
        </TouchableOpacity>
    )
};

CheckBox.propTypes = {
    iconType: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string,
    textLeft: PropTypes.bool,
    textColor: PropTypes.string,
    textStyle: PropTypes.object,
    onPress: PropTypes.func,
    color: PropTypes.string,
    checkedColor: PropTypes.string,
    uncheckedColor: PropTypes.string,
    checkedIcon: PropTypes.string,
    uncheckedIcon: PropTypes.string,
    disabled: PropTypes.bool,
    iconSize: PropTypes.number
};

CheckBox.defaultProps = {
    iconType: "FontAwesome",
    checked: false,
    textLeft: false,
    color: "#000",
    disabled: false,
    iconSize: 24
};

export default CheckBox;