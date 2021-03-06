/**
 * @author haw
 * 标签栏
 */

import React, {
  PropTypes
} from 'react';
import config from '../util/config';
import {classNames} from '../util';
import TabbarItem from './TabbarItem';

const prefix = 'tabbar';

/**
 * 标签栏
 * @param {Object} props 组件所使用的属性
 * @param {Object[]} [props.tabs] 标签项组件的属性对象列表
 * @param {string} [props.linkColor='gray'] 每个标签栏项的字体颜色
 * @param {string} [props.activeColor=''] 每个标签栏项被激活时的字体颜色，默认为主题颜色
 */
export default function TabBar(props) {
  const {
    linkColor,
    activeColor,
    tabs,
    children,
    className,
    ...rest
  } = props;
  let clazz = classNames(prefix, {
    [className]: className
  });
  const nodes = tabs && tabs.map((tab, i) => {
    return (
      <TabbarItem
        linkColor={linkColor}
        activeColor={activeColor}
        {...tab}
        key={i}
      />
    );
  });
  const childrens = children && React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      linkColor,
      activeColor
    });
  });

  return (
    <div className={clazz} {...rest}>
      {tabs && tabs.length > 0 ? nodes : childrens}
    </div>
  );
}

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  linkColor: PropTypes.oneOf(config.colors),  // 每个标签栏项的字体颜色
  activeColor: PropTypes.oneOf(config.colors),  // 每个标签栏项被激活时的字体颜色
  className: PropTypes.string,
  children: PropTypes.node
};

TabBar.defaultProps = {
  linkColor: 'gray',
  activeColor: ''
};
