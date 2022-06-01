import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import pdfIcon from '../assets/document.png'
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    border:'1px solid rgba(0,0,0,0.2)',
    padding: '5px',
    borderRadius: '6px',
    '& .MuiInput-underline':{
      '&:hover:not(.Mui-disabled):before':{
        borderBottom:'none'
      },
      '&::after':{
        borderBottom:'none'
      }
    },
    '&::before':{
        outline:'none',
        borderBottom:"none"
    },
    '&:hover':{
        outline:'none',
        borderBottom:"none"
    },
    '&:focus':{
        outline:'none',
        borderBottom:"none",
        border:'none'
    },
    '&:active':{
        outline:'none',
        borderBottom:"none",
        border:'none'
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  multiSelect:{
      border:'none',
      '&::before':{
        outline:'none',
        borderBottom:"none"
    },
    '&:focus':{
        outline:'none',
        borderBottom:"none",
        border:'none'
    },
    '&:active':{
        outline:'none',
        borderBottom:"none",
        border:'none'
    },
  },
  pdfIcon: {
    width: 60
  },
  pdfWrapper: {
    display: 'flex'
  },
  pdfInfo: {
    fontSize: 14
  },

  selectAllView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelect({
  list=[], 
  onSelect =()=> null, 
  name, 
  multiple = false, 
  nameKey,
  type = 'select',
  selectedKeys = '',
  isToUpdate,
  returnKey= '_id',
  defaultSelect = false,
  defaultSelectIndex = 0,
  disabled = false,
  invokeOnSelectOnInitialisation = true
}) {
  const classes = useStyles();
  const [personName, setPersonName] = useState([]);
  const [selectedItems, setItem] = useState([])
  const [isAllSelect, setAllSelect] = useState(false)

  const handleChange = (item) => {
    let keys = [], allnames = []
    if(multiple){
      keys = [...selectedItems]
      allnames = [...personName]
      if(keys?.includes(item._id)){
        const itemIndex = keys.findIndex(a => a === item._id)
        keys = keys.filter( a => a !== item._id)
        if (itemIndex > -1) {
          allnames.splice(itemIndex, 1);
        }
      }else{
        allnames.push(item[nameKey])
        keys.push(item._id) 
      }
    }else{
      keys = item[returnKey]
      allnames = item[nameKey]
    }
    onSelect(keys, name)
    setItem(keys)
    setPersonName(allnames);
  };

  const handleSelectAll = () => {
    let keys = [], allNames = []
    if(!isAllSelect){
      allNames = list.map(a => a[nameKey])
      keys = list.map(a => a._id)
    }
    onSelect(keys, name)
    setItem(keys)
    setPersonName(allNames);
    setAllSelect(!isAllSelect)
  }

  useEffect(() => {

    if(isToUpdate && selectedKeys && list.length){
      if(name === 'trainerId'){
        const key = list.find(a => a._id === selectedKeys)
        setItem([key['_id']])
        setPersonName(key[nameKey])
      }

      if(name === 'videos'){
        let allnames = []
        list?.map((element)=>{
          if(selectedKeys?.includes(element._id)){
            allnames.push(element[nameKey])
          }
        })
        setItem(selectedKeys)
        setPersonName(allnames)
      }

      if(name === 'type'){
        setItem(selectedKeys)
        setPersonName(selectedKeys)
      }
    }

  }, [isToUpdate])

  useEffect(() => {
    if(!isToUpdate && defaultSelect){
      setItem([list[defaultSelectIndex]?.[returnKey]])
      setPersonName([list[defaultSelectIndex]?.[nameKey]])
      invokeOnSelectOnInitialisation && onSelect(multiple ? [list[0]?.[returnKey]] : list[0]?.[returnKey], name)
    }
  },[])

  return (
    <div>
      <FormControl disabled={disabled} className={classes.formControl}>
        <Select 
          labelId="demo-mutiple-checkbox-label"
          className={classes.multiSelect}
          value={personName}
          placeholder='dsdfsdf'
          multiple={multiple}
          renderValue={(selected) => {
            if(multiple){
                if(selected.length > 0){
                  return selected.join(' ')
                }
                 return selected
            }
              return selected
          }}
          MenuProps={MenuProps}
        >
          <div>
          <div className={classes.selectAllView} onClick={handleSelectAll} >
            <Checkbox checked={isAllSelect} />
            <div>Select All</div>
          </div>
          {list.length > 0 && list?.map((item, index) => {
          const isPdf = item?.videoLink?.includes('.pdf')
            return(
              <div key={`${item._id}-${index}`} onClick={() => handleChange(item)} >
              <MenuItem  value={item[nameKey]}>
                <div>{index+1}</div>
                <Checkbox checked={selectedItems?.includes(item[returnKey] )} />
                {type === 'select' && <ListItemText primary={item[nameKey]} />}
                {(type === 'video' && !isPdf) &&
                  <video /* poster={item.thumbnail} */ width="150" controls>
                    <source src={item.videoLink} type="video/mp4"/>
                  </video>
                }
                {
                  (type === 'video' && isPdf) && 
                  <div className={classes.pdfWrapper} >
                    <img className={classes.pdfIcon}  src={pdfIcon}/>
                    <div>
                      <div className={classes.pdfInfo}>{item.title}</div>
                      <div className={classes.pdfInfo}>{item.subTitle}</div>
                    </div>
                  </div>
                }
              </MenuItem>
            </div>
            )
          })}
          </div>
        </Select>
      </FormControl>
    </div>
  );
}