/* eslint-disable @typescript-eslint/require-await */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import jsonwebtoken from 'jsonwebtoken';

import HandleInviteLink from './HandleInviteLink';

jest.mock('@local/hooks/useSnack');

describe('Handle Invite Link', () => {
    let container: HTMLElement | null = null;
    const testValidToken = jsonwebtoken.sign(
        { email: 'test@test.com' },
        'secret'
    );

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render', async () => {
        ReactTestUtils.act(() => {
            render(
                <HandleInviteLink inviteToken={testValidToken} />,
                container
            );
        });
    });
});
