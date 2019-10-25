import React from 'react';
import classnames from 'classnames';
import Popover, { PopoverProps } from '../popover';
import PickerTime, { TimePickerPanelProps } from './PickerTime';
import Input, { InputProps } from '../input';
import Button from '../button';
import { formatter } from '../';
import { IProps } from '../utils/props';
import './style/index.less';

export interface TimePickerProps<T> extends IProps, Omit<InputProps<T>, 'onChange' | 'value'> {
  value?: Date;
  format?: string;
  popoverProps?: PopoverProps;
  disabledHours?: TimePickerPanelProps['disabledHours'];
  precision?: TimePickerPanelProps['precision'];
  disabledMinutes?: TimePickerPanelProps['disabledMinutes'];
  disabledSeconds?: TimePickerPanelProps['disabledSeconds'];
  hideDisabled?: TimePickerPanelProps['hideDisabled'];
  allowClear?: boolean;
  disabled?: boolean;
  onChange?: (dataStr?: string, date?: Date | '', type?: TimePickerPanelProps['type'], num?: number, disableds?: number[]) => void;
}

export interface ITimePickerState {
  date: Date | '';
}

export default class TimePicker<T> extends React.Component<TimePickerProps<T>, ITimePickerState> {
  public state: ITimePickerState;
  public static defaultProps: TimePickerProps<{}> = {
    prefixCls: 'w-timepicker',
    format: 'HH:mm:ss',
    allowClear: true,
  }
  constructor(props: TimePickerProps<T>) {
    super(props);
    this.state = {
      date: (props.value || '') as Date,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: TimePickerProps<T>) {
    if (nextProps.value !== this.props.value) {
      this.setState({ date: (nextProps.value) as Date });
    }
  }
  onClear = () => {
    const { onChange } = this.props;
    this.setState({ date: '' }, () => onChange && onChange());
  }
  onSelected(type: TimePickerPanelProps['type'], num?: number, disableds?: number[], date?: ITimePickerState['date']) {
    const { onChange, format } = this.props;
    this.setState({ date: date || '' });
    const dataStr = date ? formatter(format!, date) : '';
    onChange && onChange(dataStr, date, type, num, disableds);
  }
  render() {
    const {
      prefixCls, className, disabled, value, format, popoverProps, allowClear, onChange,
      disabledHours, disabledMinutes, disabledSeconds, hideDisabled, precision,
      ...inputProps
    } = this.props;
    const { date } = this.state;
    const timeProps = { disabledHours, disabledMinutes, disabledSeconds, hideDisabled, precision };
    const inputValue = date ? formatter(format as string, date) : '';
    const props: InputProps<T> = { ...inputProps, value: inputValue };
    const datePickerTime = date || new Date();
    if (allowClear && inputValue !== '' && !!inputValue) {
      props.addonAfter = <Button className={`${prefixCls}-close-btn`} icon="close" disabled={props.disabled} onClick={this.onClear} size={props.size} basic type="light" />;
    }
    return (
      <Popover
        trigger="focus"
        placement="bottomLeft"
        autoAdjustOverflow
        visibleArrow={false}
        {...popoverProps}
        content={
          <PickerTime
            className={`${prefixCls}-popover`}
            {...timeProps}
            date={datePickerTime}
            onSelected={this.onSelected.bind(this)}
          />
        }
      >
        <Input
          placeholder="请选择时间"
          readOnly
          disabled={disabled}
          {...props}
          className={classnames(`${prefixCls}-input`, className)}
        />
      </Popover>
    );
  }
}
