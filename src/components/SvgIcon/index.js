import React from 'react';
import { string } from 'prop-types';
import styles from './styles';

// NOTE - List of icons can be found here: https://material.io/tools/icons/?style=baseline

const SvgIcon = ({
  className,
  name,
}) => (
  <svg
    className={`${ styles.icon } ${ className }`}
    dangerouslySetInnerHTML={{
      __html: `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ic_${ name }_24px"></use>`,
    }}
  />
);

SvgIcon.propTypes = {
  className: string,
  name: string,
};

export default SvgIcon;
