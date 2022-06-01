import React, {useState, useRef, useEffect} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import sampleVideo from '../assets/videos/mov_bbb.mp4'
import AddQuestionModal from "../Components/AddQuestionModal";
import { useDispatch, useSelector } from 'react-redux';
import {
    videoModalRequest,
    deleteQuestionCategoryRequest,
    selectQuestionCategoryRequest,
    setModalDataRequest,
    setPaidContentRequest,
    updateQuestionRequest,
    sendNotificationdRequest, getDashboardRequest, getUserListRequest
} from '../redux/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import MultipleSelect from "../Components/Select";
import clsx from "clsx";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        background: "#3ea8ad",
        "&:hover": {
            background: "#3ea8ad",
        },
    },
    update: {
        position: "fixed",
        bottom: theme.spacing(5),
        right: theme.spacing(15),
        background: "#3ea8ad",
        "&:hover": {
            background: "#3ea8ad",
        },
    },

    videoWrapper: {
        display: 'flex',
        paddingRight: 20,
        width: '100%'
    },
    subtitle: {
        fontSize: '1.1rem'
    },
    videoDetailsWrapper: {
        marginLeft: '1rem'
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    playlistTitle: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    questionNo: {
        marginRight: 10
    },
    categoryName: {
        padding: 10,
        backgroundColor: '#30989d24',
        marginBottom: 10,
        borderRadius: 7,
        fontSize: '1.1rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems :'center',
        // "&:hover .icon-wrapper" : {
        //     display: 'flex'
        // }


    },
    categoryItem: {
        marginBottom: 40
    },
    iconsWrapper: {
        marginTop: 4,
        position: 'absolute',
        right: 40
    },
   icon:{
        cursor:'pointer',
        marginRight: 10
    },
    noDataText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20vh'
    },

    itemIconsWrapper: {
        display: 'flex',
        marginTop: '1rem',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / -1%), 0px 1px 0px 0px rgb(0 0 0 / 1%)',
        background: '#fff',
        padding: 20,
        paddingLeft: 30,
        borderRadius: 7,
        marginBottom: 10,
        paddingRight: 50,
        alignItems: 'center',

        "&:hover .item-icon-wrapper": {
            display: 'flex'
        },
    },
    itemIconsWrapperActive:{
        border:'1px solid rgba(0,0,0, 1)'
    },
    itemIconWrapepr:{
        position: 'absolute',
        right: 85,
        display: 'none'
    },

    questionInput: {
        outline: 'none',
        border: 'none',
        width: '100%',
        background: 'unset',
        height: 200,
    },

    disableTextArea: {
        // resize: 'none',
        // overflow: 'hidden',
        height: 'unset'
    },

    updateIconWrapper: {
        width: 81,
        height: 50
    },

    updateButton: {
        width: 81,
        height: 41,
        background: '#3ea8ad',
        color: 'white',
        borderRadius: 5,
        border: 'unset',
        cursor: 'pointer'
    }
}));

export default function QuestionBank() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({ itemsToDelete: [] })
    const questionCategories = useSelector(state => state.course.questionCategories)
    const isGenericLoading = useSelector(state => state.config.isLoading)
    const selectedQuestionCategory = useSelector(state => state.course.selectedQuestionCategory)
    const updateQuestionState = useSelector(state => state.course.updateQuestion)
    const isDataForTheCategory = Array.isArray(selectedQuestionCategory?.data?.subCategories) && selectedQuestionCategory?.data?.subCategories?.length > 0
    const [freeSelectedItems, setFreeSelectedItems] = useState([])
    const userlist = useSelector(state => state.course.userlist)

    const handleNotifyUsers = () => {

        const formData = new FormData()
        formData.append('title', `${selectedQuestionCategory.data.name} has updated recently.`)
        formData.append('body', '')
        formData.append('data', JSON.stringify({}))

        for (let i = 0; i < userlist.data.length; i++) {
            console.log(userlist.data[i]._id)
            formData.append('userId[]', userlist.data[i]._id);
        }

        dispatch(sendNotificationdRequest(formData))
    }

    console.log(userlist.data,'userlist.data')

    useEffect(() => {
        (async() => {
            if(!userlist.isSccuess){
                dispatch(getUserListRequest())
            }
        })()
    }, [])

    const handleOpenModal = () => {
        dispatch(videoModalRequest(true));
    }

    const handleDeleteCategory = (item) => {
        const itemsToDelete = [...state.itemsToDelete]
        itemsToDelete.push(item._id)
        setState({...state, itemsToDelete })
        dispatch(deleteQuestionCategoryRequest({ categoryId: item._id, parentCategoryId: selectedQuestionCategory.data._id }))
    }

    const handleEditCategory = (item) => {
        dispatch(setModalDataRequest({...item, isQuestionEditing: true }))
        handleOpenModal()
    }

    const handleSetPaidContent = () => {
        const payload = {
            data: {
                contentData: freeSelectedItems
            }
        }
        dispatch(setPaidContentRequest(payload))
    }


    const handleSelectCategory = (categoryId, questions, initialCategoryPaidStatus) => {
        let newItems = [...freeSelectedItems], categoryExistsIndex

        if(newItems.length > 0){
            categoryExistsIndex = newItems.findIndex(a => a.categoryId === categoryId)
        }

        if(categoryExistsIndex >= 0){
            newItems[categoryExistsIndex] = {
                free: !newItems[categoryExistsIndex].free,
                categoryId: categoryId,
                childs: questions.map(a => ({ questionId: a._id, free: !newItems[categoryExistsIndex].free }))
            }
        }else{
            newItems.push(
                {
                    categoryId: categoryId,
                    free: !initialCategoryPaidStatus || false,
                    childs: questions.map(a => ({ questionId: a._id, free: !initialCategoryPaidStatus || false }) )
                }
            )
        }
        setFreeSelectedItems(newItems)

    }

    const handleSelectFreeQuestion = (categoryId, questionId, isQuestionSelected, numberOfQuestions) => {
        let newItems = [...freeSelectedItems], categoryExistsId

        if(newItems.length > 0){
            categoryExistsId = newItems.findIndex(a => a.categoryId === categoryId)
        }

        if(categoryExistsId >= 0){
            const isQuestionExistsIndex = newItems[categoryExistsId].childs.findIndex(a => a.questionId === questionId)
            newItems[categoryExistsId].free = numberOfQuestions === newItems[categoryExistsId].childs.filter(a => a.free).length
            if(isQuestionExistsIndex >= 0){
                newItems[categoryExistsId].childs[isQuestionExistsIndex].free = !isQuestionSelected
            }else{
                newItems[categoryExistsId].childs = [...newItems[categoryExistsId].childs, { questionId: questionId, free: !isQuestionSelected }]
            }
        }else{
            newItems.push(
                {
                    categoryId: categoryId,
                    free: false,
                    childs: [{ questionId: questionId, free: !isQuestionSelected }]
                }
            )
        }

        setFreeSelectedItems(newItems)
    }

    useEffect(() => {
        setFreeSelectedItems([])
        if(questionCategories.data.length){
            handeChangeCategory(questionCategories.data[0]._id)
        }
    }, [questionCategories])

    const GetQustion = ({ question, parentIndex: i, item, index, isQuestionSelected, numberOfQuestions }) => {

        const [questionState, setQuestionState] = useState({
            value: question.question,
            disabled: true
        })

        const handleEditQuestion = (item, _id) => {
            setQuestionState({...questionState, disabled: false })
        }

        const onBlur = () => {
            setQuestionState({...questionState, disabled: true })
        }

        const onChange = (event) => {
            setQuestionState({...questionState, value: event.target.value })
        }

        const handleUpdateQuestion = () =>{
            dispatch(updateQuestionRequest({ questionId: question._id, data: { question: questionState.value } }))
            onBlur()
            handleNotifyUsers()
        }

        return(
            <div className={clsx(classes.itemIconsWrapper, !questionState.disabled && classes.itemIconsWrapperActive, )}>
                <Checkbox checked={isQuestionSelected} onClick={() => handleSelectFreeQuestion(item._id, question._id, isQuestionSelected, numberOfQuestions)} color={'green'}/>
                <div key={String(index+i)} className={classes.videoWrapper} style={index === 0 ? { marginTop: 0 } : {}} >
                    <div className={classes.questionNo} >{index + 1}.</div>
                    <textarea
                        className={clsx(classes.questionInput, questionState.disabled && classes.disableTextArea)}
                        value={questionState.value}
                        disabled={questionState.disabled}
                        onChange={onChange}
                    />
                </div>

                <div className={classes.itemIconWrapepr + ' item-icon-wrapper'} >
                    {(questionState.disabled && !updateQuestionState.isLoading) && <CreateIcon className={classes.icon} fontSize='small' onClick={() => handleEditQuestion(item, question._id)} />}
                    {(!questionState.disabled && !updateQuestionState.isLoading) && <div onClick={handleUpdateQuestion} className={classes.updateIconWrapper} ><button className={classes.updateButton}>Update</button></div>}
                    {(updateQuestionState.isLoading && updateQuestionState.data.questionId === question._id) && <Loader className={classes.icon} variant='small' />}
                    {/* {!updateQuestionState.isLoading && <DeleteIcon className={classes.icon} fontSize='small' onClick={() => handleDeleteCategory(item)} />} */}
                </div>
            </div>
        )
    }

    const renderQuestionBank = () => {
        return (
            <>
                {
                    isDataForTheCategory ? selectedQuestionCategory?.data?.subCategories?.map((item, i) => {
                        let isSubcategorySelectedIndex = freeSelectedItems.findIndex(a => a.categoryId === item._id), isSubcategorySelected
                        if(isSubcategorySelectedIndex >= 0){
                            const freeItems = freeSelectedItems[isSubcategorySelectedIndex].childs.filter(a => a.free)
                            if(freeItems.length === item.questions.length){
                                isSubcategorySelected = true
                            }else{
                                isSubcategorySelected = false
                            }
                        }else{
                            isSubcategorySelected = item?.questions.filter(a => a.free).length === item?.questions.length
                        }
                        return (
                            <div key={String(i)}  className={item?.questions?.length > 0 && classes.categoryItem} >

                                <div className={classes.categoryName}>
                                    <Checkbox checked={isSubcategorySelected} onClick={() => handleSelectCategory(item._id, item?.questions, isSubcategorySelected)} color={'green'}/>
                                    <div>{i + 1}. {item.name}</div>
                                    <div className={classes.iconsWrapper + ' icon-wrapper'} >
                                        <CreateIcon className={classes.icon} fontSize='small' onClick={() => handleEditCategory(item)} />
                                        {state.itemsToDelete.includes(item._id) ?
                                            <Loader className={classes.icon} variant='small' /> :
                                             <DeleteIcon className={classes.icon} fontSize='small' onClick={() => handleDeleteCategory(item)} />}
                                    </div>
                                </div>
                                {item?.questions?.length > 0 && item?.questions.map((question, index) => {
                                    let isQuestionSelected
                                    if(isSubcategorySelectedIndex >= 0){
                                        const selectedQuestionIndex = freeSelectedItems[isSubcategorySelectedIndex].childs.findIndex(a => a.questionId === question._id)
                                        if(selectedQuestionIndex >=0 ){
                                            isQuestionSelected =  freeSelectedItems[isSubcategorySelectedIndex].childs[selectedQuestionIndex].free
                                        }else{
                                            isQuestionSelected = question.free || false
                                        }
                                    }else{
                                        isQuestionSelected = question.free || false
                                    }
                                    return(
                                        <GetQustion isQuestionSelected={isQuestionSelected} numberOfQuestions={item?.questions?.length} question={question} parentIndex={i} item={item} index={index} />
                                    )
                                })
                                }
                            </div>
                        )
                    }) : <div className={classes.noDataText}>No data avaialable for this category</div>
                }
            </>
        )
    }

    const handeChangeCategory = (_id) => {
        dispatch(selectQuestionCategoryRequest({ _id }))
    }

    return (
        <div className={classes.root} >
            <div className={classes.titleWrapper} >
                <div className={classes.playlistTitle} >Content</div>
            </div>
            {questionCategories.isSuccess &&
                <MultipleSelect
                    name='categoryId'
                    onSelect={handeChangeCategory}
                    nameKey={'name'}
                    returnKey='_id'
                    defaultSelect={true}
                    multiple={false}
                    list={questionCategories.data}
                />
            }
            <AddQuestionModal />
            {questionCategories.isSuccess &&  renderQuestionBank()}
            {questionCategories.isLoading &&  <Loader variant='big' />}
            {questionCategories.isError && <Error message={questionCategories.message} />}
            <Fab
                size="small"
                onClick={handleOpenModal} color="secondary"
                aria-label="add"
                className={classes.fab}
            >
                <AddIcon />
            </Fab>
            {freeSelectedItems.length > 0 &&
            <Fab
                size="small"
                onClick={handleSetPaidContent} color="secondary"
                aria-label="add"
                className={classes.update}
            >
                {(isGenericLoading) ? <Loader color={'#fff'} style={{color: '#fff'}}/> : <UpdateIcon/>}
            </Fab>}
        </div>
    );
}
