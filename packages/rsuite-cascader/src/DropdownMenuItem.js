// @flow

import * as React from 'react';
import classNames from 'classnames';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { namespace } from 'rsuite-utils/lib/Picker/constants';


type Props = {
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean,
  value?: any,
  onSelect?: (value: any, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  title?: string,
  className?: string,
  children: ?React.Node,
  getItemData?: () => any
};


class DropdownMenuItem extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${namespace}-cascader-menu-item`,
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { value, disabled, onSelect } = this.props;
    event.preventDefault();
    if (!disabled && onSelect) {
      onSelect(value, event);
    }
  }
  render() {
    const {
      active,
      onKeyDown,
      disabled,
      focus,
      children,
      classPrefix,
      className,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    const unhandled = getUnhandledProps(DropdownMenuItem, rest);

    return (
      <li
        role="menuitem"
        className={className}
        {...unhandled}
      >
        <a
          tabIndex={-1}
          role="presentation"
          className={classes}
          onKeyDown={disabled ? null : onKeyDown}
          onClick={this.handleClick}
        >
          {children}
        </a>
      </li>
    );
  }
}

export default DropdownMenuItem;