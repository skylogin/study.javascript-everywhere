import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';

import { GET_NOTES } from '../gql/query';

const NEW_NOTE = gql`
  mutation newNote($content: String!){
    newNote(content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy{
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;


const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  })

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // 아폴로는 기본적으로 캐싱하는데, 새 노트를 불러오기 위해 캐시 갱신
    refetchQueries:[{ query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <NoteForm action={data} />
    </React.Fragment>
  )
}

export default NewNote;