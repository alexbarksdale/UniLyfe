import React, { useState, useEffect, Dispatch, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

import { TrieTree } from '../../assets/trietree';
import { device } from '../../utils/theme.util';

// **** SEARCH BAR STYLES ****
const SearchContainer = styled.div`
    display: flex;
    border-radius: 8px;
    margin-right: 25px;
    background-color: ${(props) => props.theme.gray200};

    span {
        margin: 10px 0px 0px 14px;
        position: absolute;
    }

    form {
        width: 214px;

        @media ${device.tabletS} {
            width: 100%;
        }
    }

    @media ${device.tabletS} {
        margin: 10px 30px 10px 0px;
    }
`;

const SearchInput = styled.input`
    color: #3d3d3d;
    font-weight: 500;
    font-size: 15px;
    margin-left: 30px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.gray200};

    &:focus {
        outline: none;
    }
    &::placeholder {
        font-weight: 500;
        font-size: 15px;
        color: ${(props) => props.theme.gray450};
    }

    @media ${device.tabletS} {
        width: 93%;
    }
`;

const SearchIcon = styled(FaSearch)`
    font-size: 15px;
    color: ${(props) => props.theme.gray450};
`;

const SearchResultIcon = styled(FaChevronRight)`
    margin-right: 14px;
    color: ${(props) => props.theme.gray450};
`;

const SearchListContainer = styled.ul`
    width: 204px;
    display: flex;
    flex-direction: column;
    position: absolute;
    list-style: none;
    margin-top: -9px;
    padding: 5px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: ${(props) => props.theme.gray200};

    li {
        margin-top: 9px;

        a {
            color: #3d3d3d;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            width: auto;
            padding: 7px;
            border-radius: 8px;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
                transition: all 0.3s ease-in-out;
                background-color: #eaeaea;
            }
        }
    }

    @media ${device.tabletS} {
        width: unset;
        position: relative;
    }
`;

const ListingDivider = styled.div`
    height: 2px;
    z-index: 900;
    width: 214px;
    position: absolute;
    background-color: ${(props) => props.theme.gray300};

    @media ${device.tabletS} {
        position: relative;
        width: unset;
    }
`;
// **** END SEARCH BAR STYLES ****

// Ensure the user gives a valid input type
type inputType =
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'week';

// State properties in this component
interface AppState {
    searchTree: TrieTree;
    searchTerm: string;
    searchCorpus?: boolean;
}

// Props in this component
interface AppProps {
    placeholder?: string;
    type?: inputType;
    corpus?: string[] | undefined;
    onChange?: (s: string) => void;
    disableTermSubmit?: boolean;
}

/*
 * Adds a submited search term to the tree.
 * @param {FormEvent<HTMLFormElement>} e                 FormEvent of the form
 * @param {AppState}                   search            State properties of this component
 * @param {SetStateAction}             setSearch         Sets the state for search
 * @param {boolean}[default=false]     disableTermSubmit Disables adding a search term on submit
 * @return {void}
 */
const handleTermSubmit = (
    e: FormEvent<HTMLFormElement>,
    search: AppState,
    setSearch: Dispatch<React.SetStateAction<AppState>>,
    disableTermSubmit?: boolean
): void => {
    e.preventDefault();

    const { searchTree, searchTerm } = search;

    // Checks to see if the user didn't disabled adding a new term to the tree on submit
    if (!disableTermSubmit) {
        searchTree.insert(searchTerm);
    }
    setSearch({ searchTree, searchTerm: '' });
};

/*
 * Sets the searchTerm state and passes the changed value
 * optionally to the parent of this component if added.
 * @param {ChangeEvent<HTMLInputElement>}   e          ChangeEvent of the input
 * @param {TrieTree}                        searchTree A trie tree data structure to store strings
 * @param {SetStateAction}                  setSearch  Sets the state for search
 * @param {(s: string) => void | undefined} onChange   Sends term to parent component
 * @return {void}
 */
const handleTermChange = (
    e: ChangeEvent<HTMLInputElement>,
    searchTree: TrieTree,
    setSearch: Dispatch<React.SetStateAction<AppState>>,
    onChange?: (s: string) => void
): void => {
    setSearch({ searchTree, searchTerm: e.target.value });

    if (onChange) {
        onChange(e.target.value);
    }
};

/*
 * Handles accepting an optional corpus to put in the state.
 * @param {string}          searchTerm The input a user types into the search bar
 * @param {SetStateAction}  setSearch  Sets the state for search
 * @param {string[]}        corpus     A corpus of text to use for the search bar
 * @return {void}
 */
const handleCorpus = (
    searchTerm: string,
    setSearch: Dispatch<React.SetStateAction<AppState>>,
    corpus: string[]
) => {
    setSearch({
        searchTree: new TrieTree(corpus),
        searchTerm: searchTerm,
        searchCorpus: true,
    });
};

/*
 * Displays dropdown items of completed prefix terms from the trie tree if any.
 * @param {string[]} searchResults Results of completions from the trie tree
 * @return {JSX.Element[]}
 */
const displayResults = (searchResults: string[]): JSX.Element[] => {
    const resultListElement = searchResults.map((result, i) => {
        return (
            <li key={i}>
                <a href='REPLACE_ME'>
                    <SearchResultIcon />
                    {result}
                </a>
            </li>
        );
    });
    return resultListElement;
};

/*
 * Functionality of each prop for this component.
 * Each prop is optional! Reference the AppProps interface.
 * @prop {string}               placeholder       Add a custom placeholder
 * @prop {inputType}            type              Change the type of the input
 * @prop {string[] | undefined} corpus            Supply a corpus for the trie tree
 * @prop {(s: string) => void}  onChange          Pass the changes of the input to a parent
 * @prop {boolean}              disableTermSubmit Disable adding a new term to the tree on submit
 */
export function SearchBar(props: AppProps): JSX.Element {
    // Destructure the values out of props and give necessary default values
    const {
        placeholder = 'Search...',
        type = 'text',
        corpus = [],
        disableTermSubmit = false,
    } = props;

    // Create component state
    const [search, setSearch] = useState<AppState>({
        searchTree: new TrieTree(),
        searchTerm: '',
        searchCorpus: false,
    });

    // Destructure the values out of state
    const { searchTree, searchTerm, searchCorpus } = search;

    // Check if a corpus was added to the tree
    if (!searchCorpus && corpus.length > 0) {
        // Creates a new searchTree with the corpus
        handleCorpus(searchTerm, setSearch, corpus);
    }

    // Retrieves all the search term completions
    const searchResults: string[] = searchTree.complete(searchTerm);

    // Prevents annoying LastPass error when you submit
    useEffect(() => {
        document.addEventListener('keydown', (e) => e.stopPropagation(), true);

        // Unmount the event listener
        return () => {
            document.removeEventListener('keydown', (e) => e.stopPropagation(), true);
        };
    }, []);

    return (
        <SearchContainer>
            <span>
                <SearchIcon />
            </span>
            <form
                onSubmit={(e) =>
                    handleTermSubmit(e, search, setSearch, disableTermSubmit)
                }
            >
                <SearchInput
                    type={type}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => handleTermChange(e, searchTree, setSearch)}
                />
                {searchResults.length > 0 ? (
                    <>
                        <ListingDivider />
                        <SearchListContainer>
                            {displayResults(searchResults)}
                        </SearchListContainer>
                    </>
                ) : null}
            </form>
        </SearchContainer>
    );
}
