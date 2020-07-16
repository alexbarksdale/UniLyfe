import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import slugify from 'slugify';

import {
    useCreateTextPostMutation,
    useMeQuery,
    GetPostsDocument,
    useGetCategoriesQuery,
    GetCategoriesQuery,
    GetCategoryPostsDocument,
} from '../../generated/graphql';
import {
    Form,
    SubmitBtn,
    Input,
    Label,
    Select,
    TextArea,
} from '../shared-styles/form.styles';
import { PostType } from './CreatePost';
import { Filestack } from './Filestack';

const ThumbnailTitle = styled.p`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: ${(props) => props.theme.gray500};
`;

type initialValues = {
    category: string;
    title: string;
    body: string;
};

const validationSchema = yup.object().shape({
    category: yup.string().required('Your must select a category.'),
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
    const [thumbnailSrc, setThumbnail] = useState<string | null>(null);
    const history = useHistory();

    const [createTextPost] = useCreateTextPostMutation();
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

    const initValues: initialValues = {
        category: '',
        title: '',
        body: '',
    };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if (meData && meData.me) {
                    const res = await createTextPost({
                        variables: {
                            title: values.title,
                            type: PostType.TEXT,
                            authorId: meData.me.id,
                            content: values.body,
                            thumbnail: thumbnailSrc,
                            categoryName: values.category,
                        },
                        refetchQueries: [
                            {
                                query: GetPostsDocument,
                            },
                            {
                                query: GetCategoryPostsDocument,
                                variables: {
                                    categoryName: values.category,
                                },
                            },
                        ],
                    });

                    if (res.data && !res.errors) {
                        setSubmitting(false);
                        const { createTextPost } = res.data;
                        const slugTitle = slugify(values.title, '_').toLowerCase();
                        const postUrl = `category/${createTextPost.category.name}/${createTextPost.id}/${slugTitle}`;
                        history.push(postUrl);
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

                    <ThumbnailTitle>Thumbnail (Optional)</ThumbnailTitle>
                    <Filestack
                        getThumbnail={(link: string | null) => setThumbnail(link)}
                    />

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
                    <SubmitBtn type='submit'>Post</SubmitBtn>
                </Form>
            )}
        </Formik>
    );
}
