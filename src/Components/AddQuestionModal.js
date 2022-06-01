import React, { useState, useEffect } from "react";
import CommonModal from "./CommonModal";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { videoModalRequest, createQuestionRequest, createQuestionCategoryRequest, updateQuestionCategoryRequest, getQuestionCategoryRequest } from "../redux/actions";
import GenericTextArea from "./GenericTextArea";
import Loader from './Loader';
import validator from '../utils/validation';
import MultipleSelect from "./Select";
import clsx from  'clsx';

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(0,0,0, 0.2)",
  },
  closeIcon: {
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: 30,
    overflowY: "scroll",
  },
  footer: {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0,0,0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    outline: 'none',
    border: 'none',
    background: '#065fd4',
    color: '#fff',
    minWidth:70,
    height:40,
    cursor: 'pointer'
  },
  categoryWrapper:{
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addCategory: {
    outline: 'none',
    border: 'none',
    background: '#065fd4',
    color: '#fff',
    cursor: 'pointer',
    padding: 10,
    marginRight: 10
  },
  addCategoryWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  disabled: {
    cursor: 'not-allowed'
  }
}));

const initialState = {
  question: '',
  errors: {},
  addQuestion: true,
  questionCategory: '',
  categoryId: '',
}

export default function AddQuestionModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createQuestion = useSelector(state => state.course.createQuestion)
  const questionCategories = useSelector(state => state.course.questionCategories)
  const selectedQuestionCategory = useSelector(state => state.course.selectedQuestionCategory)
  const isLoading = useSelector(state => state.config.isLoading)
  const [state, setState] = useState(initialState)
  const modalData = useSelector(state => state.config.modalData)
  const isCategoriesAvailable = selectedQuestionCategory?.data?.subCategories?.length > 0
  const isToUpdate = Object.keys(modalData).length > 0

  const handleClose = () => {
    dispatch(videoModalRequest(false));
    handleReset()
  };

  useEffect(() => {
   if(!isLoading && !state.addQuestion){
    setState({...state, addQuestion:true, questionCategory: '' })
   }
  }, [isLoading])

  useEffect(() => {
    if(isToUpdate){
      setState({
          ...state, 
          addQuestion: false, 
          questionCategory: modalData.name, 
          categoryId: modalData._id 
      })
    }
   }, [isToUpdate, questionCategories])

  const handleCreateQuestion = () => {
    const { question, categoryId} = state;
    const errors = validator({ question })
    setState({...state, errors})
    if(Object.keys(errors).length){
      //do something
      return
    }
    dispatch(createQuestionRequest({ question, categoryId, parentCategoryId: selectedQuestionCategory.data._id }))
  }

  const handleCreateQuestionCategory = () => {
    const { questionCategory, categoryId } = state;
    const errors = validator({ questionCategory })
    setState({...state, errors})
    if(Object.keys(errors).length){
      //do something
      return
    }
    if(isToUpdate){
      dispatch(updateQuestionCategoryRequest({ data: { name: questionCategory, parentCategoryId: selectedQuestionCategory.data._id }, categoryId }))
      return
    }
    dispatch(createQuestionCategoryRequest({ name: questionCategory, parentCategoryId: selectedQuestionCategory.data._id }))
  }
  
  useEffect(() => {
    dispatch(getQuestionCategoryRequest())
  }, [])

  const handleChange = (value, name) => {
    setState({...state, [name]: value})
  }

  const handleReset = () => {
    setState(initialState)
  }

  return (
    <CommonModal onClose={handleReset} style={{height:'50vh'}} >
      <div className={classes.modalHeader}>
        <span>Create Question</span>
        <div className={classes.addCategoryWrapper}>
          <button
            onClick={() => setState({...state, addQuestion: !state.addQuestion})}
            className={classes.addCategory}
          >
            {state.addQuestion ? "Add Category" : "Add Question"}
          </button>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </div>
      </div>
      <div className={classes.content}>
      {state.addQuestion && 
      <div className={classes.categoryWrapper} >
        <div>Select Category: </div>
       {
         questionCategories.isLoading ? 
        <span>Fetching Categories...</span> : 
        <MultipleSelect 
          name='categoryId' 
          onSelect={handleChange} 
          nameKey={'name'} 
          returnKey='_id'
          defaultSelect={true} 
          multiple={false} 
          list={selectedQuestionCategory.data.subCategories} 
        />}
      </div>}
          <GenericTextArea 
            isBigger={true}
            style={{ height: '22vh' }}
            placeholder={state.addQuestion ? 'Type a question here...' : 'Type a question category here...'}
            handleChange={handleChange}
            name={state.addQuestion ? 'question' : 'questionCategory'}
            value={state.addQuestion ? state.question : state.questionCategory}
            error={state.addQuestion ? state?.errors?.question : state?.errors?.questionCategory}
           />
      </div>
      <div className={classes.footer}>
        <button
          disabled={createQuestion.isLoading || questionCategories.isLoading || (state.addQuestion && !isCategoriesAvailable)}
          onClick={state.addQuestion ? handleCreateQuestion : handleCreateQuestionCategory}
          className={clsx(classes.button, (state.addQuestion && !isCategoriesAvailable) && classes.disabled)}
        >
          {isLoading ? <Loader style={{color:'#fff'}} /> : state.addQuestion ?  "CREATE QUESTION" : isToUpdate ? "UPDATE CATEGORY" : "CREATE CATEGORY"}
        </button>
      </div>
    </CommonModal>
  );
}
