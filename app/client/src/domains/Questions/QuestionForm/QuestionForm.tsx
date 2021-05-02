import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import type { Question as QuestionType, QuestionForm as FormType } from 'prytaneum-typings';

import useTownhall from '@local/hooks/useTownhall';
import LoadingButton from '@local/components/LoadingButton';
import Form from '@local/components/Form';
import FormTitle from '@local/components/FormTitle';
import FormContent from '@local/components/FormContent';
import FormActions from '@local/components/FormActions';
import TextField from '@local/components/TextField';
import useForm from '@local/hooks/useForm';
import useEndpoint from '@local/hooks/useEndpoint';
import useSnack from '@local/hooks/useSnack';
import QuestionCard from '../QuestionCard';
import { createQuestion } from '../api';

interface Props {
    quote?: QuestionType;
    onSubmit?: () => void;
    onCancel?: () => void;
}
export default function QuestionForm({ quote, onSubmit, onCancel }: Props) {
    // context & snack
    const [snack] = useSnack();
    const [townhall] = useTownhall();

    // form related @local/hooks
    const [form, errors, handleSubmit, handleChange] = useForm<FormType>({
        question: '',
        quoteId: quote?._id,
    });
    const endpoint = () => createQuestion(townhall._id, form);
    const onSuccess = () => {
        snack('Successfully submitted Question');
        if (onSubmit) onSubmit();
    };
    const isQuestionValid = React.useMemo(() => form.question.trim().length !== 0, [form]);
    const [run, isLoading] = useEndpoint(endpoint, { onSuccess });

    return (
        <Form onSubmit={handleSubmit(run)}>
            <FormTitle title='Question Form' />
            {quote && (
                <Grid item xs={12}>
                    <QuestionCard CardProps={{ elevation: 3 }} style={{ marginBottom: '8px' }} question={quote} />
                </Grid>
            )}
            <FormContent>
                <TextField
                    id='question-field'
                    name='question'
                    label='Your Question...'
                    autoFocus
                    error={Boolean(errors.question)}
                    helperText={errors.question}
                    required
                    multiline
                    value={form.question}
                    onChange={handleChange('question')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <LoadingButton loading={isLoading}>
                    <Button disabled={!isQuestionValid} type='submit' variant='contained' color='primary'>
                        Ask
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

QuestionForm.defaultProps = {
    quote: undefined,
    onSubmit: undefined,
    onCancel: undefined,
};

QuestionForm.propTypes = {
    quote: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};
