import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Book, BookData } from '../../components/Book';
import api from '../../services/api';
import { Books, Header, Logo, Title } from '../Dashboard/styles';

import logoImg from '../../assets/logo.png';
import { Loading } from '../../components/Loading';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/favorites').then(response => {
      setFavorites(response.data.favorites);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header>
        <Logo src={logoImg} alt="Lincas" height="50" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Dashboard
        </Link>
      </Header>

      <Title>Os meus favoritos</Title>

      <Books>
        {isLoading && <Loading />}
        {favorites.map((book: BookData) => (
          <Book book={book} />
        ))}
      </Books>
    </>
  );
};

export default Favorites;
