import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import noImage from '../../assets/no-image.png';
import api from '../../services/api';

import { Box, Image, BookInfo, BookTitle, BookDescr } from './styles';

export interface BookData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  favorite?: boolean;
}

interface BookProps {
  book: BookData;
}

export const Book: React.FC<BookProps> = ({ book }: BookProps) => {
  const [favorite, setFavorite] = useState(book.favorite);
  const { addToast } = useToast();

  return (
    <Box key={book.id}>
      <Image src={book.thumbnail ?? noImage} alt={book.title} />

      <BookInfo>
        <BookTitle>{book.title}</BookTitle>
        <BookDescr>{book.description}</BookDescr>
      </BookInfo>

      <FiStar
        size={60}
        onClick={() => {
          api.post(`/favorites/${book.id}`).then(() => {
            setFavorite(!favorite);

            addToast({
              type: 'success',
              title: 'Sucesso!',
              description: !favorite
                ? 'Adicionado a sua lista de Favoritos!'
                : 'Removido da sua lista de Favoritos!',
            });
          });
        }}
        color={favorite ? 'yellow' : '#a8a8b3'}
      />
    </Box>
  );
};
