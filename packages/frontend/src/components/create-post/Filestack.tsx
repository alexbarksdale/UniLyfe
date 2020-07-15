import React from 'react';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';
import { device } from '../../utils/theme.util';

const UploadContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    @media ${device.mobileL} {
        margin-top: 7px;
    }
`;

const UploadBtn = styled.button`
    padding: 8px 15px;
    font-size: 15px;
    border-radius: 8px;
    margin-top: 8px;
    color: ${(props) => props.theme.gray800};
    background-color: ${(props) => props.theme.gray300};
    border: 1.6px solid transparent;
    outline: none;
    transition: all 0.3s ease 0s;

    &:hover {
        opacity: 0.8;
        border: 1.6px solid ${(props) => props.theme.primary};
    }
    &:focus {
        border: 1.6px solid ${(props) => props.theme.primary};
    }
`;

const FILESTACK_API = process.env.REACT_APP_FILESTACK_API_KEY;

type AppProps = {
    getThumbnail: (s: string | null) => void;
};

export function Filestack({ getThumbnail }: AppProps): JSX.Element {
    return (
        <ReactFilestack
            apikey={FILESTACK_API}
            customRender={({ onPick }: any) => (
                <UploadContainer>
                    <UploadBtn onClick={onPick} type='submit'>
                        Upload
                    </UploadBtn>
                </UploadContainer>
            )}
            onSuccess={(res: any) => {
                const thumbnail = res.filesUploaded[0].url;
                getThumbnail(thumbnail);
            }}
            onError={(res: any) =>
                console.log('Something went wrong during photo upload!', res)
            }
        />
    );
}
