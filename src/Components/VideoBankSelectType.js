import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MultipleSelect from './Select';

const useStyles = makeStyles((theme) => ({
    root: {
    },
}));

const list = [
    { name: 'Monthly Q&A', videoBankType: 'monthlyQa' }, 
    { name: 'Master Class', videoBankType: 'masterClass' }, 
    { name: 'Video Bank', videoBankType: 'videoBank' }, 
    { name: 'Key Concepts', videoBankType: 'keyConcept' }, 
    { name: 'Actionable Insights', videoBankType: 'actionableInsights' }, 
]

export default function VideoBankSelectType({ onSelect = () => null, name }) {
    const classes = useStyles();
    
    return (
        <div className={classes.root} >
            <MultipleSelect
                name={name}
                onSelect={onSelect}
                nameKey={'name'}
                returnKey={'videoBankType'}
                defaultSelect={true}
                defaultSelectIndex={0}
                multiple={false}
                invokeOnSelectOnInitialisation={false}
                list={list}
                // disabled={usersSubscription.isLoading}
            />
        </div>
    );
}