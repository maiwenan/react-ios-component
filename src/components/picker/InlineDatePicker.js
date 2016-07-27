/**
 * @author haw
 */

import React, {
	PropTypes,
	Component
} from 'react';
import Options from './Options';
import {classNames} from '../util';

const prefix = 'picker-body';
let now = new Date();

export default class InlineDatePicker extends Component {

	_setYear(yearOptions, selectedIndex) {
		const {
			selectedDate
		} = this.props;
		const year = yearOptions[selectedIndex].value;
		const month = selectedDate.getMonth();
		const newDate = copyDate(selectedDate);

		newDate.setFullYear(year);
		this.onChange(adjustDate(newDate, month));
	}

	_setMonth(monthOptions, selectedIndex) {
		const {
			selectedDate
		} = this.props;
		const month = monthOptions[selectedIndex].value - 1;
		const newDate = copyDate(selectedDate);

		newDate.setMonth(month);
		this.onChange(adjustDate(newDate, month));
	}

	_setDate(dateOptions, selectedIndex) {
		const {
			selectedDate
		} = this.props;
		const date = dateOptions[selectedIndex].value;
		const newDate = copyDate(selectedDate);

		newDate.setDate(date);
		this.onChange(newDate);
	}

	onChange(newDate) {
		const {
			onChange
		} = this.props;

		onChange && onChange(newDate);
	}

	render() {
		const {
			selectedDate,
			minDate,
			maxDate,
			yearUnit,
			monthUnit,
			dateUnit,
			onChange,
			className,
			...rest
		} = this.props;
		const clazz = classNames(prefix);
		const yearOptions = createYearOptions(maxDate, minDate, yearUnit);
		const monthOptions = createMonthOptions(maxDate, minDate, selectedDate, monthUnit);
		const dateOptions = createDateOptions(maxDate, minDate, selectedDate, dateUnit);
		const yearIndex = indexOfOptions(selectedDate.getFullYear(), yearOptions);
		const monthIndex = indexOfOptions(getMonth(selectedDate), monthOptions);
		const dateIndex = indexOfOptions(selectedDate.getDate(), dateOptions);

		return (
			<div className={clazz} {...rest}>
				<Options 
					selectedIndex={yearIndex}
					options={yearOptions} 
					key={'year'} 
					onChange={this._setYear.bind(this, yearOptions)}
				/>
				<Options 
					selectedIndex={monthIndex}
					options={monthOptions} 
					key={'month'} 
					onChange={this._setMonth.bind(this, monthOptions)}
				/>
				<Options 
					selectedIndex={dateIndex}
					options={dateOptions} 
					key={'date'} 
					onChange={this._setDate.bind(this, dateOptions)}
				/>
			</div>
		);
	}
}

function adjustDate(newDate, month) {
	if(newDate.getMonth() > month) {
		newDate.setMonth(month);
		newDate.setDate(getTotalDateOfMonth(newDate));
	}

	return newDate;
}

function copyDate(date) {
	return new Date(date.getTime());
}

function indexOfOptions(value, options) {
	let len = options.length;

	for(let i = 0; i < len; i++) {
		if(options[i].value === value) {
			return i;
		}
	}

	return len;
}

function createYearOptions(maxDate, minDate, yearUnit) {
	const max = maxDate.getFullYear();
	const min = minDate.getFullYear();

	return generateOptions(max, min, yearUnit);
}

function createMonthOptions(maxDate, minDate, selectedDate, monthUnit) {
	let max = isEqualYear(maxDate, selectedDate) ? getMonth(maxDate) : 12;
	let min = isEqualYear(minDate, selectedDate) ? getMonth(minDate) : 1;

	return generateOptions(max, min, monthUnit);
}

function createDateOptions(maxDate, minDate, selectedDate, dateUnit) {
	let max = isEqualYearMonth(maxDate, selectedDate) ? maxDate.getDate() : 
		getTotalDateOfMonth(selectedDate);
	let min = isEqualYearMonth(minDate, selectedDate) ? minDate.getDate() : 1;

	return generateOptions(max, min, dateUnit);
}

function generateOptions(max, min, unit = '') {
	let results = [];
	let current = min;

	while(current <= max) {
		results.push({
			name: `${current}${unit}`,
			value: current
		});
		current++;
	}

	return results;
}

function getMonth(date) {
	return date.getMonth() + 1;
}

function getTotalDateOfMonth(date) {
	let newDate = new Date(date.getTime());

	newDate.setDate(1);
	newDate.setMonth(getMonth(newDate));
	newDate.setDate(0);

	return newDate.getDate();
}

function isEqualYear(d1, d2) {
	return d1.getFullYear() === d2.getFullYear();
}

function isEqualYearMonth(d1, d2) {
	return isEqualYear(d1, d2) && (getMonth(d1) === getMonth(d2));
}

InlineDatePicker.propTypes = {
	selectedDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	yearUnit: PropTypes.string,
	monthUnit: PropTypes.string,
	dateUnit: PropTypes.string,
	onChange: PropTypes.func
};

InlineDatePicker.defaultProps = {
	selectedDate: now,
	maxDate: now,
	minDate: now,
	yearUnit: '',
	monthUnit: '',
	dateUnit: ''
};