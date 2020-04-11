import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Text, Icon } from "..";

const RadioButton = (props) => {
    const {
        values, //{label, value, labelStyle}
        labelColor,
        labelStyle,
        labelHorizontal,
        horizontal,
        color,
        selectedColor,
        onPress, //(label, value) returned
        disabled,
        size,
    } = props;

    const RADIO = {
        width: size,
        height: size,
        borderRadius: size * 2,
        borderWidth: 2,
        padding: 4,
        margin: 5
    }

    const RADIO_ROUND = {
        flex: 1,
        borderRadius: size * 2
    }

    const CONTAINER = {
        flexWrap: "wrap",
        flexDirection: horizontal ? "row" : "column",
        alignItems: labelHorizontal ? "flex-start" : "center",
        opacity: disabled ? .3 : 1
    }

    const isSelectedColor = disabled ? "#000" : (selectedColor ? selectedColor : color)

    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        return () => {
            setSelected(-1);
        }
    }, []);

    return (
        <View style={CONTAINER}>
            {values.map((radio, index) => (
                <TouchableOpacity disabled={disabled} key={index}
                    style={[styles.content, { flexDirection: labelHorizontal ? "row" : "column" }]}
                    onPress={() => {
                        onPress(radio.label, radio.value)
                        setSelected(index)
                    }}>
                    <View style={[RADIO, { borderColor: disabled ? "#000" : (index === selected ? isSelectedColor : color) }]}>
                        <View style={[RADIO_ROUND, { backgroundColor: index === selected ? isSelectedColor : "transparent" }]} />
                    </View>
                    <Text style={[{
                        color: disabled ? "#000" : (labelColor && selected != index ? labelColor :
                            index === selected ? isSelectedColor : color)
                    },
                    !disabled && (labelStyle, radio.labelStyle)
                    ]}>{radio.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
};

RadioButton.propTypes = {
    values: PropTypes.array.isRequired,
    labelColor: PropTypes.string,
    labelStyle: PropTypes.object,
    labelHorizontal: PropTypes.bool,
    horizontal: PropTypes.bool,
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.number
};

RadioButton.defaultProps = {
    color: "black",
    size: 20,
    labelHorizontal: true,
    horizontal: false,
    disabled: false
};


const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    }
});

export default RadioButton;