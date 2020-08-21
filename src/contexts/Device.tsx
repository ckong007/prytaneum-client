/* eslint-disable react/prop-types */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiTheme from 'theme';

export const DeviceContext = React.createContext<'desktop' | 'mobile'>(
    'desktop'
);

interface Props {
    children: JSX.Element | JSX.Element[];
    override?: 'mobile' | 'desktop';
}

/** This tells the Material UI theme to fit on mobile or desktop
 *  @category Context
 *  @constructor Device
 *  @param props
 *  @param {JSX.Element | JSX.Element[]} props.children children are to be displayed wrapped in the theme for mobile or desktop
 *  @param {'mobile' | 'desktop' | undefined} props.override describes the theme to use, mobile or desktop
*/
export default function Device({ children, override }: Props) {
    const matches = useMediaQuery<typeof MuiTheme>((theme) =>
        theme.breakpoints.down('sm')
    );
    return (
        <DeviceContext.Provider
            value={override || matches ? 'mobile' : 'desktop'}
        >
            {children}
        </DeviceContext.Provider>
    );
}

Device.defaultProps = {
    override: '',
};
