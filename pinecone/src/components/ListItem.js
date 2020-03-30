import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Text, IconButton, Avatar } from '..';

const ListItem = (props) => {
    const {
        title,
        titleStyle,
        titleProps,
        description,
        descriptionStyle,
        descriptionProps,
        onPress,
        onLongPress,
        Component = onPress || onLongPress ? TouchableHighlight : View,
        underlayColor,
        left,
        leftIcon,
        leftIconProps,
        leftAvatar,
        leftAvatarProps,
        right,
        rightIcon,
        rightIconProps,
        rightText,
        rightTextStyle,
        rightTextProps,
        bottomDivider,
        topDivider,
        disabled,
        disabledStyle
    } = props;

    const selectedForLeft = (
        left && left ||
        leftIcon && (<IconButton privateSize={leftIcon.size || 24} name={leftIcon.name} 
            color={leftIcon.color} size={leftIcon.size || 24} type={leftIcon.type} onPress={leftIcon.onPress} 
            onLongPress={leftIcon.onLongPress} onLongPressUnderlayColor={leftIcon.onLongPressUnderlayColor} 
            {...leftIconProps} />) ||
        leftAvatar && (<Avatar source={leftAvatar.source} value={leftAvatar.value} 
            valueStyle={leftAvatar.valueStyle} type={leftAvatar.type} backgroundColor={leftAvatar.backgroundColor} 
            size={leftAvatar.size || 40} onPress={onPress} {...leftAvatarProps} />)
    );

    const selectedForRight = (
        right && right ||
        rightIcon && (<IconButton privateSize={rightIcon.size || 24} name={rightIcon.name} color={rightIcon.color}
            size={rightIcon.size} type={rightIcon.type} onPress={rightIcon.onPress} onLongPress={rightIcon.onLongPress}
            onLongPressUnderlayColor={rightIcon.onLongPressUnderlayColor} {...rightIconProps} />) ||
        rightText && (<Text style={[styles.rightText, rightTextStyle]} {...rightTextProps}>{rightText}</Text>)
    );

    const divider = [
        bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
        topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
    ];

    return (
        <Component style={[styles.ListItem, { borderColor: "#D1D1D6" }, divider]} onPress={onPress} onLongPress={onLongPress} underlayColor={underlayColor}>
            <>
                {(left || leftIcon || leftAvatar) &&
                    <View style={{ marginRight: leftIcon && leftIcon.size <= 24 ? 32 : 16 }}>
                        {selectedForLeft}
                    </View>}
                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, titleStyle]} {...titleProps}>{title}</Text>
                    {description &&
                        <Text style={[styles.description, descriptionStyle]} {...descriptionProps}>{description}</Text>}
                </View>
                {(right || rightIcon || rightText) &&
                    <View style={{ marginLeft: rightText ? 28 : 16 }}>
                        {selectedForRight}
                    </View>}
            </>
        </Component>
    )
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    description: PropTypes.string,
    descriptionStyle: PropTypes.object,
    color: PropTypes.string,
    type: PropTypes.string
};

ListItem.defaultProps = {
    underlayColor: "gray"
};

const styles = StyleSheet.create({
    ListItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "red",
        minHeight: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12
    },
    title: {
        fontSize: 16,
        color: "#000000de"
    },
    description: {
        fontSize: 14,
        color: "#00000099"
    },
    rightText: {
        fontSize: 12,
        color: "#00000099"
    }
});

export default ListItem;