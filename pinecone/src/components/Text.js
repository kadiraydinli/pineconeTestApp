import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText } from 'react-native';
import { Colors } from '../config';

const Text = props => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    primary,
    success,
    info,
    warning,
    danger,
    color,
    children,
    fontSize,
    style,
    ...rest
  } = props;

  return (
    <RNText
      style={StyleSheet.flatten([
        h1 && { fontSize: 32 },
        h2 && { fontSize: 24 },
        h3 && { fontSize: 19 },
        h4 && { fontSize: 16 },
        h5 && { fontSize: 14 },
        h6 && { fontSize: 11 },
        color && { color: color },
        fontSize && { fontSize: fontSize },
        primary && { color: Colors.primary },
        success && { color: Colors.success },
        info && { color: Colors.info },
        warning && { color: Colors.warning },
        danger && { color: Colors.danger },
        style
      ])} {...rest}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  primary: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node,
  fontSize: PropTypes.number,
  style: RNText.propTypes.style,
};

Text.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  primary: false,
  success: false,
  info: false,
  warning: false,
  danger: false,
  color: 'black',
  children: '',
  fontSize: 16,
  style: {},
};

const styles = StyleSheet.create({
});

export default Text;
