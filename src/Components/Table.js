import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { useSelector, useDispatch } from 'react-redux';
import { setModalDataRequest, videoModalRequest } from '../redux/actions';
import Loader from './Loader';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headerText: {
    fontWeight: '700'
  },
  deleteIcon: {
    cursor: 'pointer'
  },
  tableRow: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)'
    }
  },
});

export default function GenericTable({
  headers = [],
  cellData,
  keys = [],
  handleDelete = () => null,
  deleteIcon = true,
  editIcon = true,
  editIconComponent
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [itemToDelete, setItemToDelete] = useState('')

  const isLoading = useSelector(state => state.config.isLoading)

  const handleEdit = (item) => {
    dispatch(setModalDataRequest(item))
    dispatch(videoModalRequest(true))
  }

  const getRowItem = (row, item) => {
    // if(item === 'description' || item === 'about'){
    //   return <div style={{width:100, height:100, overflow:'hidden'}} >{row[item]}</div>
    // }
    return row[item]
  }

  const getEditComponet = (row) => {
    return editIconComponent || <CreateIcon onClick={() => { handleEdit(row) }} className={classes.deleteIcon} />
  }


  return (
    <>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                headers.map((headerTitle, index) => {
                  if (index == 0) {
                    return (
                      <TableCell key={`${headerTitle}-${index}`} className={classes.headerText} component="th" scope="row" >{headerTitle}</TableCell>
                    )
                  }
                  return (
                    <TableCell key={`${headerTitle}-${index}`} className={classes.headerText} align='right' >{headerTitle}</TableCell>
                  )
                })
              }
              {editIcon && <TableCell className={classes.headerText} align='right' >{'Edit'}</TableCell>}
              {deleteIcon && <TableCell className={classes.headerText} align='right' >{'Delete'}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {cellData.map((row, i) => {
              return (
                <TableRow className={classes.tableRow} key={i}>
                  {
                    keys.map((item, index) => {
                      if (index == 0) {
                        return <TableCell key={`${index}`} component="th" scope="row">{row[item]} </TableCell>
                      }
                      return <TableCell key={`${index}`} align="right">{getRowItem(row, item)}</TableCell>
                    })
                  }
                  {editIcon && <TableCell align='right' >{getEditComponet(row)}</TableCell>}
                  {deleteIcon &&
                    <TableCell align='right' >
                      {(itemToDelete === row._id && isLoading) ? <Loader variant='small' /> :
                        <DeleteIcon
                          onClick={() => {
                            setItemToDelete(row._id)
                            handleDelete(row._id)
                          }}
                          className={classes.deleteIcon} />}
                    </TableCell>}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}