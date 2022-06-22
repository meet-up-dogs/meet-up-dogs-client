import { useState } from 'react';

export const useToggle = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const toggleValue = (_value = null) => {
		console.log(_value);
		if (_value === null) {
			_value = value ? false : true;
			setValue(_value);
		} else {
			setValue(_value);
		}
	};

	return [value, toggleValue];
};