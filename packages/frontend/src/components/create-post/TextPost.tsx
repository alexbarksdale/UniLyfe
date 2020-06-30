import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { Form, Input, Label, Select, TextArea } from '../shared-styles/form.styles';

type initialValues = {
    discussion: string;
    title: string;
    body: string;
};

const validationSchema = yup.object().shape({
    discussion: yup.string().required('Your must select a discussion.'),
    title: yup.string().required('You must include a title.'),
    body: yup.string().required('You must include a body.'),
});

const TextField = ({ placeholder, label, ...props }: any) => {
    const [field, meta] = useField(props);
    const err = meta.error && meta.touched;

    return (
        <Label error={err} htmlFor={field.name}>
            {err ? meta.error : label}
            <Input placeholder={placeholder} {...field} {...props} />
        </Label>
    );
};

export function TextPost(): JSX.Element {
    const initValues: initialValues = { discussion: '', title: '', body: '' };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values);
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}>
                    <TextField name='discussion' label='Discussion' as={Select}>
                        <option value='0' defaultValue='selected' hidden>
                            Select a discussion
                        </option>
                        <option value='1'>Filler1</option>
                        <option value='2'>Filler2</option>
                    </TextField>

                    <TextField
                        name='title'
                        id='title'
                        type='text'
                        placeholder='Enter your title'
                        label='Title'
                    />

                    <TextField
                        name='body'
                        id='body'
                        type='text'
                        placeholder='Enter your text...'
                        label='Body'
                        as={TextArea}
                    />
                    <button type='submit'>Post</button>
                </Form>
            )}
        </Formik>
    );
}
