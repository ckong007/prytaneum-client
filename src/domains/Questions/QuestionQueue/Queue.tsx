import React from 'react';
import { CardHeader, useTheme, Grid } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type { Question } from 'prytaneum-typings';

import DropArea from 'components/DropArea';

import QueueControls from './QueueControls';
import DraggableList from './DraggableList';
import StaticList, { StaticListWrapper } from './StaticList';
import useListStyles from './useListStyles';

interface Props {
    questions: Question[];
}

export default function Queue({ questions: _questions }: Props) {
    const theme = useTheme();
    const classes = useListStyles();
    const [current, setCurrent] = React.useState(0);
    const [questions, setQuestions] = React.useState(_questions);
    const reorder = React.useCallback(
        (list: Question[], startIndex: number, endIndex: number) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        },
        []
    );

    const getListStyle = React.useCallback(
        (isDraggingOver: boolean): React.CSSProperties => ({
            background: isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: theme.spacing(2),
            borderRadius: theme.custom.borderRadius,
            boxShadow: theme.shadows[10],
        }),
        [theme]
    );

    const itemStyle = React.useCallback(
        (isDragging: boolean): React.CSSProperties => ({
            userSelect: 'none',
            margin: theme.spacing(0, 0, 4, 0),
            filter: isDragging
                ? `drop-shadow(0 0 .75rem ${theme.palette.secondary.light})`
                : '',
        }),
        [theme]
    );

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            const newState = reorder(
                questions,
                result.source.index,
                result.destination.index
            );

            setQuestions(newState);
        },
        [questions, reorder]
    );

    const handleClick = (dir: -1 | 1) => () => {
        if (current + dir >= questions.length) return setCurrent(0);
        if (current + dir < 0) return setCurrent(questions.length - 1);
        return setCurrent(current + dir);
    };

    const draggableCards = React.useMemo(() => questions.slice(current + 1), [
        questions,
        current,
    ]);
    const notDraggableCards = React.useMemo(
        () => questions.slice(0, current + 1),
        [questions, current]
    );

    return (
        <Grid container direction='column' wrap='nowrap'>
            <QueueControls
                onClickNext={handleClick(1)}
                onClickPrev={handleClick(-1)}
                className={classes.listItem}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <DropArea getStyle={getListStyle} droppableId='droppable'>
                    <CardHeader
                        title='Queue'
                        titleTypographyProps={{
                            variant: 'h6',
                        }}
                    />
                    <StaticListWrapper>
                        <StaticList questions={notDraggableCards} />
                    </StaticListWrapper>
                    <DraggableList
                        questions={draggableCards}
                        itemStyle={itemStyle}
                        offset={current + 1}
                    />
                </DropArea>
            </DragDropContext>
        </Grid>
    );
}
