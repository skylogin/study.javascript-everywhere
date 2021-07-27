import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';

import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';


const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});

  const { data: userdata } = useQuery(GET_ME);
  // TOBE: userdata부분이 URL 직접호출시 바로 가져와지지 않음.
  //       그러다보니 36라인의 userdata가 undefined가 되어 .me 데이터에서 에러가 남

  console.log("==========")
  console.log(data, userdata);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if(loading){
    return <p>Loading</p>;
  }
  if(error){
    return <p>Error! Note not Found</p>;
  }
  if(userdata.me.id !== data.note.author.id){
    return <p>You do not have access to edit this note</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />
}

export default EditNote;
