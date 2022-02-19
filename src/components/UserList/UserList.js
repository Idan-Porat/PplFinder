import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, setPageNumber }) => {

  const [hoveredUserId, setHoveredUserId] = useState();

  // Favorites users state.
  const [favorites, setFavorites] = useState([]);

  // Checked boxes state.
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  // Url address
  const urlAddress = useLocation();

  // The observer will check if we scroll all the way down to the last user element.
  const observerForLastUser = useRef();

  const observerOtherUsers = useRef();

  const lastUserElement = useCallback(node => {
    if (isLoading) return
    if (observerForLastUser.current) observerForLastUser.current.disconnect()
    observerForLastUser.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && list !== favorites) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observerForLastUser.current.observe(node)
  }, [isLoading]);

  const handleCheckBoxes = (element) => {
    if (!checkedBoxes.includes(element)) {
      setCheckedBoxes([...checkedBoxes, element]);
    } else {
      setCheckedBoxes(checkedBoxes.filter(val => {
        return val !== element;
      }))
    }
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // Update favorites state
  const handleLikeButton = (user) => {
    if (!favorites.includes(user)) {
      setFavorites([...new Set([...favorites, user])]);
    } else {
      setFavorites(favorites.filter(val => {
        return val !== user;
      }))
    }
  }

  // Know from the url what list we need to render
  const list = (urlAddress.pathname === "/favorites") ? favorites : users;

  // Saved likes and update just once the favorites state
  useEffect(() => {
    const savedFavorites = localStorage.getItem('FavoritesUsers')
    setFavorites(JSON.parse(savedFavorites))
  }, []);

  useEffect(() => {
    localStorage.setItem('FavoritesUsers', JSON.stringify(favorites))
  }, [favorites]);

  const countriesAndValues = [

    {
      'country': 'Australia',
      'value': 'AU',
    },
    {
      'country': 'Brazil',
      'value': 'BR',
    },
    {
      'country': 'Canada',
      'value': 'CA',
    },
    {
      'country': 'Denmark',
      'value': 'DK',
    },
    {
      'country': 'Finland',
      'value': 'FI',
    },
    {
      'country': 'France',
      'value': 'FR',
    },
    {
      'country': 'Germany',
      'value': 'DE',
    },
    {
      'country': 'Norway',
      'value': 'NO',
    },
  ]

  return (
    <S.UserList>
      <S.Filters>
        {countriesAndValues.map((key, index) => {
          return (
            <CheckBox key={index} value={`${key.value}`} label={key.country} onChange={() => handleCheckBoxes(key.country)} />
          )
        })}
      </S.Filters>
      <S.List>
        {list.filter((val) => {
          if (checkedBoxes.length === 0) {
            return true;
          }

          return checkedBoxes.some(country => {
            return country === val?.location.country;
          });
        }).map((user, index) => {
          return (
            <S.User
              key={index}
              ref={(list.length === index + 1) ? lastUserElement : observerOtherUsers}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={() => handleLikeButton(user)} isVisible={(favorites.some(favorite => {
                return favorite === user;
              }) ||
                index === hoveredUserId
              )}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>

          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
