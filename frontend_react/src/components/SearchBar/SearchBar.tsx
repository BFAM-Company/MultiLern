import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  currentText: string;
  setModalVisibility: (visible: boolean) => void;
  modalVisibility: boolean;
}

function SearchBar({ currentText, setModalVisibility, modalVisibility }: SearchBarProps) {
  const [searchedText, setSearchedText] = useState<string>('');
  const navigate = useNavigate()
  useEffect(() => {
    setSearchedText(currentText);
  }, [currentText]);

  return (
    <div style={{
        width: '80%',
        height: 50,
        maxWidth: 700,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(33,33,43)',
        borderRadius: 100,
        boxShadow: '0 0 10px rgba(0,0,0,0.44)',}}>
      <input
        type="text"
        style={{width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderRadius: 20,
    border: 'none',}}
        placeholder="wyszukaj zadania..."
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <div style={{
        width: '20%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(33,33,43)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
      }}>
        <button onClick={() => { if (modalVisibility) setModalVisibility(false); navigate(`/excercises?searchableText=${searchedText}`)}}>
          <img src={require('../../assets/search-icon.png')} alt="search" style={{width: 20,
    height: 20,
    color: '#fff',}} />
        </button>
      </div>
    </div>
  );
}


export default SearchBar;
