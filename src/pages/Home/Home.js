import { React, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1)
  
  
  const { users, isLoading } = usePeopleFetch(pageNumber);
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} setPageNumber={setPageNumber} isLoading={isLoading} setPageNumber={setPageNumber} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
