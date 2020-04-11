import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableHighlight, View } from 'react-native';
import { Text, Icon } from '..';

const avatarSizes = {
    small: 50,
    medium: 70,
    large: 100
};

const Avatar = (props) => {
    const {
        source,
        onPress,
        Component = onPress ? TouchableHighlight : View,
        size,
        value,
        valueStyle,
        icon, //{name, color, size, type}
        avatarStyle,
        backgroundColor,
        type,
        avatarMini,
        avatarMiniPosition,
        avatarMiniOnPress,
        MiniComponent = avatarMiniOnPress ? TouchableHighlight : View,
        style,
    } = props;

    const width = size ? typeof size === 'number' ? size : avatarSizes[size] : 50;
    const fontSize = width / 2;

    const selectedType = [
        type == "square" && { borderRadius: 3 },
        type == "rounded" && { borderRadius: 70 }
    ];

    const avatarMiniStyle = { width: width / 3, height: width / 3, position: "absolute" };

    const avatarMiniPositionStyle = [
        avatarMiniPosition == "topLeft" && { alignSelf: "flex-start", top: 0 },
        avatarMiniPosition == "topRight" && { alignSelf: "flex-end", top: 0 },
        avatarMiniPosition == "bottomLeft" && { alignSelf: "flex-start", bottom: 0 },
        avatarMiniPosition == "bottomRight" && { alignSelf: "flex-end", bottom: 0 },
    ];

    const selectedComponent = [
        value && (<Text key={0} fontSize={fontSize} color="white" style={valueStyle}>{value}</Text>),
        icon && (<Icon key={1} name={icon.name} color={icon.color} size={icon.size ? icon.size : width / 2} type={icon.type} />),
        source && (<Image key={2} source={source} style={
            StyleSheet.flatten([{ width: width, height: width }, selectedType, avatarStyle])} />)
    ];

    return (
        <Component onPress={() => alert("kdlsfş")}
            style={StyleSheet.flatten([styles.container, { width: width, height: width, backgroundColor: backgroundColor }, 
                selectedType, style])}>
            <>
                {selectedComponent}
                <MiniComponent onPress={avatarMiniOnPress}
                    style={[avatarMiniStyle, avatarMiniPositionStyle]}>{avatarMini}</MiniComponent>
            </>
        </Component>
    )
};

Avatar.propTypes = {
    source: Image.propTypes.source,
    onPress: PropTypes.func,
    Component: PropTypes.oneOf([View, TouchableHighlight]),
    size: PropTypes.oneOf(["small", "medium", "large", PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string,
    valueStyle: PropTypes.object,
    icon: PropTypes.object,
    avatarStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    type: PropTypes.oneOf(["square", "rounded"]),
    avatarMini: PropTypes.element,
    avatarMiniPosition: PropTypes.string,
    avatarMiniOnPress: PropTypes.func,
    MiniComponent: PropTypes.oneOf([View, TouchableHighlight]),
    style: PropTypes.object
};

Avatar.defaultProps = {
    size: "medium",
    valueStyle: {},
    avatarStyle: {},
    type: "rounded",
    avatarMiniPosition: "bottomRight",
    style: {}
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3
    }
});

export default Avatar;