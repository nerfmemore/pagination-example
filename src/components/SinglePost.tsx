import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components";

const FullPost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    max-width: 36rem;
    padding: 1.5rem;
    margin: 1.5rem auto;
    border-radius: 1rem;
    border: 2px solid #7C3AED;
`;

const Title = styled.span`
    font-size: 1.2rem;
`;

const Text = styled.span`
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    color: white;
    background-color: #7C3AED;

    &:hover {
        background-color: #6D28D9;
    }
`;

async function getPostById(id: number) {
    const data  = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return data.json();
}

function usePost(postId: number){
    return useQuery({queryKey: ['post', postId], queryFn: () => getPostById(postId)})
}

function SinglePost(){
    const {state} = useLocation()
    const { data, isError, isLoading } = usePost(state);

    if (isLoading) {
        return (
            <div>Loading, please wait...</div>
        )
    }

    if (isError) {
        return (
            <div>Something went wrong</div>
        )
    }

    return (
        <FullPost key={data.id}>
            <Title>{data.title}</Title>
            <Text>{data.body}</Text>
            <Link to={'/'}><Button>Вернуться</Button></Link>
        </FullPost>
    )
}

export default SinglePost;