import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from './Pagination';

const Body = styled.div`
    max-width: 36rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    max-width: 36rem;
    padding: 1.5rem;
    margin: 1.5rem auto;
    border-radius: 1rem;
    box-shadow: 2px 1px 1px #E5E7EB;
`;

const PostTitle = styled.span`
    font-size: 1.5rem;
`;

const PostBody = styled.span`
    font-size: 1rem;
`;

const PostButton = styled.button`
    margin: 0 auto;
    padding: 0.5rem 1rem;
    color: white;
    background-color: #7C3AED;
    border-radius: 0.25rem;

    &:hover {
        background-color: #6D28D9;
    }
`;

const Search = styled.input`
    max-width: 20rem;
    height: 2rem;
    margin-top: 1.5rem;
    background-color: #F3F4F6;
    border-radius: 0.25rem;
    border: 0;
`;

interface Post {
    userId : number,
    id : number,
    title : string,
    body : string
}

async function getPosts(): Promise<Post[]>{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    return posts;
}

function Posts() {
    const [filterString, setFilter] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(10);
    const {data, isError, isLoading} = useQuery({queryKey: ['posts'], queryFn: getPosts})

    if (isLoading) {
        return (
            <div>Loading, please wait</div>
        )
    }

    if (isError) {
        return (
            <div>Something went wrong...</div>
        )
    }

    function paginate(pageNumber: number){
        setCurrentPage(pageNumber);
    }

    function filterBySearch(search: string) {
        return data?.filter((response) => response.body.toLowerCase().includes(search.toLowerCase()))
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    
    const filteredPosts = filterBySearch(filterString)
    const currentPost = filteredPosts?.slice(firstPostIndex, lastPostIndex);

    const arrResult = currentPost?.map((post) => {
        return (
            <Container key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostBody>{post.body}</PostBody>
                <PostButton><Link to={`post/${post.id}`} state={post.id}>Весь пост</Link></PostButton>
            </Container>
        )
    })

    return (
        <Body>
            <Search name='myInput' placeholder='Напишите любой текст' onChange={(event) => {setFilter(event.target.value)}}></Search>
            {arrResult}
            <Pagination postsPerPage={postsPerPage} totalNumberOfPosts={filteredPosts?.length} paginate={paginate}></Pagination>
        </Body>
    )
}

export default Posts;