function validator( value ){
    const errors = {}
    if(value.hasOwnProperty('name') ){
        if(value.name !==undefined && value.name.trim() === ''){
            errors.name = 'Enter name'
        }
    }
    if(value.hasOwnProperty('title')){
        if(value.title !==undefined && value.title.trim() === ''){
            errors.title = 'Title is empty' 
        }
    }

    if(value.hasOwnProperty('email')){
        if(value.email !==undefined && value.email.trim() === ''){
            errors.email = 'Email is empty' 
        }
    }

    if(value.hasOwnProperty('password')){
        if(value.password !==undefined && value.password.trim() === ''){
            errors.password = 'Password is empty' 
        }
    }

    if(value.hasOwnProperty('description')){
        if(value.description !==undefined && value.description.trim() === ''){
            errors.description = 'Description is empty'
        }
    }
    if(value.hasOwnProperty('question')){
        if(value.question !==undefined && value.question.trim() === ''){
            errors.question = 'Enter a question'
        }
    }

    if(value.hasOwnProperty('content')){
        if(value.content !==undefined && value.content.trim() === ''){
            errors.content = 'Content is empty'
        }
    }
    
    if(value.hasOwnProperty('about')){
        if(value.about !==undefined && value.about.trim() === ''){
            errors.about = 'Breif about the trainer'
        }
    }
    if(value.hasOwnProperty('questionCategory')){
        if(value.questionCategory !==undefined && value.questionCategory.trim() === ''){
            errors.questionCategory = 'Enter something to add category'
        }
    }
    if(value.hasOwnProperty('subtitle')){
        if(value.subtitle !==undefined && value.subtitle.trim() === ''){
            errors.subtitle = 'Subtitle is empty'
        }
    }
    if(value.hasOwnProperty('file')){
        if(value.file !==undefined &&  value.file === '' && value.url ===''){
            errors.file = 'Choose a picture to upload'
        }
    }
    if(value.hasOwnProperty('thumbnail')){
        if(value.thumbnail !==undefined &&  value.thumbnail ===''){
            errors.thumbnail = 'Choose a thumbnail of the video'
        }
    }
    if(value.hasOwnProperty('role')){
        if(value.role !==undefined && value.role.trim() === ''){
            errors.role = 'Enter role'
        }
    }
    if(value.hasOwnProperty('videos') && Array.isArray(value.videos)){
        if(!value.videos.length){
            errors.videos = 'Select videos to the course'
        }
    }

    if(value.hasOwnProperty('videoIds') && Array.isArray(value.videoIds)){
        if(!value.videoIds.length){
            errors.videoIds = 'Select videos to the video bank'
        }
    }
    
    if(value.hasOwnProperty('trainerId')){
        if(value.trainerId !==undefined && value.trainerId.trim() === ''){
            errors.trainerId = 'Select a trainer'
        }
    }
    if(value.hasOwnProperty('videoId')){
        if(value.videoId !==undefined && value.videoId.trim() === ''){
            errors.videoId = 'Select any video'
        }
    }
    if(value.hasOwnProperty('courseIds') && Array.isArray(value.courseIds)){
        if(!value.courseIds.length){
            errors.courseIds = 'Select the courses in which you want to upload this video.'
        }
    }
    return errors;
}

export default validator;