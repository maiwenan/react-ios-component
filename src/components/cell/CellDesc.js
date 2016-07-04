/**
 * @author haw
 */

import React, {
	PropTypes
} from 'react';
import {classNames} from '../util';

const prefix = 'cell-desc';

export default function CellBody(props) {
	const {
		className,
		children,
		...rest
	} = props;
	let clazz = classNames(prefix, {
		[className]: className
	});

	return (
		<div className={clazz} {...rest}>
			{children}
		</div>
	);
}