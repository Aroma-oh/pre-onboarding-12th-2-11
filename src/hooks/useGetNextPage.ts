import {pageNumberState, pageLastNumberState, fetchIssueState} from 'recoil/atoms';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAxios} from 'hooks/useFetchData';

export const useGetNextPage = () => {
    const {fetchData} = useAxios();

    const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);

    const issueState = useRecoilValue(fetchIssueState);
    const lastPageNumber = useRecoilValue(pageLastNumberState);

    const getNextPage = async () => {
        if (pageNumber === lastPageNumber || issueState.fetching) return;

        const params = {page: pageNumber + 1, sort: 'comments'};

        await fetchData({params});

        setPageNumber(prev => prev + 1);
    };

    return getNextPage;
};
