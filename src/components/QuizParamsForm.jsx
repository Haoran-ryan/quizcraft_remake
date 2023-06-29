import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
  } from "@material-tailwind/react";


function QuizParamsForm({ setIsParamsSubmitted, setQuizNumber, setQuizDifficulty, setQuizCategory}){
    const difficulties = [
        { value: 'easy', label: 'Easy' }, 
        { value: 'medium', label: 'Medium' }, 
        { value: 'hard', label: 'Hard' }
    ];

    const categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

    const handleQuizNumberChange = (e) => {
        setQuizNumber(e.target.value);
    };
    const handleQuizDifficultyChange = (e) => {
        setQuizDifficulty(e);
    };
    const handleQuizCategoryChange = (e) => {
        setQuizCategory(e);
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsParamsSubmitted(true);
    };
    
    return(
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Choose Quiz Parameters
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Choose the quiz details. 
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={ handleSubmit }>
            <div className="mb-4 flex flex-col gap-6">
              <Input type="number" size="lg" label="Question Number" min="1" max="20" onChange={ handleQuizNumberChange }/>
              <Select label="Category" onChange={ handleQuizCategoryChange }>
                {categories.map((category, index) => (
                    <Option key={index} value={category.id.toString()}>{category.name}</Option>
                ))}
              </Select>
              <Select label="Difficulty" onChange={ handleQuizDifficultyChange }>
                {difficulties.map((difficulty, index) => (
                    <Option key={index} value={difficulty.value}>{difficulty.label}</Option>
                ))}
              </Select>
            </div>
      
            <Button type="submit" className="mt-6" fullWidth>
              Submit
            </Button>
           
          </form>
        </Card>
      );
};

export default QuizParamsForm;