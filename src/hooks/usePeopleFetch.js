import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    if (users.length === 0) {
      setUsers(response.data.results);
    } else {
      setUsers([...new Set([...users.concat(response.data.results)])]);
    }
  }

  return { users, isLoading, fetchUsers };
};
