import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text, IconButton } from '..';

const Header = (props) => {
    const {
        title,
        titleColor,
        titlePlacement,
        titleStyle,
        subTitle,
        subTitleColor,
        subTitlePlacement,
        subTitleStyle,
        placement,
        backgroundColor,
        statusbarColor,
        statusbarProps,
        iconLeft,
        iconRight,
        containerStyle,
        leftContainer,
        leftContainerStyle,
        centerContainer,
        centerContainerStyle,
        rightContainer,
        rightContainerStyle
    } = props;

    const centerPlacementValue = (
        !placement && (titlePlacement || subTitlePlacement) ? null : 
        placement === "left" ? "flex-start" : 
        placement === "right" ? "flex-end" : placement
    )

    const titlePlacementValue = (
        placement && !titlePlacement ? placement : placement && titlePlacement ? titlePlacement : titlePlacement
    )

    const subTitlePlacementValue = (
        placement && !subTitlePlacement ? placement : placement && subTitlePlacement ? subTitlePlacement : subTitlePlacement
    )

    return (
        <>
            <StatusBar backgroundColor={statusbarColor} {...statusbarProps} />
            <View style={[{ backgroundColor: backgroundColor }, styles.Header, containerStyle]}>
                <View style={[styles.Views, leftContainerStyle]}>
                    {!leftContainer && iconLeft ? 
                    (<IconButton {...iconLeft} />) : 
                    (leftContainer)}
                </View>
                <View style={[{ justifyContent: "center", alignItems: centerPlacementValue }, centerContainerStyle]}>
                {!centerContainer ? (<>
                    <Text style={[{ fontSize: 25, textAlign: titlePlacementValue, color: titleColor }, titleStyle]}>
                        {title}
                    </Text>
                    {subTitle ? 
                        <Text style={[{ fontSize: 15, textAlign: subTitlePlacementValue, color: subTitleColor }, subTitleStyle]}>
                            {subTitle}
                        </Text> : null}
                    </>) : (centerContainer)}
                </View>
                <View style={[styles.Views, rightContainerStyle]}>
                    {!rightContainer && iconRight ? (<IconButton {...iconRight} />) : 
                    (<>{rightContainer}</>)}
                </View>
            </View>
        </>
    )
};

Header.propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titlePlacement: PropTypes.oneOf(["left", "center", "right"]),
    titleStyle: PropTypes.object,
    subTitle: PropTypes.string,
    subTitleColor: PropTypes.string,
    subTitlePlacement: PropTypes.oneOf(["left", "center", "right"]),
    subTitleStyle: PropTypes.object,
    placement: PropTypes.oneOf(["left", "center", "right"]),
    backgroundColor: PropTypes.string,
    statusbarColor: PropTypes.string,
    statusbarProps: PropTypes.object,
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
    containerStyle: PropTypes.object,
    leftContainer: PropTypes.element,
    leftContainerStyle: PropTypes.object,
    centerContainer: PropTypes.element,
    centerContainerStyle: PropTypes.object,
    rightContainer: PropTypes.element,
    rightContainerStyle: PropTypes.object
};

Header.defaultProps = {
    title: "",
    titleColor: "black",
    titlePlacement: "center",
    titleStyle: {},
    subTitle: "",
    subTitleColor: "black",
    subTitlePlacement: "center",
    subTitleStyle: {},
    //placement: "center",
    backgroundColor: "white",
    statusbarColor: "white",
    statusbarProps: { barStyle: "dark-content" },
    iconLeft: null,
    iconRight: null,
    containerStyle: {},
    leftContainerStyle: { flex: 1 },
    centerContainerStyle: { flex: 3 },
    rightContainerStyle: { flex: 1 }
};

const styles = StyleSheet.create({
    Header: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    Views: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Header;