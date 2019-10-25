import React from 'react';
import classnames from 'classnames';
import Input, { InputProps } from '../input';
import Popover, { PopoverProps } from '../popover';
import DatePicker, { IDatePickerProps } from '../date-picker';
import { formatter } from '../';
import Icon from '../icon';
import { IProps } from '../utils/props';
import './style/index.less';

export interface IDateInputProps<T> extends IProps, Omit<InputProps<T>, 'onChange' | 'value'> {
  popoverProps?: PopoverProps;
  datePickerProps?: IDatePickerProps;
  value?: Date | string;
  format?: string;
  allowClear?: boolean;
  onChange?: (selectedDate?: Date) => void;
}

export interface IDateInputState {
  date?: Date | string;
}

export default class DateInput<T> extends React.Component<IDateInputProps<T>, IDateInputState> {
  public static defaultProps: IDateInputProps<{}> = {
    prefixCls: 'w-dateinput',
    format: 'YYYY/MM/DD',
    allowClear: true,
  }
  constructor(props: IDateInputProps<T>) {
    super(props);
    this.state = {
      date: props.value,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: IDateInputProps<T>) {
    if (nextProps.value !== this.props.value) {
      this.setState({ date: nextProps.value });
    }
  }
  onChange(date?: Date) {
    const { format, onChange } = this.props;
    this.setState({ date });
    if (date) {
      (date as any) = formatter(format as string, new Date(date));

    }
    onChange && onChange(date);
  }
  render() {
    const { prefixCls, className, popoverProps, datePickerProps, allowClear, format, onChange, ...inputProps } = this.props;
    const { date } = this.state;
    const value = date || '';
    inputProps.value = typeof value === 'string' ? value : formatter(format as string, value);
    if (allowClear && inputProps.value) {
      inputProps.addonAfter = <Icon className={`${prefixCls}-close-btn`} onClick={this.onChange.bind(this, undefined)} type="close" />;
    }
    return (
      <Popover
        trigger="focus"
        placement="bottomLeft"
        autoAdjustOverflow
        {...popoverProps}
        content={
          <DatePicker
            date={(value && new Date(value)) || undefined}
            className={`${prefixCls}-popover`}
            {...datePickerProps}
            onChange={this.onChange.bind(this) as any}
          />
        }
      >
        <Input
          placeholder="请选择日期"
          readOnly
          {...(inputProps as any)}
          className={classnames(`${prefixCls}`, className)}
        />
      </Popover>
    );
  }
}
