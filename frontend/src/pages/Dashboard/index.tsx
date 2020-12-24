import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import { Header, Logo, Title, Form, Books } from './styles';
import { Book, BookData } from '../../components/Book';
import { Loading } from '../../components/Loading';
import Alert from '../../components/Alert';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [inputError, setInputError] = useState('');
  const [books, setBooks] = useState<BookData[]>([]);

  async function handleAddBook(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setBooks([]);
    setIsLoading(true);

    if (!search) {
      setInputError('Digite o nome de algum livro');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get('/books', {
        params: {
          search,
        },
      });

      if (response.data.totalBooks > 0) {
        setBooks(response.data.books);
        setInputError('');
      } else {
        setInputError('Nenhum livro encontrado!');
      }

      setIsLoading(false);
    } catch (e) {
      setBooks([]);
      setInputError('Erro ao buscar o livro');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header>
        <Logo src={logoImg} alt="Lincas" height="50" />
        <Link to="/favorites">
          <FiStar size={16} />
          Meus Favoritos
        </Link>
      </Header>

      <Title>Encontre seus livros favoritos!</Title>

      <Form hasError={!!inputError} onSubmit={handleAddBook}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Harry Potter e a Câmara Secreta"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Alert type="error" message={inputError} />}

      <Books>
        {isLoading && <Loading />}
        {books.map((book: BookData) => (
          <Book book={book} />
        ))}
      </Books>
    </>
  );
};

export default Dashboard;
