import * as React from 'react';
import Container from '@material-ui/core/Container';

import Component from './DndList';

export default { title: '@local/components/Dnd List' };

export function Basic() {
    return (
        <Container style={{ marginTop: '10px', width: '100%' }}>
            <Component />
        </Container>
    );
}
