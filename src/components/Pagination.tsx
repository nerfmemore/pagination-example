import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    padding: 1rem;
    background-color: #F9FAFB;
    border-radius: 5px;

    &:hover {
        background-color: #6D28D9;
        color: white;
    }
`;

const Pagination = (props: {postsPerPage: number, totalNumberOfPosts: number, paginate: void}) => {
    const numberOfPages: number[] = [];

    for (let i = 1; i <= Math.ceil(props.totalNumberOfPosts / props.postsPerPage); i++){
        numberOfPages.push(i)
    }

    const result = numberOfPages.map(number => {
        return <Button key={number} onClick={() => props.paginate(number)}>{number}</Button>
    })

    return (
        <Container>
            {result}
        </Container>
    )
}

export default Pagination;