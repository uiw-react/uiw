import React from 'react';
import classnames from 'classnames';
import Icon, { IconProps } from '../icon';
import { IProps, HTMLInputProps } from '../utils/props';
import './style/input.less';

export interface InputProps<T> extends IProps, Omit<HTMLInputProps, 'size'> {
  preIcon?: IconProps<T>['type'];
  type?: string;
  addonAfter?: React.ReactNode;
  size?: 'large' | 'default' | 'small';
}

export default class Input<T> extends React.Component<InputProps<T>> {
  public static defaultProps: InputProps<{}> = {
    prefixCls: 'w-input',
    preIcon: null,
    type: 'text',
    size: 'default',
  }
  private addonRef = React.createRef<HTMLDivElement>();
  private inputRef = React.createRef<HTMLInputElement>();
  componentDidMount() {
    this.computedInputPadding();
  }
  UNSAFE_componentWillReceiveProps(nextProps: InputProps<T>) {
    if (nextProps !== this.props) {
      this.computedInputPadding();
    }
  }
  computedInputPadding() {
    if (this.addonRef.current && this.inputRef.current) {
      const input = window.getComputedStyle(this.addonRef.current, null);
      this.inputRef.current.style.paddingRight = `${this.addonRef.current.clientWidth + parseInt((input.right as string), 10) * 2}px`;
    }
  }
  render() {
    const { prefixCls, className, style, size, type, preIcon, addonAfter, ...props } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-addon`]: addonAfter,
      disabled: this.props.disabled,
    });
    return (
      <div className={cls} style={style}>
        <Icon type={preIcon} />
        <input
          ref={this.inputRef}
          type={type}
          {...props}
          className={classnames(`${prefixCls}-inner`)}
        />
        {addonAfter && (
          <span className={`${prefixCls}-addon-after`} ref={this.addonRef}>{addonAfter}</span>
        )}
      </div>
    );
  }
}
