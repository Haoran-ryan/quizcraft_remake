import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';

const QuestionsForm = ({questionCount,
    setQuestionCount,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    onSave})=>{
    const difficulties = [
        { value: 'easy', label: 'Easy' }, 
        { value: 'medium', label: 'Medium' }, 
        { value: 'hard', label: 'Hard' }
    ];

    const categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

    const handleQuestionCountChange = (e) => {
        console.log(`${e.target.value} was entered`)
        setQuestionCount(e.target.value)
    }
    const handleDiffultyChange = (e) => {
        console.log(`${e[0].value} was selected`)
        setDifficulty(e[0].value)
    }

    const handleCategoryChange = (e) => {
        console.log(`${e[0].name} was selected`)
        setCategory(e[0].id)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    }
   

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Number of Questions </label>
                    <br/>
                    <input type='number' min="1" max="20" onChange={handleQuestionCountChange}/>
                </div>
                <div>
                    <label>Difficulty </label>
                    <Select options={difficulties} onChange={handleDiffultyChange} valueField='value' />
                </div>
                <div>
                    <label>Category </label>
                    <Select options={categories} labelField='name' valueField='id' onChange={handleCategoryChange}/>
                </div>
                <input type='submit'></input>
            </form>

        </div>
    )
};

export default QuestionsForm;