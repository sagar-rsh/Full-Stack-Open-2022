import { useState } from 'react';

const Display = ({ title, anecdote, votes }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>
        {anecdote} <br />
        has {votes} votes
      </p>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));

  const selectedHandler = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  };

  const votesIncrement = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Display
        title='Anecdote of the day'
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button handleClick={votesIncrement} text='vote'></Button>
      <Button handleClick={selectedHandler} text='next anecdote'></Button>
      <Display
        title='Anecdote with most votes'
        anecdote={anecdotes[indexOfMaxVotes]}
        votes={votes[indexOfMaxVotes]}
      />
    </div>
  );
};

export default App;
