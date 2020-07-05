import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import {
    useCreatePostMutation,
    useMeQuery,
    GetPostsQuery,
    GetPostsDocument,
    useGetCategoriesQuery,
    GetCategoriesQuery,
} from '../../generated/graphql';
import { Form, Input, Label, Select, TextArea } from '../shared-styles/form.styles';

type initialValues = {
    category: string;
    title: string;
    body: string;
};

const validationSchema = yup.object().shape({
    category: yup.string().required('Your must select a discussion.'),
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

export function TextPost(): JSX.Element | null {
    const [createPost] = useCreatePostMutation();
    const { data: meData, loading: meLoading } = useMeQuery();
    const { data: categoryData, loading: categoryLoading } = useGetCategoriesQuery();

    if (!categoryData || categoryLoading || meLoading) return null;

    const renderCategories = (categories: GetCategoriesQuery) => {
        return categories.getCategories.map((category) => {
            return (
                <option value={category.name} key={category.name}>
                    {category.name}
                </option>
            );
        });
    };

    const initValues: initialValues = { category: '', title: '', body: '' };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if (meData && meData.me) {
                    const res = await createPost({
                        variables: {
                            authorId: meData.me.id,
                            title: values.title,
                            content: values.body,
                            categoryName: values.category,
                        },
                        // @param {data} is what we get back after createPost
                        update: (store, { data }) => {
                            // Reads from the cache
                            const postData = store.readQuery<GetPostsQuery>({
                                query: GetPostsDocument,
                            });

                            // We shouldn't mutate the current store directly (similar to Redux)
                            // so we're creating a new array and adding on the new post
                            if (postData && data) {
                                store.writeQuery<GetPostsQuery>({
                                    query: GetPostsDocument,
                                    data: {
                                        getPosts: [...postData.getPosts, data.createPost],
                                    },
                                });
                            }
                        },
                    });

                    if (res && !res.errors) {
                        setSubmitting(false);
                        // TODO: Handle success
                    }
                }
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}>
                    <TextField name='category' label='Category' as={Select}>
                        <option value='0' defaultValue='selected' hidden>
                            Select a category
                        </option>
                        {renderCategories(categoryData)}
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
