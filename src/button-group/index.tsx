import React from 'react';
import classnames from 'classnames';
import { HTMLDivProps } from '../utils/props';
import './style/index.less';

export interface ButtonGroupProps extends HTMLDivProps {
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  vertical?: boolean;
}

export default class ButtonGroup extends React.Component<ButtonGroupProps> {
  public static defaultProps: ButtonGroupProps = {
    prefixCls: 'w-btn-group',
    vertical: false,
  }
  public render() {
    const { prefixCls, vertical, children, className, ...resetProps } = this.props;
    const cls: string = classnames(prefixCls, className, {
      [`${prefixCls}-vertical`]: vertical,
    });

    return (
      <div className={cls} {...resetProps}>
        {children}
      </div>
    );
  }
}
